import { Router } from "express";
import { ocrController } from "../controller/ocr.controller";
import { upload } from "../middlewares/upload";

const router = Router();


router.post(
  "/translate",
  upload.single("image"),
  ocrController
);

export default router;
