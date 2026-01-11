// src/mappers/chat.mapper.ts

export interface DbChatSession {
  id: string;
  user_id: string;
  title: string;
  status: string;
  total_messages: number;
  last_message_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseChatSession {
  id: string;
  title: string;
  status: string;
  totalMessages: number;
  lastMessageAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const mapChatToResponse = (
  chat: DbChatSession
): ResponseChatSession => ({
  id: chat.id,
  title: chat.title,
  status: chat.status,
  totalMessages: chat.total_messages,
  lastMessageAt: chat.last_message_at,
  createdAt: chat.created_at,
  updatedAt: chat.updated_at
});
