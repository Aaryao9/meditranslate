import express from "express";
import { validate } from "../middlewares/validate";
import { authenticate } from "../middlewares/auth";
import { 
  createTranslationController, 
  getTranslationsController, 
  translateOcrController,
  translatePythonController   // ← matches your controller function name
} from "../controller/translation.controller";
import { createTranslationSchema } from "../dto/translation.dto";

const router = express.Router();

// 1️⃣ Create a manual translation (DB-only)
router.post("/", authenticate, validate(createTranslationSchema), createTranslationController);

// 2️⃣ Translate OCR result stored in DB
router.post("/ocr-translate", authenticate, translateOcrController);

// 3️⃣ Get all translations by chat session
router.get("/:chatSessionId", authenticate, getTranslationsController);

// 4️⃣ EN → NE translation using Python LoRA model
router.post("/lora-translate", translatePythonController);

export default router;
