// src/controller/translation.controller.ts
import { Request, Response } from "express";
import axios from "axios";
import { spawn } from "child_process";
import path from "path";
import { getOcrResultById } from "../model/ocr.model";
import { createTranslation, getTranslationsByChatId } from "../model/translation.model";

/**
 * 1️⃣ Create manual translation (DB-only)
 */
export const createTranslationController = async (req: Request, res: Response) => {
  try {
    const { chatSessionId, originalText, translatedText, simplifiedText } = req.body;

    if (!originalText || !translatedText) {
      return res.status(400).json({ message: "originalText and translatedText are required" });
    }

    const savedTranslation = await createTranslation({
      chatSessionId,
      originalText,
      translatedText,
      simplifiedText,
      language: "ne",
      modelVersion: "manual",
      processingTimeMs: 0,
    });

    return res.status(200).json({
      message: "Translation saved successfully",
      translation: savedTranslation,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Translation creation failed", error: err.message });
  }
};

export const getTranslationsController = async (req: Request, res: Response) => {
  try {
    const chatSessionIdRaw = req.params.chatSessionId;

    if (!chatSessionIdRaw) {
      return res.status(400).json({ message: "chatSessionId is required" });
    }

    // Ensure it's a string
    const chatSessionId = Array.isArray(chatSessionIdRaw) ? chatSessionIdRaw[0] : chatSessionIdRaw;

    const translations = await getTranslationsByChatId(chatSessionId);
    return res.status(200).json({ translations });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get translations", error: err.message });
  }
};


/**
 * 3️⃣ Translate OCR result stored in DB using external Python FastAPI
 */
export const translateOcrController = async (req: Request, res: Response) => {
  try {
    const { ocrId } = req.body;

    if (!ocrId) {
      return res.status(400).json({ message: "ocrId is required" });
    }

    const ocrResult = await getOcrResultById(ocrId);
    if (!ocrResult) {
      return res.status(404).json({ message: "OCR result not found" });
    }

    const startTime = Date.now();
    const pythonResponse = await axios.post(
      "http://localhost:8000/translate",
      { text: ocrResult.extractedText },
      { timeout: 60000 }
    );

    const translatedText: string = pythonResponse.data.translated_text;
    const processingTimeMs = Date.now() - startTime;

    const savedTranslation = await createTranslation({
      chatSessionId: ocrResult.chatSessionId ?? undefined,
      originalText: ocrResult.extractedText,
      translatedText,
      simplifiedText: undefined,
      disclaimer: "AI-generated medical translation. Verify with a professional.",
      language: "ne",
      modelVersion: "google/mt5-small + LoRA(medical-ne)",
      processingTimeMs,
    });

    return res.status(200).json({
      message: "Translation completed successfully",
      translation: savedTranslation,
    });
  } catch (error: any) {
    console.error("Translation error:", error?.message || error);
    return res.status(500).json({ message: "Translation failed", error: error?.message });
  }
};

/**
 * 4️⃣ EN → NE translation using local Python LoRA script
 */
export const translatePythonController = async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required" });
    }

    const scriptPath = path.join(__dirname, "../model/meditranslate_model/translate.py");

    const startTime = Date.now();
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
      const processingTimeMs = Date.now() - startTime;

      if (code !== 0) {
        console.error("Python error:", errorOutput);
        return res.status(500).json({ message: "Translation failed", error: errorOutput });
      }

      const result = JSON.parse(output);
      const translatedText: string = result.translation;

      // Save in DB
      const savedTranslation = await createTranslation({
        originalText: text,
        translatedText,
        language: "ne",
        modelVersion: "LoRA-mt5-small-v1",
        processingTimeMs,
      });

      return res.status(200).json({
        message: "Translation completed successfully",
        translation: savedTranslation,
      });
    });

    // Send input to Python via stdin
    pyProcess.stdin.write(JSON.stringify({ text }));
    pyProcess.stdin.end();

  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
