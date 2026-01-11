// src/mappers/chatMessage.mapper.ts
export interface DbChatMessage {
  id: string;
  chat_session_id: string;
  role: string;
  content: string;
  metadata?: object;
  timestamp: Date;
}

export interface ResponseChatMessage {
  id: string;
  chatSessionId: string;
  role: string;
  content: string;
  metadata?: object;
  timestamp: Date;
}

export const mapMessageToResponse = (msg: DbChatMessage): ResponseChatMessage => ({
  id: msg.id,
  chatSessionId: msg.chat_session_id,
  role: msg.role,
  content: msg.content,
  metadata: msg.metadata,
  timestamp: msg.timestamp
});
