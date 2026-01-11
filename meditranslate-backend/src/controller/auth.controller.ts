// src/controller/auth.controller.ts

import { Request, Response } from "express";
import { registerUser, loginUser } from "../service/auth.service";
import { mapUserToResponse } from "../mappers/user.mapper";

// Register User
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName } = req.body;

    const user = await registerUser({ email, password, fullName });
    const responseUser = mapUserToResponse(user);

    return res.status(201).json({
      message: "User registered successfully",
      user: responseUser
    });
  } catch (error: any) {
    // Duplicate email error in PostgreSQL
    if (error.code === "23505") {
      return res.status(400).json({ message: "Email already exists ❌" });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error ❌" });
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);
    const responseUser = mapUserToResponse(user);

    return res.status(200).json({
      message: "Login successful",
      user: responseUser
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Invalid credentials ❌"
    });
  }
};
