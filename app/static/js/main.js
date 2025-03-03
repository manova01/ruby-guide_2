// Initialize Socket.IO connection
const socket = io({
    auth: {
        token: localStorage.getItem('token')
    }
});

// Socket event handlers
socket.on('connect', () => {
    console.log('Connected to Socket.IO server');
});

socket.on('message', (data) => {
    console.log('New message received:', data);
    // Handle incoming messages (e.g., update UI, show notifications)
});

socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO server');
});

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    const app = React.createElement(App);
    ReactDOM.render(app, root);
});
