// src/routes/translation.routes.ts
import express from "express";
import { validate } from "../middlewares/validate";
import { createTranslationController, getTranslationsController } from "../controller/translation.controller";
import { createTranslationSchema } from "../dto/translation.dto";
import { authenticate } from "../middlewares/auth";

const router = express.Router();

// Create a new translation
router.post("/", authenticate, validate(createTranslationSchema), createTranslationController);

// Get translations by chat session
router.get("/:chatSessionId", authenticate, getTranslationsController);

export default router;
