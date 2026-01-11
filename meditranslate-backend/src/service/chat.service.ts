// src/service/chat.service.ts
import {
  createChatSession,
  getUserChatSessions
} from "../model/chat.model";

export const createChat = async (
  userId: string,
  title?: string
) => {
  return await createChatSession(
    userId,
    title || "New Chat"
  );
};

export const getChatsForUser = async (userId: string) => {
  return await getUserChatSessions(userId);
};
