// src/shared/middleware/rateLimit.middleware.js
import rateLimit from 'express-rate-limit';
import { config } from '../../config/env.config.js';
import { errorResponse } from '../utils/response.util.js';

export const generalLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: errorResponse('Too many requests, please try again later', null, 429),
  standardHeaders: true,
  legacyHeaders: false,
});

export const aiTranslationLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.aiTranslationMax,
  message: errorResponse('Too many translation requests, please try again later', null, 429),
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.userId || req.ip;
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  message: errorResponse('Too many authentication attempts, please try again later', null, 429),
  skipSuccessfulRequests: true,
});
