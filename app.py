from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_socketio import SocketIO, emit, join_room, leave_room
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from geopy.distance import geodesic
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import enum
from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from flask_marshmallow import Marshmallow
from flask_seasurf import SeaSurf
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Load environment variables and config
load_dotenv()
from config import config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
socketio = SocketIO()
ma = Marshmallow()
csrf = SeaSurf()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100 per minute"]
)

class UserRole(enum.Enum):
    CUSTOMER = "customer"
    PROVIDER = "provider"
    ADMIN = "admin"

def create_app(config_name='default'):
    app = Flask(__name__, 
                static_folder='app/static',
                template_folder='app/templates')
    
    # Load config
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app, cors_allowed_origins=app.config['CORS_ORIGINS'])
    CORS(app, origins=app.config['CORS_ORIGINS'])
    ma.init_app(app)
    csrf.init_app(app)
    limiter.init_app(app)
    
    # Enable HTTPS security headers
    Talisman(app, 
             content_security_policy={
                 'default-src': "'self'",
                 'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "unpkg.com"],
                 'style-src': ["'self'", "'unsafe-inline'"],
                 'img-src': ["'self'", "data:", "https:"],
                 'connect-src': ["'self'", "wss:", "https:"]
             })

    # Create upload directory if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    # Import and register blueprints
    from .auth import auth_bp
    from .providers import providers_bp
    from .messages import messages_bp
    from .blog import blog_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(providers_bp, url_prefix='/api/providers')
    app.register_blueprint(messages_bp, url_prefix='/api/messages')
    app.register_blueprint(blog_bp, url_prefix='/api/blog')

    # Import Socket.IO events
    from .socket_events import register_socket_events
    register_socket_events(socketio)

    # Models
    class User(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        email = db.Column(db.String(100), unique=True, nullable=True)
        phone = db.Column(db.String(20), unique=True, nullable=True)
        password_hash = db.Column(db.String(200), nullable=False)
        first_name = db.Column(db.String(50), nullable=False)
        last_name = db.Column(db.String(50), nullable=False)
        role = db.Column(db.Enum(UserRole), nullable=False, default=UserRole.CUSTOMER)
        is_active = db.Column(db.Boolean, default=True)
        last_login = db.Column(db.DateTime)
        created_at = db.Column(db.DateTime, server_default=func.now())
        updated_at = db.Column(db.DateTime, onupdate=func.now())
        
        @validates('email')
        def validate_email(self, key, email):
            if email is None:
                return email
            if '@' not in email:
                raise ValueError('Invalid email address')
            return email.lower()

        @validates('phone')
        def validate_phone(self, key, phone):
            if phone is None:
                return phone
            # Remove any non-digit characters
            phone = ''.join(filter(str.isdigit, phone))
            if len(phone) < 10:
                raise ValueError('Phone number must have at least 10 digits')
            return phone
        
        def set_password(self, password):
            if len(password) < 8:
                raise ValueError('Password must be at least 8 characters long')
            self.password_hash = generate_password_hash(password)
        
        def check_password(self, password):
            return check_password_hash(self.password_hash, password)

        def to_dict(self):
            return {
                'id': self.id,
                'email': self.email,
                'phone': self.phone,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'role': self.role.value,
                'created_at': self.created_at.isoformat() if self.created_at else None
            }

    class ServiceProvider(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
        business_name = db.Column(db.String(100), nullable=False)
        description = db.Column(db.Text, nullable=True)
        address = db.Column(db.String(200), nullable=False)
        latitude = db.Column(db.Float, nullable=False)
        longitude = db.Column(db.Float, nullable=False)
        services = db.Column(db.JSON, nullable=True)  # List of services as JSON
        rating = db.Column(db.Float, default=0.0)
        review_count = db.Column(db.Integer, default=0)
        created_at = db.Column(db.DateTime, server_default=func.now())
        updated_at = db.Column(db.DateTime, onupdate=func.now())
        
        user = db.relationship('User', backref=db.backref('provider', uselist=False, cascade='all, delete-orphan'))
        
        @validates('latitude')
        def validate_latitude(self, key, latitude):
            if not -90 <= latitude <= 90:
                raise ValueError('Invalid latitude value')
            return latitude

        @validates('longitude')
        def validate_longitude(self, key, longitude):
            if not -180 <= longitude <= 180:
                raise ValueError('Invalid longitude value')
            return longitude

        def to_dict(self):
            return {
                'id': self.id,
                'user_id': self.user_id,
                'business_name': self.business_name,
                'description': self.description,
                'address': self.address,
                'latitude': self.latitude,
                'longitude': self.longitude,
                'services': self.services,
                'rating': self.rating,
                'review_count': self.review_count,
                'created_at': self.created_at.isoformat() if self.created_at else None
            }

    class Message(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        sender_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
        receiver_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
        content = db.Column(db.Text, nullable=False)
        read = db.Column(db.Boolean, default=False)
        read_at = db.Column(db.DateTime)
        created_at = db.Column(db.DateTime, server_default=func.now())
        
        sender = db.relationship('User', foreign_keys=[sender_id])
        receiver = db.relationship('User', foreign_keys=[receiver_id])

        def to_dict(self):
            return {
                'id': self.id,
                'sender_id': self.sender_id,
                'receiver_id': self.receiver_id,
                'content': self.content,
                'read': self.read,
                'read_at': self.read_at.isoformat() if self.read_at else None,
                'created_at': self.created_at.isoformat() if self.created_at else None
            }

    class BlogPost(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        title = db.Column(db.String(200), nullable=False)
        content = db.Column(db.Text, nullable=False)
        author_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
        slug = db.Column(db.String(200), unique=True, nullable=False)
        status = db.Column(db.String(20), default='draft')  # draft, published, archived
        view_count = db.Column(db.Integer, default=0)
        created_at = db.Column(db.DateTime, server_default=func.now())
        updated_at = db.Column(db.DateTime, onupdate=func.now())
        
        author = db.relationship('User')
        comments = db.relationship('Comment', backref='post', lazy=True, cascade='all, delete-orphan')

        def to_dict(self):
            return {
                'id': self.id,
                'title': self.title,
                'content': self.content,
                'author_id': self.author_id,
                'slug': self.slug,
                'status': self.status,
                'view_count': self.view_count,
                'created_at': self.created_at.isoformat() if self.created_at else None,
                'updated_at': self.updated_at.isoformat() if self.updated_at else None
            }

    class Comment(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        content = db.Column(db.Text, nullable=False)
        author_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
        post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id', ondelete='CASCADE'), nullable=False)
        parent_id = db.Column(db.Integer, db.ForeignKey('comment.id', ondelete='CASCADE'), nullable=True)
        created_at = db.Column(db.DateTime, server_default=func.now())
        updated_at = db.Column(db.DateTime, onupdate=func.now())
        
        author = db.relationship('User')
        replies = db.relationship('Comment', backref=db.backref('parent', remote_side=[id]))

        def to_dict(self):
            return {
                'id': self.id,
                'content': self.content,
                'author_id': self.author_id,
                'post_id': self.post_id,
                'parent_id': self.parent_id,
                'created_at': self.created_at.isoformat() if self.created_at else None,
                'updated_at': self.updated_at.isoformat() if self.updated_at else None
            }

    class Review(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        provider_id = db.Column(db.Integer, db.ForeignKey('service_provider.id', ondelete='CASCADE'), nullable=False)
        customer_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
        rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
        content = db.Column(db.Text, nullable=True)
        created_at = db.Column(db.DateTime, server_default=func.now())
        updated_at = db.Column(db.DateTime, onupdate=func.now())
        
        provider = db.relationship('ServiceProvider')
        customer = db.relationship('User')

        @validates('rating')
        def validate_rating(self, key, rating):
            if not 1 <= rating <= 5:
                raise ValueError('Rating must be between 1 and 5')
            return rating

        def to_dict(self):
            return {
                'id': self.id,
                'provider_id': self.provider_id,
                'customer_id': self.customer_id,
                'rating': self.rating,
                'content': self.content,
                'created_at': self.created_at.isoformat() if self.created_at else None,
                'updated_at': self.updated_at.isoformat() if self.updated_at else None
            }

    # Error handlers
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({'error': 'Bad request', 'message': str(error)}), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({'error': 'Unauthorized', 'message': 'Authentication required'}), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({'error': 'Forbidden', 'message': 'You do not have permission to access this resource'}), 403

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found', 'message': 'The requested resource was not found'}), 404

    @app.errorhandler(500)
    def internal_server_error(error):
        return jsonify({'error': 'Internal server error', 'message': 'An unexpected error occurred'}), 500

    # Routes
    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/health')
    def health_check():
        return jsonify({
            'status': 'healthy',
            'timestamp': datetime.utcnow().isoformat(),
            'version': '1.0.0'
        })

    # Serve static files
    @app.route('/static/<path:filename>')
    def serve_static(filename):
        return send_from_directory(app.static_folder, filename)

    # Serve uploaded files
    @app.route('/uploads/<path:filename>')
    def serve_upload(filename):
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

    return app

if __name__ == '__main__':
    app = create_app(os.getenv('FLASK_ENV', 'development'))
    socketio.run(app, 
                debug=os.environ.get('FLASK_DEBUG', False),
                host=os.getenv('FLASK_HOST', '0.0.0.0'),
                port=int(os.getenv('FLASK_PORT', 5000)))
