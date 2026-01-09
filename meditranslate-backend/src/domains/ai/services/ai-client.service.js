// src/domains/ai/services/ai-client.service.js
import axios from 'axios';
import { aiConfig } from '../../../config/ai.config.js';
import { AIServiceError } from '../../../shared/exceptions/index.js';
import logger from '../../../shared/utils/logger.util.js';

export class AIClientService {
  constructor() {
    this.client = axios.create({
      baseURL: aiConfig.endpoints.translate,
      timeout: aiConfig.timeout,
      headers: aiConfig.headers
    });
  }
  
  async translate(reportText, options = {}) {
    const startTime = Date.now();
    
    try {
      const payload = {
        text: reportText,
        target_language: options.targetLanguage || aiConfig.defaultParams.targetLanguage,
        simplify: options.simplify !== undefined ? options.simplify : aiConfig.defaultParams.simplify,
        max_tokens: options.maxTokens || aiConfig.defaultParams.maxTokens,
        temperature: options.temperature || aiConfig.defaultParams.temperature
      };
      
      logger.info('Sending translation request to AI service', {
        textLength: reportText.length,
        targetLanguage: payload.target_language
      });
      
      const response = await this.retryRequest(() =>
        this.client.post('', payload)
      );
      
      const processingTime = Date.now() - startTime;
      
      logger.info('Translation completed', {
        processingTime,
        statusCode: response.status
      });
      
      return {
        translatedText: response.data.translated_text,
        simplifiedText: response.data.simplified_text,
        modelVersion: response.data.model_version || 'unknown',
        processingTime
      };
      
    } catch (error) {
      logger.error('AI translation failed', {
        error: error.message,
        stack: error.stack
      });
      
      if (error.response) {
        throw new AIServiceError(
          `AI service error: ${error.response.data?.message || error.message}`
        );
      } else if (error.request) {
        throw new AIServiceError('AI service is unreachable');
      } else {
        throw new AIServiceError('Failed to process translation request');
      }
    }
  }
  
  async retryRequest(requestFn, attempts = aiConfig.retryAttempts) {
    let lastError;
    
    for (let i = 0; i < attempts; i++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;
        
        if (i < attempts - 1) {
          const delay = aiConfig.retryDelay * Math.pow(2, i); // Exponential backoff
          logger.warn(`Retry attempt ${i + 1}/${attempts} after ${delay}ms`);
          await this.sleep(delay);
        }
      }
    }
    
    throw lastError;
  }
  
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async healthCheck() {
    try {
      const response = await axios.get(aiConfig.endpoints.health, {
        timeout: 5000
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}
