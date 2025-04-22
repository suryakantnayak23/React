import express from 'express';
import { authenticateJWT } from '../middleware/auth';

const router = express.Router();

// Get models
const getUserModel = () => {
  const { User } = require('../models').default(require('../index').default.sequelize);
  return User;
};

// Get current user info
router.get('/me', authenticateJWT, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const User = getUserModel();

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      apiKey: user.apiKey,
      credits: user.credits,
      apiUrl: `${req.protocol}://${req.get('host')}/api`
    });
  } catch (error) {
    next(error);
  }
});

// Get user's credit information
router.get('/credits', authenticateJWT, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const User = getUserModel();

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      credits: user.credits,
      isRecharged: user.isRecharged
    });
  } catch (error) {
    next(error);
  }
});

// Recharge user credits (simulated email process)
router.post('/recharge', authenticateJWT, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const User = getUserModel();

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isRecharged) {
      return res.status(400).json({ message: 'Credits exhausted. Cannot recharge again.' });
    }

    // Recharge credits
    user.credits += 4;
    user.isRecharged = true;
    await user.save();

    return res.status(200).json({
      message: 'Credits recharged successfully',
      credits: user.credits
    });
  } catch (error) {
    next(error);
  }
});

export default router; 