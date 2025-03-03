from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .models import db, Message, User
from .socket_events import socketio

messages_bp = Blueprint('messages', __name__)

@messages_bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_messages(user_id):
    current_user_id = get_jwt_identity()
    
    messages = Message.query.filter(
        ((Message.sender_id == current_user_id) & (Message.receiver_id == user_id)) |
        ((Message.sender_id == user_id) & (Message.receiver_id == current_user_id))
    ).order_by(Message.created_at).all()
    
    for message in messages:
        if message.receiver_id == current_user_id and not message.read:
            message.read = True
    
    db.session.commit()
    
    return jsonify([message_to_dict(message) for message in messages])

@messages_bp.route('', methods=['POST'])
@jwt_required()
def send_message():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    message = Message(
        sender_id=current_user_id,
        receiver_id=data['receiver_id'],
        content=data['content']
    )
    
    db.session.add(message)
    db.session.commit()
    
    message_dict = message_to_dict(message)
    socketio.emit('new_message', message_dict, room=f"user_{data['receiver_id']}")
    
    return jsonify(message_dict), 201

def message_to_dict(message):
    return {
        "id": message.id,
        "sender_id": message.sender_id,
        "receiver_id": message.receiver_id,
        "content": message.content,
        "read": message.read,
        "created_at": message.created_at.isoformat()
    }

