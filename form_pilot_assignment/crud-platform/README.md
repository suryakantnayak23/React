# CRUD Platform

A platform that provides users with a publicly available CRUD API. Users can log in using Google OAuth to receive an API key and URL for making CRUD requests.

## Features

- Google OAuth login only (no email/password)
- Users receive a unique API_URL and API_KEY upon login
- Initial 4 request credits for new users
- Credit usage tracking
- Credit recharge system via email

## Project Structure

The project is divided into two main parts:

- `client`: React + TypeScript frontend
- `server`: Node.js + Express backend with PostgreSQL database

## Setup Instructions

### Server Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file.

4. Create the PostgreSQL database:
   ```
   createdb crud_platform
   ```

5. Run database migrations:
   ```
   npm run migrate
   ```

6. Start the server:
   ```
   npm run dev
   ```

### Client Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the `.env.example` file.

4. Start the client:
   ```
   npm start
   ```

## API Endpoints

- `POST /api/auth/google`: Google OAuth login
- `GET /api/user/me`: Get current user info
- `GET /api/user/credits`: Get user's credit information
- `POST /api/crud`: Create a new item
- `GET /api/crud/:id`: Get an item by ID
- `PUT /api/crud/:id`: Update an item by ID
- `DELETE /api/crud/:id`: Delete an item by ID 