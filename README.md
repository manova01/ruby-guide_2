# Ruby Guide

![CI/CD Pipeline](https://github.com/{your-username}/ruby-guide_2/actions/workflows/ci.yml/badge.svg)

A Python web application with Next.js frontend for Ruby programming guide.

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

## Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/{your-username}/ruby-guide_2.git
cd ruby-guide_2
```

2. Set up Python environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up frontend dependencies:
```bash
npm install
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run the application:
```bash
# Terminal 1 - Backend
python run.py

# Terminal 2 - Frontend
npm run dev
```

## Development

- Run Python tests: `pytest tests/`
- Run frontend tests: `npm test`
- Run linting: `flake8`
- Build frontend: `npm run build`

## CI/CD

The project uses GitHub Actions for CI/CD:

- Python tests and linting
- Frontend build and tests
- Security scanning with Snyk
- Automated deployments

See `.github/workflows/ci.yml` for the complete pipeline configuration.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
