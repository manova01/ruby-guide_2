from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import db, User, ServiceProvider

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if data.get('email') and User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400
    
    if data.get('phone') and User.query.filter_by(phone=data['phone']).first():
        return jsonify({"error": "Phone number already registered"}), 400
    
    user = User(
        email=data.get('email'),
        phone=data.get('phone'),
        first_name=data['first_name'],
        last_name=data['last_name'],
        role=data.get('role', 'customer')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    
    if data.get('role') == 'provider':
        provider = ServiceProvider(
            user=user,
            business_name=data['business_name'],
            description=data.get('description', ''),
            address=data['address'],
            latitude=data['latitude'],
            longitude=data['longitude'],
            services=','.join(data.get('services', []))
        )
        db.session.add(provider)
    
    db.session.commit()
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        "message": "User registered successfully",
        "access_token": access_token,
        "user": user_to_dict(user)
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = None
    if data.get('email'):
        user = User.query.filter_by(email=data['email']).first()
    elif data.get('phone'):
        user = User.query.filter_by(phone=data['phone']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        "access_token": access_token,
        "user": user_to_dict(user)
    })

def user_to_dict(user):
    return {
        "id": user.id,
        "email": user.email,
        "phone": user.phone,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "role": user.role
    }

