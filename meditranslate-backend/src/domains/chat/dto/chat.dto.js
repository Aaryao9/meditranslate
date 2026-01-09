// src/domains/chat/dto/chat.dto.js
export class ChatSessionDTO {
  constructor(chatSession) {
    this.id = chatSession._id;
    this.userId = chatSession.userId;
    this.title = chatSession.title;
    this.status = chatSession.status;
    this.totalMessages = chatSession.totalMessages;
    this.lastMessageAt = chatSession.lastMessageAt;
    this.createdAt = chatSession.createdAt;
    this.updatedAt = chatSession.updatedAt;
  }
}

export class ChatSessionDetailDTO {
  constructor(chatSession) {
    this.id = chatSession._id;
    this.userId = chatSession.userId;
    this.title = chatSession.title;
    this.status = chatSession.status;
    this.messages = chatSession.messages.map(msg => ({
      id: msg._id,
      role: msg.role,
      content: msg.content,
      metadata: msg.metadata,
      timestamp: msg.timestamp
    }));
    this.totalMessages = chatSession.totalMessages;
    this.lastMessageAt = chatSession.lastMessageAt;
    this.createdAt = chatSession.createdAt;
    this.updatedAt = chatSession.updatedAt;
  }
}
