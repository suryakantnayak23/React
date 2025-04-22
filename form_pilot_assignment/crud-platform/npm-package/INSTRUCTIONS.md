# FormPilot CRUD Library - Usage Instructions

This document provides detailed instructions on how to use the FormPilot CRUD Library in your projects.

## Installation

### Installing from npm (Once Published)

```bash
npm install your-formpilot-crud
```

### Installing Locally for Development

1. Navigate to the npm package directory:

```bash
cd crud-platform/npm-package/your-formpilot-crud
```

2. Link the package locally:

```bash
npm link
```

3. In your project, link to the package:

```bash
cd your-project
npm link your-formpilot-crud
```

## Configuration

### For Browser Applications

If you're using the library in a browser application that's part of the FormPilot platform, the library will automatically pick up credentials from localStorage after the user logs in.

No additional configuration is needed.

### For Node.js Applications

Set your API credentials using environment variables:

```javascript
// Include these before using the library
process.env.CRUD_API_URL = 'http://localhost:3000/api';
process.env.CRUD_API_KEY = 'your-api-key-from-dashboard';
```

For better security, consider using a `.env` file with a package like `dotenv`:

```bash
npm install dotenv
```

Then create a `.env` file:

```
CRUD_API_URL=http://localhost:3000/api
CRUD_API_KEY=your-api-key-from-dashboard
```

And import it at the top of your main file:

```javascript
require('dotenv').config();
const Crublibrary = require('your-formpilot-crud');
```

## Basic Usage

### Import the Library

```javascript
// In CommonJS (Node.js)
const Crublibrary = require('your-formpilot-crud');

// OR in ES Modules (React, etc.)
import Crublibrary from 'your-formpilot-crud';
```

### Creating an Item

```javascript
const createItem = async () => {
  try {
    const result = await Crublibrary.create({
      value: 0.5,
      txHash: "123456" // can be any data you want to store
    });
    
    if (result.error) {
      console.error("Error:", result.error);
      return;
    }
    
    console.log("Item created with ID:", result.id);
    return result.id;
  } catch (error) {
    console.error("Failed to create item:", error);
  }
};
```

### Retrieving an Item

```javascript
const getItem = async (id) => {
  try {
    const item = await Crublibrary.get(id);
    
    if (item.error) {
      console.error("Error:", item.error);
      return;
    }
    
    console.log("Retrieved item:", item);
    return item;
  } catch (error) {
    console.error("Failed to get item:", error);
  }
};
```

### Updating an Item

```javascript
const updateItem = async (id, newData) => {
  try {
    const result = await Crublibrary.update(id, newData);
    
    if (result.error) {
      console.error("Error:", result.error);
      return;
    }
    
    console.log("Update status:", result.status);
    return result;
  } catch (error) {
    console.error("Failed to update item:", error);
  }
};
```

### Deleting an Item

```javascript
const deleteItem = async (id) => {
  try {
    const result = await Crublibrary.delete(id);
    
    if (result.error) {
      console.error("Error:", result.error);
      return;
    }
    
    console.log("Delete status:", result.status);
    return result;
  } catch (error) {
    console.error("Failed to delete item:", error);
  }
};
```

## Advanced Usage

### Error Handling

The library returns errors in a consistent format:

```javascript
try {
  const result = await Crublibrary.create({/* data */});
  
  // Check for error in the response
  if (result.error) {
    // Handle specific error cases
    if (result.error.includes('Not authenticated')) {
      // Handle authentication error
    } else if (result.error.includes('Insufficient credits')) {
      // Handle credit error
    } else {
      // Handle other errors
    }
  }
} catch (error) {
  // Handle unexpected errors
  console.error("Unexpected error:", error);
}
```

### Credit Management

Each operation (except `get`) consumes one credit. Operations will fail if you don't have enough credits.

To check credits remaining:

```javascript
// In browser environments
const user = JSON.parse(localStorage.getItem('user') || '{}');
console.log("Credits remaining:", user.credits);

// In Node.js, you'll need to track this on your own
```

## Complete Example

The package includes a complete example file:

```javascript
// See npm-package/your-formpilot-crud/example.js
```

## Common Issues

### Authentication Errors

If you see "Not authenticated" errors:

1. Make sure you're logged in (browser) or have set API key in environment variables (Node.js)
2. Your API key might be invalid - check your dashboard for the correct key

### Credit Errors

If you see "Insufficient credits" errors:

1. Check your remaining credits on the dashboard
2. Recharge your credits if needed

### Browser Storage Issues

If data isn't persisting in the browser:

1. Make sure cookies/localStorage are enabled in your browser
2. Check for extensions that might be clearing localStorage

## Getting Help

If you encounter issues, please:

1. Check the console for detailed error messages
2. Refer to the dashboard documentation
3. Contact support at support@yourformapp.com