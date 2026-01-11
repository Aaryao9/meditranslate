// src/dto/translation.dto.ts
import Joi from "joi";

// Create a translation
export const createTranslationSchema = Joi.object({
  chatSessionId: Joi.string().uuid().required().messages({
    "string.uuid": "Chat session ID must be a valid UUID",
    "any.required": "Chat session ID is required"
  }),
  originalText: Joi.string().min(1).required().messages({
    "string.min": "Original text cannot be empty",
    "any.required": "Original text is required"
  }),
  translatedText: Joi.string().min(1).required().messages({
    "string.min": "Translated text cannot be empty",
    "any.required": "Translated text is required"
  }),
  simplifiedText: Joi.string().allow("").optional(),
  disclaimer: Joi.string().allow("").optional(),
  language: Joi.string().default("ne").messages({
    "string.base": "Language must be a string"
  }),
  modelVersion: Joi.string().optional(),
  processingTimeMs: Joi.number().optional()
});
