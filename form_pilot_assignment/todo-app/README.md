# Todo App

A simple Todo application that uses the Your-FormpilotCrud library.

## Features

- Create, read, update, and delete todos
- Beautiful and modern UI with good UX
- Credit usage tracking
- Notification when credits are exhausted

## Setup Instructions

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file based on the `.env.example` file with your API key and URL from the CRUD Platform.

3. Start the application:
   ```
   npm start
   ```

## Usage

1. Add new todos using the form at the top of the page.
2. View all your todos in the list.
3. Edit a todo by clicking the edit button.
4. Delete a todo by clicking the delete button.
5. When credits are exhausted, you'll see a notification with instructions to recharge.

## Technical Details

This application uses:
- React with TypeScript for the frontend
- Bootstrap for styling
- Your-FormpilotCrud for CRUD operations
- React Toastify for notifications

## Credit System

The app consumes one credit for each CRUD operation. When credits are exhausted, a notification appears with instructions to email support for a recharge. 