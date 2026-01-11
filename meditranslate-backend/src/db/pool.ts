// src/db/pool.ts

import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create a PostgreSQL connection pool
const pool: Pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Log when connected
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL");
});

// Optional: handle errors
pool.on("error", (err: Error) => {
  console.error("PostgreSQL pool error:", err);
});

export default pool;
