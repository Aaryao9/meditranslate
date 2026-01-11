// src/middlewares/validate.ts

import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";

/**
 * Middleware to validate request body against a Joi schema
 * @param schema Joi.ObjectSchema - schema to validate against
 */
export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    next();
  };
};
