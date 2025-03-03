from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_socketio import emit
from app.models import Message, User
from app import db, socketio
from . import api

@api.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    current_user_id = get_jwt_identity()
    messages = Message.query.filter(
        (Message.sender_id == current_user_id) | 
        (Message.receiver_id == current_user_id)
    ).order_by(Message.created_at.desc()).all()
    return jsonify([message.to_dict() for message in messages])

@api.route('/messages/<int:id>', methods=['GET'])
@jwt_required()
def get_message(id):
    current_user_id = get_jwt_identity()
    message = Message.query.get_or_404(id)
    
    if message.sender_id != current_user_id and message.receiver_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
        
    return jsonify(message.to_dict())

@api.route('/messages', methods=['POST'])
@jwt_required()
def create_message():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    receiver = User.query.get_or_404(data['receiver_id'])
    message = Message(
        sender_id=current_user_id,
        receiver_id=receiver.id,
        content=data['content']
    )
    
    db.session.add(message)
    db.session.commit()
    
    # Emit socket event
    socketio.emit(
        'new_message',
        message.to_dict(),
        room=str(receiver.id)
    )
    
    return jsonify(message.to_dict()), 201

@api.route('/messages/<int:id>/read', methods=['POST'])
@jwt_required()
def mark_message_read(id):
    current_user_id = get_jwt_identity()
    message = Message.query.get_or_404(id)
    
    if message.receiver_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    message.read = True
    message.read_at = db.func.now()
    db.session.commit()
    
    return jsonify(message.to_dict())
