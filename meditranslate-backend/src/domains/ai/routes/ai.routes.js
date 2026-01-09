// src/domains/ai/routes/ai.routes.js
import express from 'express';
import { AIController } from '../controllers/ai.controller.js';
import { authenticate } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { aiTranslationLimiter } from '../../../shared/middleware/rateLimit.middleware.js';
import { translateSchema } from '../validators/ai.validator.js';

const router = express.Router();
const aiController = new AIController();

router.post(
  '/translate',
  authenticate,
  aiTranslationLimiter,
  validate(translateSchema),
  aiController.translate
);

router.get('/health', aiController.healthCheck);

export default router;
