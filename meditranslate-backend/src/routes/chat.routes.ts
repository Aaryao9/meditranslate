import express from "express";
import { validate } from "../middlewares/validate";
import { authenticate } from "../middlewares/auth";
import {
  createChatController,
  getUserChatsController
} from "../controller/chat.controller";
import { createChatSchema } from "../dto/chat.dto";
import chatMessageRoutes from "./chatMessage.routes";
const router = express.Router();

router.use("/:id/messages", chatMessageRoutes);
router.post(
  "/",
  authenticate,
  validate(createChatSchema),
  createChatController
);

router.get(
  "/",
  authenticate,
  getUserChatsController
);

export default router;
