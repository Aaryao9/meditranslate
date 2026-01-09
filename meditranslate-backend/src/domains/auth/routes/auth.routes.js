// src/domains/auth/routes/auth.routes.js
import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { authenticate } from '../../../shared/middleware/auth.middleware.js';
import { authLimiter } from '../../../shared/middleware/rateLimit.middleware.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/logout', authenticate, authController.logout);

export default router;
