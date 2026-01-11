// src/models/chat.model.ts
import pool from "../db/pool";
import { DbChatSession } from "../mappers/chat.mapper";

export const createChatSession = async (
  userId: string,
  title: string
): Promise<DbChatSession> => {
  const query = `
    INSERT INTO chat_sessions (user_id, title, status)
    VALUES ($1, $2, 'active')
    RETURNING *
  `;

  const result = await pool.query<DbChatSession>(query, [
    userId,
    title
  ]);

  return result.rows[0];
};

export const getUserChatSessions = async (
  userId: string
): Promise<DbChatSession[]> => {
  const query = `
    SELECT *
    FROM chat_sessions
    WHERE user_id = $1 AND status != 'deleted'
    ORDER BY updated_at DESC
  `;

  const result = await pool.query<DbChatSession>(query, [userId]);
  return result.rows;
};
