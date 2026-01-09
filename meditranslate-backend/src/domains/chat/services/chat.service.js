// src/domains/chat/services/chat.service.js
import { ChatRepository } from '../repositories/chat.repository.js';
import { ChatSessionDTO, ChatSessionDetailDTO } from '../dto/chat.dto.js';
import { paginationMeta } from '../../../shared/utils/response.util.js';
import { config } from '../../../config/env.config.js';
import { ValidationError } from '../../../shared/exceptions/index.js';

export class ChatService {
  constructor() {
    this.chatRepository = new ChatRepository();
  }
  
  async createChatSession(userId, title) {
    // Check if user has reached max chat sessions
    const count = await this.chatRepository.countByUser(userId);
    if (count >= config.validation.maxChatSessions) {
      throw new ValidationError(
        `Maximum chat sessions limit (${config.validation.maxChatSessions}) reached. Please delete some old chats.`
      );
    }
    
    const chatSession = await this.chatRepository.create(userId, title);
    return new ChatSessionDetailDTO(chatSession);
  }
  
  async getChatSession(chatId, userId) {
    const chatSession = await this.chatRepository.findById(chatId, userId);
    return new ChatSessionDetailDTO(chatSession);
  }
  
  async getAllChatSessions(userId, { page = 1, limit = 20, status } = {}) {
    const { chats, total } = await this.chatRepository.findAllByUser(userId, {
      page,
      limit,
      status
    });
    
    const chatDTOs = chats.map(chat => new ChatSessionDTO(chat));
    const meta = paginationMeta(page, limit, total);
    
    return { chats: chatDTOs, meta };
  }
  
  async updateChatSession(chatId, userId, updateData) {
    const chatSession = await this.chatRepository.updateTitle(chatId, userId, updateData.title);
    return new ChatSessionDetailDTO(chatSession);
  }
  
  async deleteChatSession(chatId, userId) {
    await this.chatRepository.delete(chatId, userId);
    return { message: 'Chat session deleted successfully' };
  }
  
  async addMessageToChat(chatId, userId, message) {
    const chatSession = await this.chatRepository.addMessage(chatId, userId, message);
    return new ChatSessionDetailDTO(chatSession);
  }
}
