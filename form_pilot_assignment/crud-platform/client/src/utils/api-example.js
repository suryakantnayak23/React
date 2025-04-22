// Example of using your-formpilot-crud in a React application
import CrudLibrary from 'your-formpilot-crud';

/**
 * Example function to create a new item
 * @param {Object} data - The data to create
 * @returns {Promise<Object>} - The created item with ID
 */
export const createItem = async (data) => {
  try {
    // Already authenticated from the FormPilot platform
    const result = await CrudLibrary.create(data);
    return result;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

/**
 * Example function to get an item by ID
 * @param {string} id - The item ID
 * @returns {Promise<Object>} - The item data
 */
export const getItem = async (id) => {
  try {
    const item = await CrudLibrary.get(id);
    return item;
  } catch (error) {
    console.error('Error getting item:', error);
    throw error;
  }
};

/**
 * Example function to update an item
 * @param {string} id - The item ID
 * @param {Object} data - The data to update
 * @returns {Promise<Object>} - Status response
 */
export const updateItem = async (id, data) => {
  try {
    const result = await CrudLibrary.update(id, data);
    return result;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
};

/**
 * Example function to delete an item
 * @param {string} id - The item ID
 * @returns {Promise<Object>} - Status response
 */
export const deleteItem = async (id) => {
  try {
    const result = await CrudLibrary.delete(id);
    return result;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};

// Example of how to use these functions in your React components:
/*
import React, { useState, useEffect } from 'react';
import { createItem, getItem, updateItem, deleteItem } from '../utils/api-example';

const ExampleComponent = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateItem = async () => {
    try {
      setLoading(true);
      const result = await createItem({ value: 0.5, txHash: 'example-tx' });
      console.log('Created item:', result);
      // Handle success...
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Similar functions for get, update, delete...

  return (
    <div>
      <button onClick={handleCreateItem} disabled={loading}>
        Create Item
      </button>
      {error && <p className="error">{error}</p>}
      {item && <pre>{JSON.stringify(item, null, 2)}</pre>}
    </div>
  );
};

export default ExampleComponent;
*/ 