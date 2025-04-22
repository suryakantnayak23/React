/**
 * FormPilot CRUD Library
 * A simple library to perform CRUD operations using localStorage in browser
 * or memory in Node.js environment
 */

// Storage for Node.js environment
let memoryStorage = {};

// Initialize storage
const initStorage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Browser environment
    if (!localStorage.getItem('formpilot_items')) {
      localStorage.setItem('formpilot_items', JSON.stringify({}));
    }
  } else {
    // Node.js environment
    if (!memoryStorage.formpilot_items) {
      memoryStorage.formpilot_items = {};
    }
  }
};

// Get all items
const getAllItems = () => {
  initStorage();
  
  if (typeof window !== 'undefined' && window.localStorage) {
    // Browser environment
    return JSON.parse(localStorage.getItem('formpilot_items') || '{}');
  } else {
    // Node.js environment
    return memoryStorage.formpilot_items || {};
  }
};

// Save all items
const saveAllItems = (items) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Browser environment
    localStorage.setItem('formpilot_items', JSON.stringify(items));
  } else {
    // Node.js environment
    memoryStorage.formpilot_items = items;
  }
};

// Get user from storage
const getUser = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Browser environment
    try {
      return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (error) {
      return {};
    }
  } else {
    // Node.js environment
    return memoryStorage.user || {
      apiKey: process.env.CRUD_API_KEY,
      credits: 100
    };
  }
};

// Save user to storage
const saveUser = (user) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    // Browser environment
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    // Node.js environment
    memoryStorage.user = user;
  }
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
    // Check if credentials exist
    const user = getUser();
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please provide valid API credentials.' };
    }
    
    // Decrement credits
    if (user.credits <= 0) {
      return { error: 'Insufficient credits. Please recharge your credits.' };
    }
    
    // Update credits
    user.credits--;
    saveUser(user);
    
    // Create a new item
    const items = getAllItems();
    const id = generateId();
    items[id] = { 
      ...data, 
      id, 
      createdAt: new Date().toISOString() 
    };
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
    // Check if credentials exist
    const user = getUser();
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please provide valid API credentials.' };
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
    // Check if credentials exist
    const user = getUser();
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please provide valid API credentials.' };
    }
    
    // Decrement credits
    if (user.credits <= 0) {
      return { error: 'Insufficient credits. Please recharge your credits.' };
    }
    
    // Update credits
    user.credits--;
    saveUser(user);
    
    // Update item
    const items = getAllItems();
    if (!items[id]) {
      return { error: 'Item not found' };
    }
    
    items[id] = { 
      ...items[id], 
      ...data, 
      updatedAt: new Date().toISOString() 
    };
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
    // Check if credentials exist
    const user = getUser();
    if (!user.apiKey) {
      return { error: 'Not authenticated. Please provide valid API credentials.' };
    }
    
    // Decrement credits
    if (user.credits <= 0) {
      return { error: 'Insufficient credits. Please recharge your credits.' };
    }
    
    // Update credits
    user.credits--;
    saveUser(user);
    
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

// Module exports
module.exports = {
  create,
  get,
  update,
  delete: delete_
};

// If using in browser directly
if (typeof window !== 'undefined') {
  window.Crublibrary = {
    create,
    get,
    update,
    delete: delete_
  };
} 