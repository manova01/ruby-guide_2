from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User
from app import db, limiter
from . import api

@api.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@api.route('/users/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id:
        return jsonify({'error': 'Unauthorized'}), 403
        
    user = User.query.get_or_404(id)
    data = request.get_json()
    
    if 'email' in data:
        user.email = data['email']
    if 'phone' in data:
        user.phone = data['phone']
    if 'first_name' in data:
        user.first_name = data['first_name']
    if 'last_name' in data:
        user.last_name = data['last_name']
        
    db.session.commit()
    return jsonify(user.to_dict())

@api.route('/users/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    current_user_id = get_jwt_identity()
    if current_user_id != id:
        return jsonify({'error': 'Unauthorized'}), 403
        
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return '', 204
