export interface User {
  id: string;
  email: string;
  preferredLanguage: string;
  voicePreference: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text';
  uploadedAt: string;
  preview?: string;
}

export interface OCRResult {
  fileId: string;
  extractedText: string;
  confidence: number;
  lowConfidenceAreas: LowConfidenceArea[];
}

export interface LowConfidenceArea {
  id: string;
  text: string;
  confidence: number;
  position: number;
}

export interface TranslationResult {
  jobId: string;
  originalText: string;
  translatedText: string;
  simplifiedText: string;
  language: 'nepali' | 'english';
  audioUrl?: string;
}

export interface HistoryItem {
  id: string;
  filename: string;
  uploadDate: string;
  status: 'completed' | 'processing' | 'failed';
  language: string;
}

export interface MockApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
