// src/shared/middleware/auth.middleware.js
import { verifyToken } from '../utils/jwt.util.js';
import { errorResponse } from '../utils/response.util.js';
import { UnauthorizedError } from '../exceptions/index.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('No token provided');
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };
    
    next();
  } catch (error) {
    res.status(401).json(errorResponse(error.message, null, 401));
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyToken(token);
      req.user = {
        userId: decoded.userId,
        email: decoded.email
      };
    }
    
    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};
