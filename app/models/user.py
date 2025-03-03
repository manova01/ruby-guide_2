from app import db
from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash
import enum
from marshmallow import Schema, fields
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

class UserRole(enum.Enum):
    CUSTOMER = "customer"
    PROVIDER = "provider"
    ADMIN = "admin"

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

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
