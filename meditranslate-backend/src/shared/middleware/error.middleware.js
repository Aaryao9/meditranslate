// src/shared/middleware/error.middleware.js
import { errorResponse } from '../utils/response.util.js';
import logger from '../utils/logger.util.js';
import { 
  ValidationError, 
  NotFoundError, 
  UnauthorizedError,
  ForbiddenError,
  ConflictError 
} from '../exceptions/index.js';

export const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip
  });
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json(errorResponse('Validation failed', errors, 400));
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json(
      errorResponse(`${field} already exists`, null, 409)
    );
  }
  
  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json(errorResponse('Invalid ID format', null, 400));
  }
  
  // Custom application errors
  if (err instanceof ValidationError) {
    return res.status(400).json(errorResponse(err.message, err.errors, 400));
  }
  
  if (err instanceof UnauthorizedError) {
    return res.status(401).json(errorResponse(err.message, null, 401));
  }
  
  if (err instanceof ForbiddenError) {
    return res.status(403).json(errorResponse(err.message, null, 403));
  }
  
  if (err instanceof NotFoundError) {
    return res.status(404).json(errorResponse(err.message, null, 404));
  }
  
  if (err instanceof ConflictError) {
    return res.status(409).json(errorResponse(err.message, null, 409));
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json(errorResponse('Invalid token', null, 401));
  }
  
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json(errorResponse('Token expired', null, 401));
  }
  
  // Default server error
  res.status(500).json(
    errorResponse(
      process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : err.message,
      null,
      500
    )
  );
};

export const notFoundHandler = (req, res) => {
  res.status(404).json(
    errorResponse(`Route ${req.originalUrl} not found`, null, 404)
  );
};
