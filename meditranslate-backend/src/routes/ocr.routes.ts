import { Router } from "express";
import { ocrController } from "../controller/ocr.controller";
import { upload } from "../middlewares/upload";

const router = Router();

// POST /api/ocr/extract-translate
// Upload an image (form-data key must be: "image")
// This endpoint performs OCR AND automatically translates the extracted text using LoRA
router.post(
  "/translate",
  upload.single("image"),
  ocrController
);

export default router;
