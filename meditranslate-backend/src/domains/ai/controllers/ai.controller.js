// src/domains/ai/controllers/ai.controller.js
import { TranslationService } from '../services/translation.service.js';
import { TranslateRequestDTO } from '../dto/translate.dto.js';
import { successResponse } from '../../../shared/utils/response.util.js';

export class AIController {
  constructor() {
    this.translationService = new TranslationService();
  }
  
  translate = async (req, res, next) => {
    try {
      const translateRequest = new TranslateRequestDTO(
        req.body.reportText,
        req.body.chatId,
        req.body.createNewChat,
        req.body.chatTitle
      );
      
      const result = await this.translationService.translateReport(
        req.user.userId,
        translateRequest
      );
      
      res.status(200).json(successResponse(result, 'Translation completed successfully'));
    } catch (error) {
      next(error);
    }
  };
  
  healthCheck = async (req, res, next) => {
    try {
      const isHealthy = await this.translationService.checkAIServiceHealth();
      res.status(200).json(
        successResponse(
          { healthy: isHealthy },
          isHealthy ? 'AI service is healthy' : 'AI service is unavailable'
        )
      );
    } catch (error) {
      next(error);
    }
  };
}
