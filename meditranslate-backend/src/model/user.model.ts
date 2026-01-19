// src/models/user.model.ts

import pool from "../db/pool";
import { DbUser } from "../mappers/user.mapper"; // reuse DbUser type

/**
 * Create a new user in the database
 * @param email User email
 * @param passwordHash Hashed password
 * @param fullName User full name
 * @returns The created user (DbUser)
 */
export const createUser = async (
  email: string,
  passwordHash: string,
  fullName: string
): Promise<DbUser> => {
  const query = `
    INSERT INTO users (email, password_hash, full_name)
    VALUES ($1, $2, $3)
    RETURNING id, email, full_name, role, created_at
  `;
  const values = [email, passwordHash, fullName];
  const result = await pool.query<DbUser>(query, values);
  return result.rows[0];
};

/**
 * Find a user by email
 * @param email User email
 * @returns The found user or undefined
 */
export const findUserByEmail = async (email: string) => {
  const query = `SELECT * FROM users WHERE email = $1`; 
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

