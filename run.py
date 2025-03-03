from app import create_app, socketio

app = create_app()

if __name__ == '__main__':
    socketio.run(app, 
                debug=True, 
                host='127.0.0.1',
                port=5000,
                allow_unsafe_werkzeug=True,  # Allow HTTP in development
                ssl_context=None)  # Disable SSL
