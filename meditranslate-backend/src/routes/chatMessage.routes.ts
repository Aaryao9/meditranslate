// src/routes/chatMessage.routes.ts
import express from "express";
import { validate } from "../middlewares/validate";
import { createMessageController, getMessagesController } from "../controller/chatMessage.controller";
import { createMessageSchema } from "../dto/chatMessage.dto";
import { authenticate } from "../middlewares/auth"; // your JWT auth middleware

const router = express.Router({ mergeParams: true });

// Send a message
router.post("/", authenticate, validate(createMessageSchema), createMessageController);

// Get all messages for a chat
router.get("/", authenticate, getMessagesController);

export default router;
