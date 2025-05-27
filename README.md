# SnapUrl

A modern URL shortening and management platform built with React, Node.js, and Supabase.

## 🚀 Features

- URL shortening with custom aliases
- URL analytics and tracking
- User authentication and authorization
- Modern, responsive UI 
- Real-time URL management
<!-- - API support for integration -->

## 🏗️ Project Structure

The project is divided into two main parts:

### Frontend (Triel)
- Built with React + Vite
- Uses Tailwind CSS for styling
- Redux for state management
- React Query for data fetching
- Modern UI components with Radix UI

### Backend (Ariel)
- Node.js/Express server
- Supabase for database and authentication
- JWT for secure authentication
- RESTful API architecture

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Redux Toolkit
- React Query
- Radix UI Components
- React Router DOM
- React Toastify

### Backend
- Node.js
- Express
- Supabase
- JWT
- bcryptjs
- CORS
- dotenv

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/snapurl.git
cd snapurl
```

2. Install frontend dependencies:
```bash
cd triel
npm install
```

3. Install backend dependencies:
```bash
cd ../ariel
npm install
```

4. Set up environment variables:

Create `.env` files in both `triel` and `ariel` directories:

Frontend (.env in triel/):
```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Backend (.env in ariel/):
```env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
JWT_SECRET=your_jwt_secret
```

### Running the Application

1. Start the backend server:
```bash
cd ariel
npm run dev
```

2. Start the frontend development server:
```bash
cd triel
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🐳 Docker Support

The project includes Docker configuration for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 📝 API Documentation

The API documentation is available at `/api/docs` when running the backend server.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the amazing tools and libraries 