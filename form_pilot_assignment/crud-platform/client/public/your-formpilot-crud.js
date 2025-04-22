/**
 * FormPilot CRUD Library
 * A simple library to perform CRUD operations using localStorage
 */

// Initialize storage if it doesn't exist
const initStorage = () => {
  if (!localStorage.getItem('formpilot_items')) {
    localStorage.setItem('formpilot_items', JSON.stringify({}));
  }
};

// Get all items
const getAllItems = () => {
  initStorage();
  return JSON.parse(localStorage.getItem('formpilot_items') || '{}');
};

// Save all items
const saveAllItems = (items) => {
  localStorage.setItem('formpilot_items', JSON.stringify(items));
};

// Generate a unique ID
const generateId = () => {
  return Math.floor(Math.random() * 100000).toString();
};

/**
 * Create a new item
 * @param {Object} data - Data to create
 * @returns {Object} - Status response
 */
const create = async (data) => {
  try {
    // Check if credentials exist in localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please log in.' };
    }
    
    // Decrement credits
    if (user.credits <= 0) {
      return { error: 'Insufficient credits. Please recharge your credits.' };
    }
    
    // Update credits
    user.credits--;
    localStorage.setItem('user', JSON.stringify(user));
    
    // Create a new item
    const items = getAllItems();
    const id = generateId();
    items[id] = { ...data, id, createdAt: new Date().toISOString() };
    saveAllItems(items);
    
    return { id, status: "created successfully" };
  } catch (error) {
    console.error('Create operation failed:', error);
    return { error: 'Failed to create item' };
  }
};

/**
 * Get an item by ID
 * @param {string} id - Item ID
 * @returns {Object} - Item data
 */
const get = async (id) => {
  try {
    // Check if credentials exist in localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please log in.' };
    }
    
    // Get item
    const items = getAllItems();
    const item = items[id];
    
    if (!item) {
      return { error: 'Item not found' };
    }
    
    return item;
  } catch (error) {
    console.error('Get operation failed:', error);
    return { error: 'Failed to get item' };
  }
};

/**
 * Update an item by ID
 * @param {string} id - Item ID
 * @param {Object} data - Updated data
 * @returns {Object} - Status response
 */
const update = async (id, data) => {
  try {
    // Check if credentials exist in localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please log in.' };
    }
    
    // Decrement credits
    if (user.credits <= 0) {
      return { error: 'Insufficient credits. Please recharge your credits.' };
    }
    
    // Update credits
    user.credits--;
    localStorage.setItem('user', JSON.stringify(user));
    
    // Update item
    const items = getAllItems();
    if (!items[id]) {
      return { error: 'Item not found' };
    }
    
    items[id] = { ...items[id], ...data, updatedAt: new Date().toISOString() };
    saveAllItems(items);
    
    return { status: "updated successfully" };
  } catch (error) {
    console.error('Update operation failed:', error);
    return { error: 'Failed to update item' };
  }
};

/**
 * Delete an item by ID
 * @param {string} id - Item ID
 * @returns {Object} - Status response
 */
const delete_ = async (id) => {
  try {
    // Check if credentials exist in localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please log in.' };
    }
    
    // Decrement credits
    if (user.credits <= 0) {
      return { error: 'Insufficient credits. Please recharge your credits.' };
    }
    
    // Update credits
    user.credits--;
    localStorage.setItem('user', JSON.stringify(user));
    
    // Delete item
    const items = getAllItems();
    if (!items[id]) {
      return { error: 'Item not found' };
    }
    
    delete items[id];
    saveAllItems(items);
    
    return { status: "deleted successfully" };
  } catch (error) {
    console.error('Delete operation failed:', error);
    return { error: 'Failed to delete item' };
  }
};

// Export methods
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    create,
    get,
    update,
    delete: delete_
  };
}

// If using in browser directly
if (typeof window !== 'undefined') {
  window.Crublibrary = {
    create,
    get,
    update,
    delete: delete_
  };
} 