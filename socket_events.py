from flask_socketio import join_room, leave_room

def register_socket_events(socketio):
    @socketio.on('connect')
    def handle_connect():
        print('Client connected')

    @socketio.on('join')
    def handle_join(data):
        user_id = data.get('user_id')
        if user_id:
            join_room(f"user_{user_id}")
            print(f"User {user_id} joined their room")

    @socketio.on('leave')
    def handle_leave(data):
        user_id = data.get('user_id')
        if user_id:
            leave_room(f"user_{user_id}")
            print(f"User {user_id} left their room")

