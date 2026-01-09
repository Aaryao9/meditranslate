// src/domains/ai/validators/ai.validator.js
import Joi from 'joi';
import { config } from '../../../config/env.config.js';

export const translateSchema = Joi.object({
  reportText: Joi.string()
    .min(config.validation.minReportLength)
    .max(config.validation.maxReportLength)
    .required()
    .messages({
      'string.min': `Report must be at least ${config.validation.minReportLength} characters`,
      'string.max': `Report cannot exceed ${config.validation.maxReportLength} characters`,
      'any.required': 'Report text is required'
    }),
  
  chatId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Invalid chat ID format'
    }),
  
  createNewChat: Joi.boolean()
    .optional()
    .default(false),
  
  chatTitle: Joi.string()
    .max(200)
    .optional()
});
