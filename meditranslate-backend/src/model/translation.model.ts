// src/models/translation.model.ts
import pool from "../db/pool";
import { DbTranslation } from "../mappers/translation.mapper";

// Insert a translation
export const createTranslation = async (data: {
  chatSessionId: string;
  originalText: string;
  translatedText: string;
  simplifiedText?: string;
  disclaimer?: string;
  language?: string;
  modelVersion?: string;
  processingTimeMs?: number;
}): Promise<DbTranslation> => {
  const query = `
    INSERT INTO translations
      (chat_session_id, original_text, translated_text, simplified_text, disclaimer, language, model_version, processing_time_ms)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *
  `;

  const values = [
    data.chatSessionId,
    data.originalText,
    data.translatedText,
    data.simplifiedText || null,
    data.disclaimer || null,
    data.language || "ne",
    data.modelVersion || null,
    data.processingTimeMs || null
  ];

  const result = await pool.query<DbTranslation>(query, values);
  return result.rows[0];
};

// Get translations by chat session
export const getTranslationsByChatId = async (chatSessionId: string): Promise<DbTranslation[]> => {
  const query = `
    SELECT * FROM translations
    WHERE chat_session_id = $1
    ORDER BY created_at ASC
  `;
  const result = await pool.query<DbTranslation>(query, [chatSessionId]);
  return result.rows;
};
