# Role Based Access Control API

A simple Express.js API demonstrating role-based access control using JWT tokens.

## Features

- JWT-based authentication
- Role-based access control
- Protected routes
- Cookie-based token storage

## Setup

1. Clone the repository
2. Install dependencies:
```bash
  npm install
```
3. Create a `.env` file with:
```bash
  SECRET_KEY=your_secret_key_here
```
4. Start the server:
```bash
  node index.js
```

## Test Configuration

For demonstration purposes, the API uses a hardcoded user with the following credentials:
```javascript
const user = {
    name: "krrish",
    age: 20,
    role: "admin"
};
```
This user is automatically used for JWT token generation and has admin privileges.

## API Endpoints

### GET /
- Generates a new JWT token using the hardcoded admin user
- Sets token in HTTP-only cookie
- Returns: Hello World message

### GET /admin
- Protected route for admin users only
- Requires valid JWT token with admin role
- Returns: Welcome message or unauthorized error

### GET /login
- Login page endpoint
- Currently returns placeholder message

### POST /
- Protected route for authenticated users
- Requires valid JWT token
- Returns: Welcome message or unauthorized error

## Authentication Flow

1. Visit `/` to get a JWT token (stored in cookie)
2. Access protected routes with the token
3. Admin-only routes check for admin role in token
4. Invalid/missing tokens redirect to login

## Technologies Used

- Express.js
- JSON Web Tokens (JWT)
- Cookie Parser
- Dotenv

## Note

In a production environment, you should replace the hardcoded user with proper user authentication and database storage.

## Future Plans

The following enhancements are planned to transform this demonstration into a full-fledged project:

1. Add HTML Pages:
   - Login page with username/password form
   - Admin dashboard , accessible only to admin users
   - user pages which is accessible to all logged-in users
   - Error pages for unauthorized access


2. Additional Features:
   - User registration system
   - Password hashing and security
   - mongodb integration for user data storage
   - User roles management interface

These improvements will make the project more practical for real-world applications while maintaining the current role-based access control system.