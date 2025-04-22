import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { Sequelize } from 'sequelize';
import { UserInstance } from '../models/User';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Get models
const getUserModel = () => {
  const { User } = require('../models').default(require('../index').default.sequelize);
  return User;
};

// Google OAuth login
router.post('/google', async (req, res, next) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    
    if (!payload || !payload.email) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const User = getUserModel();

    // Find or create user
    let user = await User.findOne({ where: { email: payload.email } });

    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name || 'User',
      });
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    // Return user data with JWT token
    return res.status(200).json({
      token: jwtToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        apiKey: user.apiKey,
        credits: user.credits
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router; 