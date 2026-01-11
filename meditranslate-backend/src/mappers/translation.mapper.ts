// src/mappers/translation.mapper.ts

export interface DbTranslation {
  id: string;
  chat_session_id: string;
  original_text: string;
  translated_text: string;
  simplified_text?: string;
  disclaimer?: string;
  language: string;
  model_version?: string;
  processing_time_ms?: number;
  created_at: Date;
}

export interface ResponseTranslation {
  id: string;
  chatSessionId: string;
  originalText: string;
  translatedText: string;
  simplifiedText?: string;
  disclaimer?: string;
  language: string;
  modelVersion?: string;
  processingTimeMs?: number;
  createdAt: Date;
}

export const mapTranslationToResponse = (t: DbTranslation): ResponseTranslation => ({
  id: t.id,
  chatSessionId: t.chat_session_id,
  originalText: t.original_text,
  translatedText: t.translated_text,
  simplifiedText: t.simplified_text,
  disclaimer: t.disclaimer,
  language: t.language,
  modelVersion: t.model_version,
  processingTimeMs: t.processing_time_ms,
  createdAt: t.created_at
});
