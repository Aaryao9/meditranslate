// src/controller/ocr.controller.ts
import { Request, Response } from "express";
import Tesseract from "tesseract.js";
import { createOcrResult } from "../model/ocr.model";
import { createTranslation } from "../model/translation.model";
import { spawn } from "child_process";
import path from "path";

/**
 * Node-only OCR + Hugging Face translation
 * - Extracts text from image
 * - Filters meaningless lines
 * - Translates text via Python child process (Hugging Face model)
 * - Saves OCR + Translation in DB
 */
export const ocrController = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const startTime = Date.now();

    // 1️⃣ OCR extraction
    const ocrResult = await Tesseract.recognize(req.file.path, "eng", {
      logger: (m) => console.log(m),
    });

    const extractedText = ocrResult.data.text
      .split("\n")
      .map((line) => line.trim())
      .filter(
        (line) =>
          line.length > 3 &&
          /[a-zA-Z]/.test(line) &&
          !/^\W+$/.test(line)
      )
      .join(" ");

    const processingTimeMs = Date.now() - startTime;

    // 2️⃣ Save raw OCR in DB
    const savedOcr = await createOcrResult({
      chatSessionId: req.body.chatSessionId,
      extractedText,
      processingTimeMs,
    });

    // 3️⃣ Translate using Python child process (Hugging Face model)
    const scriptPath = path.join(__dirname, "../model/meditranslate_model/translate.py");
    const pyProcess = spawn("python", [scriptPath]);

    let output = "";
    let errorOutput = "";

    pyProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    pyProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pyProcess.on("close", async (code) => {
      if (code !== 0) {
        console.error("Python error:", errorOutput);
        return res.status(500).json({ message: "Translation failed", error: errorOutput });
      }

      let translatedText = "";
      try {
        const result = JSON.parse(output);
        translatedText = result.translation;
      } catch (err) {
        console.error("Error parsing translation:", err);
        return res.status(500).json({ message: "Failed to parse translation", error: err });
      }

      // 4️⃣ Save translation in DB
      const savedTranslation = await createTranslation({
        chatSessionId: savedOcr.chatSessionId ?? undefined,
        originalText: extractedText,
        translatedText,
        language: "ne",
        modelVersion: "rujengelal/my_awesome_english_to_nepali_tst",
        processingTimeMs,
      });

      // 5️⃣ Return response
      return res.status(200).json({
        message: "OCR extracted and translated successfully",
        ocrId: savedOcr.id,
        extractedText,
        translation: savedTranslation,
      });
    });

    // 6️⃣ Send OCR text to Python via stdin
    pyProcess.stdin.write(JSON.stringify({ text: extractedText }));
    pyProcess.stdin.end();

  } catch (error: any) {
    console.error("OCR failed:", error);
    return res.status(500).json({
      message: "OCR extraction or translation failed",
      error: error.message,
    });
  }
};
