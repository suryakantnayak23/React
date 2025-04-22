# Your FormPilot CRUD

A simple CRUD library for managing data with your FormPilot API credentials.

## Installation

```bash
npm install your-formpilot-crud
```

## Usage

### Configuration

Set your API credentials before using the library:

```javascript
// Using environment variables (recommended)
process.env.CRUD_API_URL = 'http://localhost:3000/api';
process.env.CRUD_API_KEY = 'your-api-key';

// OR
// The library automatically uses API credentials from localStorage if you're using it in a browser
// after logging in to the FormPilot platform
```

### Creating Items

```javascript
const Crublibrary = require('your-formpilot-crud');

// Create a new item
const response = await Crublibrary.create({ 
  value: 0.5, 
  txHash: "32424" 
});
// Output: { id: "32872", status: "created successfully" }
```

### Getting Items

```javascript
const Crublibrary = require('your-formpilot-crud');

// Get an item by ID
const item = await Crublibrary.get("32872");
// Output: { value: 0.5, txHash: "0x...", id: "32872" }
```

### Updating Items

```javascript
const Crublibrary = require('your-formpilot-crud');

// Update an item by ID
const response = await Crublibrary.update("32872", { 
  value: 0.9 
});
// Output: { status: "updated successfully" }
```

### Deleting Items

```javascript
const Crublibrary = require('your-formpilot-crud');

// Delete an item by ID
const response = await Crublibrary.delete("32872");
// Output: { status: "deleted successfully" }
```

## Credit System

Each operation (except get) consumes one credit from your account. Make sure you have enough credits to perform operations.

## Browser Support

This library works both in Node.js and browser environments. In the browser, it will automatically use the credentials from localStorage if you're logged into the FormPilot platform.

## License

MIT 