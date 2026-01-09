// src/config/ai.config.js
import { config } from './env.config.js';

export const aiConfig = {
  endpoints: {
    translate: `${config.ai.serviceUrl}/api/v1/translate`,
    health: `${config.ai.serviceUrl}/health`
  },
  
  defaultParams: {
    targetLanguage: 'ne',
    simplify: true,
    maxTokens: 2048,
    temperature: 0.3
  },
  
  timeout: config.ai.timeout,
  retryAttempts: config.ai.retryAttempts,
  retryDelay: config.ai.retryDelay,
  
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.AI_API_KEY || ''
  }
};
