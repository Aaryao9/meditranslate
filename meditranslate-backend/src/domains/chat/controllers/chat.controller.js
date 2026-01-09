// src/domains/chat/controllers/chat.controller.js
import { ChatService } from '../services/chat.service.js';
import { successResponse } from '../../../shared/utils/response.util.js';

export class ChatController {
  constructor() {
    this.chatService = new ChatService();
  }
  
  createChat = async (req, res, next) => {
    try {
      const result = await this.chatService.createChatSession(
        req.user.userId,
        req.body.title
      );
      res.status(201).json(successResponse(result, 'Chat session created'));
    } catch (error) {
      next(error);
    }
  };
  
  getAllChats = async (req, res, next) => {
    try {
      const { page, limit, status } = req.query;
      const result = await this.chatService.getAllChatSessions(req.user.userId, {
        page,
        limit,
        status
      });
      res.status(200).json(successResponse(result.chats, 'Chats retrieved', result.meta));
    } catch (error) {
      next(error);
    }
  };
  
  getChatById = async (req, res, next) => {
    try {
      const result = await this.chatService.getChatSession(
        req.params.id,
        req.user.userId
      );
      res.status(200).json(successResponse(result, 'Chat session retrieved'));
    } catch (error) {
      next(error);
    }
  };
  
  updateChat = async (req, res, next) => {
    try {
      const result = await this.chatService.updateChatSession(
        req.params.id,
        req.user.userId,
        req.body
      );
      res.status(200).json(successResponse(result, 'Chat session updated'));
    } catch (error) {
      next(error);
    }
  };
  
  deleteChat = async (req, res, next) => {
    try {
      const result = await this.chatService.deleteChatSession(
        req.params.id,
        req.user.userId
      );
      res.status(200).json(successResponse(result, 'Chat session deleted'));
    } catch (error) {
      next(error);
    }
  };
}
