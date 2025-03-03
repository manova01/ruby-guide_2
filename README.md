# Rudzz - Automotive Service Provider Platform

Rudzz is a modern web application that connects customers with automotive service providers based on their location. The platform includes features like user authentication, geolocation-based search, real-time messaging, a blog section, and an admin dashboard.

## Features

### User Authentication
- Login with email or phone number
- Secure password hashing using werkzeug.security
- JWT-based authentication with Flask-JWT-Extended
- Multiple user roles: Customer, Service Provider, Admin

### Service Provider Search
- Geolocation-based search using geopy
- Advanced filtering options (e.g., service type, ratings)
- Real-time distance calculation

### Messaging System
- Direct messaging between users
- Message history stored in the database
- Real-time notifications using Flask-SocketIO

### Blog Section
- Automotive tips and news
- Rich text editor for admins (e.g., Quill.js)
- Comment system for users

### Admin Dashboard
- User management (CRUD operations)
- Content moderation for blog posts and comments
- Analytics and reporting (e.g., user activity, service provider performance)

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: React with Next.js
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Real-time Communication**: Flask-SocketIO
- **Geolocation**: geopy
- **Styling**: Tailwind CSS

## Running Locally

### Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL
- Redis (for SocketIO)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rudzz.git
   cd rudzz

"# ruby-guide_2" 
