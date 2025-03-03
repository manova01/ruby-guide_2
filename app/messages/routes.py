from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.messages import bp
from app.models import Message, message_schema, messages_schema, User
from app import db, socketio

@bp.route('/messages', methods=['GET'])
@jwt_required()
def get_messages():
    user_id = get_jwt_identity()
    messages = Message.query.filter(
        (Message.sender_id == user_id) | (Message.recipient_id == user_id)
    ).order_by(Message.created_at.desc()).all()
    return jsonify(messages_schema.dump(messages)), 200

@bp.route('/messages/<int:recipient_id>', methods=['POST'])
@jwt_required()
def send_message(recipient_id):
    sender_id = get_jwt_identity()
    
    if not User.query.get(recipient_id):
        return jsonify({'error': 'Recipient not found'}), 404
        
    data = request.get_json()
    message = Message(
        sender_id=sender_id,
        recipient_id=recipient_id,
        content=data['content']
    )
    
    db.session.add(message)
    db.session.commit()
    
    # Emit message to recipient
    socketio.emit(
        'new_message',
        message_schema.dump(message),
        room=str(recipient_id)
    )
    
    return jsonify(message_schema.dump(message)), 201

@socketio.on('connect')
@jwt_required()
def handle_connect():
    user_id = get_jwt_identity()
    socketio.emit('user_connected', {'user_id': user_id})

@socketio.on('join')
def handle_join(data):
    room = data['room']
    socketio.join_room(room)
    socketio.emit('user_joined', {'room': room}, room=room)
