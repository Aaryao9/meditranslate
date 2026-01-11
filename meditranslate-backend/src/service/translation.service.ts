// src/service/translation.service.ts
import { createTranslation, getTranslationsByChatId } from "../model/translation.model";
import { mapTranslationToResponse, ResponseTranslation } from "../mappers/translation.mapper";

export const addTranslation = async (data: {
  chatSessionId: string;
  originalText: string;
  translatedText: string;
  simplifiedText?: string;
  disclaimer?: string;
  language?: string;
  modelVersion?: string;
  processingTimeMs?: number;
}): Promise<ResponseTranslation> => {
  const translation = await createTranslation(data);
  return mapTranslationToResponse(translation);
};

export const getTranslations = async (chatSessionId: string): Promise<ResponseTranslation[]> => {
  const translations = await getTranslationsByChatId(chatSessionId);
  return translations.map(mapTranslationToResponse);
};
