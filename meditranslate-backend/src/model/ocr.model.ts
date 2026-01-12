import pool from "../db/pool";

export interface DbOcrResult {
  id: string;
  chatSessionId: string | null;
  extractedText: string;
  language: string;
  processingTimeMs: number | null;
  createdAt: Date;
}

// Insert OCR result
export const createOcrResult = async (data: {
  chatSessionId?: string;
  extractedText: string;
  language?: string;
  processingTimeMs?: number;
}): Promise<DbOcrResult> => {
  const query = `
    INSERT INTO ocr_results
      (chat_session_id, extracted_text, language, processing_time_ms)
    VALUES ($1,$2,$3,$4)
    RETURNING *
  `;
  const values = [
    data.chatSessionId || null,
    data.extractedText,
    data.language || "en",
    data.processingTimeMs || null,
  ];
  const result = await pool.query<DbOcrResult>(query, values);
  return result.rows[0];
};

// Get OCR result by ID
export const getOcrResultById = async (id: string): Promise<DbOcrResult | null> => {
  const query = `
    SELECT * FROM ocr_results
    WHERE id = $1
  `;
  const result = await pool.query<DbOcrResult>(query, [id]);
  return result.rows[0] || null;
};
