// Example usage of your-formpilot-crud in Node.js
const Crublibrary = require('./index');

// Set your API credentials (in a real app, use environment variables)
process.env.CRUD_API_KEY = 'your-api-key-here';
process.env.CRUD_API_URL = 'https://your-api-url.com/api';

// Example async function to demonstrate CRUD operations
async function runExample() {
  try {
    console.log('--------- CRUD LIBRARY EXAMPLE ---------');
    
    // 1. Create an item
    console.log('\n1. Creating an item...');
    const createResult = await Crublibrary.create({
      value: 0.5,
      txHash: '0xabc123'
    });
    console.log('Result:', createResult);
    
    // Save the ID for further operations
    if (!createResult.id) {
      throw new Error('Failed to create item');
    }
    const itemId = createResult.id;
    
    // 2. Get the item
    console.log('\n2. Getting the item with ID:', itemId);
    const getResult = await Crublibrary.get(itemId);
    console.log('Result:', getResult);
    
    // 3. Update the item
    console.log('\n3. Updating the item with ID:', itemId);
    const updateResult = await Crublibrary.update(itemId, {
      value: 0.9
    });
    console.log('Result:', updateResult);
    
    // 4. Get the updated item
    console.log('\n4. Getting the updated item with ID:', itemId);
    const getUpdatedResult = await Crublibrary.get(itemId);
    console.log('Result:', getUpdatedResult);
    
    // 5. Delete the item
    console.log('\n5. Deleting the item with ID:', itemId);
    const deleteResult = await Crublibrary.delete(itemId);
    console.log('Result:', deleteResult);
    
    console.log('\nExample completed successfully!');
  } catch (error) {
    console.error('Error running example:', error);
  }
}

// Run the example
runExample(); 