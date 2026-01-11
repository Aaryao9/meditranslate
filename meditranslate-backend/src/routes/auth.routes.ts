// src/routes/auth.routes.ts

import express, { Router } from "express";
import { register, login } from "../controller/auth.controller";
import { registerSchema } from "../dto/register.dto";
import { loginSchema } from "../dto/login.dto";
import { validate } from "../middlewares/validate";

const router: Router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 */
router.post("/register", validate(registerSchema), register);

/**
 * @route POST /api/auth/login
 * @desc Login existing user
 */
router.post("/login", validate(loginSchema), login);

export default router;
