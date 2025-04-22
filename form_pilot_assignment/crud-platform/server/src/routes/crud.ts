import express from 'express';
import { authenticateAPIKey } from '../middleware/auth';

const router = express.Router();

// Get models
const getModels = () => {
  const { User, CrudItem } = require('../models').default(require('../index').default.sequelize);
  return { User, CrudItem };
};

// Middleware to check if user has enough credits
const checkCredits = async (req, res, next) => {
  try {
    const user = req.user;
    
    if (user.credits <= 0) {
      return res.status(429).json({ 
        message: 'Request limit exceeded. Please recharge credits.' 
      });
    }

    // Decrease credits
    user.credits -= 1;
    await user.save();
    
    next();
  } catch (error) {
    next(error);
  }
};

// Create a new item
router.post('/', authenticateAPIKey, checkCredits, async (req, res, next) => {
  try {
    const { value, txHash } = req.body;
    const userId = req.user.id;
    
    if (value === undefined || txHash === undefined) {
      return res.status(400).json({ message: 'Value and txHash are required' });
    }

    const { CrudItem } = getModels();

    const item = await CrudItem.create({
      userId,
      value,
      txHash,
    });

    return res.status(201).json({
      id: item.id,
      status: 'created successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Get an item by ID
router.get('/:id', authenticateAPIKey, checkCredits, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const { CrudItem } = getModels();

    const item = await CrudItem.findOne({
      where: { id, userId }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.status(200).json({
      value: item.value,
      txHash: item.txHash
    });
  } catch (error) {
    next(error);
  }
});

// Update an item by ID
router.put('/:id', authenticateAPIKey, checkCredits, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value, txHash } = req.body;
    const userId = req.user.id;
    
    const { CrudItem } = getModels();

    const item = await CrudItem.findOne({
      where: { id, userId }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Update only provided fields
    if (value !== undefined) item.value = value;
    if (txHash !== undefined) item.txHash = txHash;
    
    await item.save();

    return res.status(200).json({
      status: 'updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

// Delete an item by ID
router.delete('/:id', authenticateAPIKey, checkCredits, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const { CrudItem } = getModels();

    const item = await CrudItem.findOne({
      where: { id, userId }
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await item.destroy();

    return res.status(200).json({
      status: 'deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router; 