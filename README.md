# Task Tracker Lite

A modern, full-stack task management application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Backend Features
- ✅ User authentication with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ CRUD operations for tasks
- ✅ Overdue task detection and filtering
- ✅ Clean code structure with proper error handling
- ✅ MongoDB integration with Mongoose

### Frontend Features
- ✅ Modern, responsive UI design
- ✅ User authentication flow (login/signup)
- ✅ Task dashboard with real-time updates
- ✅ Add, edit, and delete tasks
- ✅ Overdue task highlighting (red for overdue > 5 days)
- ✅ Status display ("Due in X days" or "Overdue by Y days")
- ✅ Logout functionality
- ✅ Mobile-responsive design

### Bonus Features
- ✅ Secure token handling
- ✅ Clean and intuitive UI/UX
- ✅ Form validation
- ✅ Error handling and user feedback

## Project Structure

```
Task-tracker-lite/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Auth.css
│   │   │   └── Dashboard.css
│   │   ├── contexts/
│   │   │   └── AuthContext.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── README.md
├── start.bat
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd task
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Create environment file
cp env.example .env

# Edit .env file with your configuration
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# FRONTEND_URL=http://localhost:3000
# PORT=5000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install
```

## Running the Application

### Development Mode

1. **Start the backend server:**
```bash
# From the root directory (task/)
npm start
```
The backend will run on `http://localhost:5000`

2. **Start the frontend development server:**
```bash
# From the frontend directory (task/frontend/)
npm run dev
```
The frontend will run on `http://localhost:3000`



## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Tasks
- `POST /api/tasks` - Create new task (protected)
- `GET /api/tasks` - Get user's tasks (protected)
- `PATCH /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `GET /api/tasks/overdue` - Get overdue tasks (protected)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tasktracker

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Server Port
PORT=5000
```

## Key Features Implementation

### 1. Task Completion Rule
Tasks cannot be marked as completed if the due date is in the future. This is enforced both on the frontend and backend.

### 2. Overdue Task Highlighting
- Tasks overdue by more than 5 days are highlighted in red
- Overdue tasks are displayed in a separate section
- Status text shows "Overdue by X days"

### 3. Status Display
- "Due in X days" for future tasks
- "Due today" for today's tasks
- "Due tomorrow" for tomorrow's tasks
- "Overdue by Y days" for overdue tasks
- "Completed" for completed tasks

### 4. Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Automatic token validation

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling



