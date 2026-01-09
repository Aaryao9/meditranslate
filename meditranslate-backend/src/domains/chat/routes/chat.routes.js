// src/domains/chat/routes/chat.routes.js
import express from 'express';
import { ChatController } from '../controllers/chat.controller.js';
import { authenticate } from '../../../shared/middleware/auth.middleware.js';
import { validate } from '../../../shared/middleware/validate.middleware.js';
import { createChatSchema, updateChatSchema } from '../validators/chat.validator.js';

const router = express.Router();
const chatController = new ChatController();

// All routes require authentication
router.use(authenticate);

router.post('/', validate(createChatSchema), chatController.createChat);
router.get('/', chatController.getAllChats);
router.get('/:id', chatController.getChatById);
router.patch('/:id', validate(updateChatSchema), chatController.updateChat);
router.delete('/:id', chatController.deleteChat);

export default router;
