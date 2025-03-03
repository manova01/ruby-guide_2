from flask import Flask, jsonify, request, render_template
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

# Load environment variables
load_dotenv()

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI', 'sqlite:///rudzz.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES', 86400))  # 24 hours

    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    socketio.init_app(app, cors_allowed_origins="*")
    CORS(app)

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
        role = db.Column(db.String(20), nullable=False, default='customer')  # customer, provider, admin
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
        
        def set_password(self, password):
            self.password_hash = generate_password_hash(password)
        
        def check_password(self, password):
            return check_password_hash(self.password_hash, password)

    class ServiceProvider(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        business_name = db.Column(db.String(100), nullable=False)
        description = db.Column(db.Text, nullable=True)
        address = db.Column(db.String(200), nullable=False)
        latitude = db.Column(db.Float, nullable=False)
        longitude = db.Column(db.Float, nullable=False)
        services = db.Column(db.Text, nullable=True)  # Comma-separated list of services
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
        
        user = db.relationship('User', backref=db.backref('provider', uselist=False))

    class Message(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        content = db.Column(db.Text, nullable=False)
        read = db.Column(db.Boolean, default=False)
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
        
        sender = db.relationship('User', foreign_keys=[sender_id])
        receiver = db.relationship('User', foreign_keys=[receiver_id])

    class BlogPost(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        title = db.Column(db.String(200), nullable=False)
        content = db.Column(db.Text, nullable=False)
        author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
        
        author = db.relationship('User')
        comments = db.relationship('Comment', backref='post', lazy=True, cascade="all, delete-orphan")

    class Comment(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        content = db.Column(db.Text, nullable=False)
        author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False)
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
        
        author = db.relationship('User')

    class Review(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        provider_id = db.Column(db.Integer, db.ForeignKey('service_provider.id'), nullable=False)
        customer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
        rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
        content = db.Column(db.Text, nullable=True)
        created_at = db.Column(db.DateTime, default=datetime.utcnow)
        
        provider = db.relationship('ServiceProvider')
        customer = db.relationship('User')

    # Routes - these will be in separate blueprint files
    @app.route('/')
    def index():
        return render_template('index.html')


    return app

if __name__ == '__main__':
    app = create_app()
    socketio.run(app, debug=True)

