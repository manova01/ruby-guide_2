function App() {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [providers, setProviders] = React.useState([]);
    const [messages, setMessages] = React.useState([]);
    const [socket, setSocket] = React.useState(null);

    React.useEffect(() => {
        // Initialize Socket.IO connection
        const newSocket = io(window.INITIAL_DATA.socketUrl);
        setSocket(newSocket);

        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            loadCurrentUser();
        } else {
            setIsLoading(false);
        }

        return () => newSocket.close();
    }, []);

    React.useEffect(() => {
        if (socket && user) {
            // Join user's room for private messages
            socket.emit('join', { user_id: user.id });

            // Listen for new messages
            socket.on('new_message', (message) => {
                setMessages(prev => [...prev, message]);
            });
        }
    }, [socket, user]);

    const loadCurrentUser = async () => {
        try {
            const userData = await window.api.getCurrentUser();
            setUser(userData);
            loadUserData(userData);
        } catch (error) {
            console.error('Failed to load user:', error);
            window.api.clearToken();
        } finally {
            setIsLoading(false);
        }
    };

    const loadUserData = async (userData) => {
        try {
            const [providersData, messagesData] = await Promise.all([
                window.api.getProviders(),
                window.api.getMessages()
            ]);
            setProviders(providersData);
            setMessages(messagesData);
        } catch (error) {
            console.error('Failed to load data:', error);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const data = await window.api.login(email, password);
            setUser(data.user);
            loadUserData(data.user);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        window.api.clearToken();
        setUser(null);
        setProviders([]);
        setMessages([]);
        if (socket) {
            socket.disconnect();
        }
    };

    const handleRegister = async (userData) => {
        try {
            await window.api.register(userData);
            await handleLogin(userData.email, userData.password);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const handleSendMessage = async (receiverId, content) => {
        try {
            const message = await window.api.sendMessage(receiverId, content);
            setMessages(prev => [...prev, message]);
        } catch (error) {
            console.error('Failed to send message:', error);
            throw error;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="app">
            <header className="app-header">
                <h1>Service Provider App</h1>
                {user ? (
                    <div className="user-info">
                        <span>Welcome, {user.first_name}!</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <button onClick={() => setShowLogin(true)}>Login</button>
                        <button onClick={() => setShowRegister(true)}>Register</button>
                    </div>
                )}
            </header>

            <main className="app-main">
                {user ? (
                    <>
                        <section className="providers-section">
                            <h2>Service Providers</h2>
                            <div className="providers-grid">
                                {providers.map(provider => (
                                    <div key={provider.id} className="provider-card">
                                        <h3>{provider.business_name}</h3>
                                        <p>{provider.description}</p>
                                        <div className="provider-rating">
                                            Rating: {provider.rating} ({provider.review_count} reviews)
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="messages-section">
                            <h2>Messages</h2>
                            <div className="messages-list">
                                {messages.map(message => (
                                    <div key={message.id} className="message-item">
                                        <div className="message-header">
                                            From: {message.sender_id === user.id ? 'You' : message.sender.first_name}
                                        </div>
                                        <div className="message-content">{message.content}</div>
                                        <div className="message-time">
                                            {new Date(message.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                ) : (
                    <div className="welcome-section">
                        <h2>Welcome to Service Provider App</h2>
                        <p>Please login or register to continue</p>
                    </div>
                )}
            </main>
        </div>
    );
}

function LoginForm({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

function ProviderCard({ provider }) {
    return (
        <div className="provider-card">
            <h3>{provider.business_name}</h3>
            <p>{provider.description}</p>
            <div className="provider-rating">
                Rating: {provider.rating.toFixed(1)} ({provider.review_count} reviews)
            </div>
            <div className="provider-services">
                {provider.services?.map((service, index) => (
                    <span key={index} className="service-tag">{service}</span>
                ))}
            </div>
            <button onClick={() => window.location.href = `/providers/${provider.id}`}>
                View Details
            </button>
        </div>
    );
}
