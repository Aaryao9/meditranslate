// src/controller/translation.controller.ts
import { Request, Response } from "express";
import { addTranslation, getTranslations } from "../service/translation.service";

// POST /api/translations
export const createTranslationController = async (req: Request, res: Response) => {
  try {
    const {
      chatSessionId,
      originalText,
      translatedText,
      simplifiedText,
      disclaimer,
      language,
      modelVersion,
      processingTimeMs
    } = req.body;

    const translation = await addTranslation({
      chatSessionId,
      originalText,
      translatedText,
      simplifiedText,
      disclaimer,
      language,
      modelVersion,
      processingTimeMs
    });

    return res.status(201).json({
      message: "Translation added successfully",
      translation
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/translations/:chatSessionId
export const getTranslationsController = async (req: Request, res: Response) => {
  try {
    const chatSessionId = req.params.chatSessionId;
    if (!chatSessionId || Array.isArray(chatSessionId)) {
      return res.status(400).json({ message: "Invalid chat session ID" });
    }

    const translations = await getTranslations(chatSessionId);

    return res.status(200).json({ translations });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
