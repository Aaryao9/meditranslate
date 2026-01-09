// src/domains/chat/validators/chat.validator.js
import Joi from 'joi';

export const createChatSchema = Joi.object({
  title: Joi.string()
    .max(200)
    .optional()
});

export const updateChatSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(200)
    .required()
});
