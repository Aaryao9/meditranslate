import Joi from "joi";

export const createChatSchema = Joi.object({
  title: Joi.string().min(1).max(255).optional().messages({
    "string.min": "Title cannot be empty",
    "string.max": "Title must be under 255 characters"
  })
});
