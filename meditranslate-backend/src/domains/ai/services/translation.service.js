// src/domains/ai/services/translation.service.js
import { AIClientService } from './ai-client.service.js';
import { ChatService } from '../../chat/services/chat.service.js';
import { TranslateResponseDTO } from '../dto/translate.dto.js';
import { sanitizeMedicalReport } from '../../../shared/utils/sanitizer.util.js';
import { MEDICAL_DISCLAIMER } from '../../../shared/constants/medical.constants.js';
import { MESSAGE_ROLES } from '../../../shared/constants/chat.constants.js';
import { ValidationError } from '../../../shared/exceptions/index.js';
import logger from '../../../shared/utils/logger.util.js';

export class TranslationService {
  constructor() {
    this.aiClient = new AIClientService();
    this.chatService = new ChatService();
  }
  
  async translateReport(userId, translateRequest) {
    const { reportText, chatId, createNewChat, chatTitle } = translateRequest;
    
    // Sanitize input
    const sanitizedReport = sanitizeMedicalReport(reportText);
    
    logger.info('Starting translation', {
      userId,
      reportLength: sanitizedReport.length,
      chatId,
      createNewChat
    });
    
    // Call AI service
    const aiResponse = await this.aiClient.translate(sanitizedReport);
    
    // Append medical disclaimer
    const disclaimerText = MEDICAL_DISCLAIMER.ne;
    const translatedWithDisclaimer = `${aiResponse.translatedText}\n\n${disclaimerText}`;
    const simplifiedWithDisclaimer = `${aiResponse.simplifiedText}\n\n${disclaimerText}`;
    
    // Handle chat session
    let targetChatId = chatId;
    
    if (createNewChat || !chatId) {
      // Create new chat session
      const newChat = await this.chatService.createChatSession(
        userId,
        chatTitle || this.generateChatTitle(sanitizedReport)
      );
      targetChatId = newChat.id;
    }
    
    // Add messages to chat
    if (targetChatId) {
      // User message (original report)
      await this.chatService.addMessageToChat(targetChatId, userId, {
        role: MESSAGE_ROLES.USER,
        content: sanitizedReport,
        timestamp: new Date()
      });
      
      // Assistant message (translation + simplification)
      await this.chatService.addMessageToChat(targetChatId, userId, {
        role: MESSAGE_ROLES.ASSISTANT,
        content: simplifiedWithDisclaimer,
        metadata: {
          originalReport: sanitizedReport,
          translatedText: translatedWithDisclaimer,
          simplifiedText: simplifiedWithDisclaimer,
          disclaimer: disclaimerText,
          processingTime: aiResponse.processingTime
        },
        timestamp: new Date()
      });
    }
    
    logger.info('Translation completed successfully', {
      userId,
      chatId: targetChatId,
      processingTime: aiResponse.processingTime
    });
    
    return new TranslateResponseDTO(
      translatedWithDisclaimer,
      simplifiedWithDisclaimer,
      sanitizedReport,
      disclaimerText,
      targetChatId,
      {
        processingTime: aiResponse.processingTime,
        language: 'ne',
        modelVersion: aiResponse.modelVersion
      }
    );
  }
  
  generateChatTitle(reportText) {
    // Extract first 50 characters or first line as title
    const title = reportText.split('\n')[0].substring(0, 50);
    return title.length < reportText.length ? `${title}...` : title;
  }
  
  async checkAIServiceHealth() {
    return await this.aiClient.healthCheck();
  }
}
