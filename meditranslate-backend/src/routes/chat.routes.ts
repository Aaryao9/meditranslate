import express from "express";
import { validate } from "../middlewares/validate";
import { authenticate } from "../middlewares/auth";
import {
  createChatController,
  getUserChatsController
} from "../controller/chat.controller";
import { createChatSchema } from "../dto/chat.dto";

const router = express.Router();

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
