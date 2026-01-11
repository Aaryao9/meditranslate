// src/dto/chatMessage.dto.ts
import Joi from "joi";

// Create a new message
export const createMessageSchema = Joi.object({
  content: Joi.string().min(1).required().messages({
    "string.min": "Message cannot be empty",
    "any.required": "Content is required"
  }),
  role: Joi.string().valid("user", "assistant").required().messages({
    "any.only": "Role must be either 'user' or 'assistant'",
    "any.required": "Role is required"
  })
});
