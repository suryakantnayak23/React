# Your-FormpilotCrud

A lightweight NPM library to interact with CRUD API.

## Installation

```bash
npm install your-formpilot-crud
```

## Configuration

Create a `.env` file in your project root with the following variables:

```
CRUD_API_URL=http://your-api-url.com
CRUD_API_KEY=your-unique-api-key
```

Or set them programmatically:

```javascript
process.env.CRUD_API_URL = 'http://your-api-url.com';
process.env.CRUD_API_KEY = 'your-unique-api-key';
```

## Usage

```javascript
const Crublibrary = require('your-formpilot-crud');

// Create a new item
const response1 = await Crublibrary.create({ value: 0.5, txHash: "32424" });
// Output: { id: "32872", status: "created successfully" }

// Get an item by ID
const response2 = await Crublibrary.get("32872");
// Output: { value: 0.5, txHash: "0x..." }

// Update an item by ID
const response3 = await Crublibrary.update("32872", { value: 0.9 });
// Output: { status: "updated successfully" }

// Get the updated item
const response4 = await Crublibrary.get("32872");
// Output: { value: 0.9 }

// Delete an item by ID
const response5 = await Crublibrary.delete("32872");
// Output: { status: "deleted successfully" }
```

## Error Handling

The library throws descriptive errors when:

- API key or URL is missing
- Credit limit is exceeded
- Invalid input is provided
- Item with the given ID does not exist

Example error message when credit limit is exceeded:
```
Request limit exceeded. Please recharge credits.
```

## TypeScript Support

The library includes TypeScript type definitions for all methods and responses. 