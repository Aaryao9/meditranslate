// src/models/chatMessage.model.ts
import pool from "../db/pool";
import { DbChatMessage } from "../mappers/chatMessage.mapper";

// Add a message to chat
export const createMessage = async (
  chatSessionId: string,
  role: string,
  content: string,
  metadata?: object
): Promise<DbChatMessage> => {
  const query = `
    INSERT INTO chat_messages (chat_session_id, role, content, metadata)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [chatSessionId, role, content, metadata || null];
  const result = await pool.query<DbChatMessage>(query, values);
  return result.rows[0];
};

// Get all messages for a chat session
export const getMessagesByChatId = async (chatSessionId: string): Promise<DbChatMessage[]> => {
  const query = `
    SELECT * FROM chat_messages
    WHERE chat_session_id = $1
    ORDER BY timestamp ASC
  `;
  const result = await pool.query<DbChatMessage>(query, [chatSessionId]);
  return result.rows;
};

// Update total_messages and last_message_at in chat_sessions
export const updateChatSessionStats = async (chatSessionId: string): Promise<void> => {
  const query = `
    UPDATE chat_sessions
    SET total_messages = total_messages + 1,
        last_message_at = NOW(),
        updated_at = NOW()
    WHERE id = $1
  `;
  await pool.query(query, [chatSessionId]);
};
