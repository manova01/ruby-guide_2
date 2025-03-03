# Ruby Guide Service Provider Platform

A Flask-based web application for connecting service providers with customers.

## Features

- User authentication (JWT-based)
- Service provider profiles
- Real-time messaging
- Service search and discovery
- Rating and review system

## Tech Stack

- Backend: Flask (Python)
- Database: SQLite (development) / PostgreSQL (production)
- Real-time Communication: Socket.IO
- Authentication: JWT
- Frontend: React

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ruby-guide_2.git
cd ruby-guide_2
```

2. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Initialize database:
```bash
flask db upgrade
```

6. Run the development server:
```bash
python run.py
```

## Testing

Run tests using pytest:
```bash
pytest
```

## API Documentation

### Authentication Endpoints

- POST /auth/register - Register new user
- POST /auth/login - Login user
- POST /auth/refresh - Refresh access token
- GET /auth/me - Get current user

### Service Provider Endpoints

- GET /providers - List all providers
- POST /providers - Create provider profile
- GET /providers/<id> - Get provider details
- PUT /providers/<id> - Update provider profile

### Messaging Endpoints

- GET /messages - Get user messages
- POST /messages/<recipient_id> - Send message
- WebSocket events for real-time messaging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
