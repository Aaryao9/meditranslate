// src/service/auth.service.ts

import bcrypt from "bcrypt";
import { createUser, findUserByEmail } from "../model/user.model";

// Extend DbUser type to include password hash for service layer
interface DbUserWithPassword {
  id: number;
  email: string;
  full_name: string;
  role: string;
  created_at: Date;
  password_hash: string;
}

// Register a new user
export const registerUser = async (data: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const existingUser = await findUserByEmail(data.email) as DbUserWithPassword | undefined;

  if (existingUser) {
    const error: any = new Error("Email already exists");
    error.code = "23505"; // mimic PostgreSQL unique violation code
    throw error;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  return await createUser(data.email, passwordHash, data.fullName);
};

// Login an existing user
export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email) as DbUserWithPassword | undefined;

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) throw new Error("Invalid credentials");

  return user;
};
