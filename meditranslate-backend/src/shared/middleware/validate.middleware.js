// src/shared/middleware/validate.middleware.js
import { errorResponse } from '../utils/response.util.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json(errorResponse('Validation failed', errors, 400));
    }
    
    req.body = value;
    next();
  };
};
