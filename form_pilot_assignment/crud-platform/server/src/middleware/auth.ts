import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

// Get models
const getUserModel = () => {
  const { User } = require('../models').default(require('../index').default.sequelize);
  return User;
};

// JWT Authentication middleware
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header required' });
    }

    const token = authHeader.split(' ')[1];

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    const User = getUserModel();
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    next(error);
  }
};

// API Key Authentication middleware
export const authenticateAPIKey = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'API Key required' });
    }

    const apiKey = authHeader.split(' ')[1];
    
    const User = getUserModel();
    const user = await User.findOne({ where: { apiKey } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid API Key' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}; 