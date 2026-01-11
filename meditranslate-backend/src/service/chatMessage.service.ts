// src/service/chatMessage.service.ts
import { createMessage, getMessagesByChatId, updateChatSessionStats } from "../model/chatMessage.model";
import { ResponseChatMessage, mapMessageToResponse } from "../mappers/chatMessage.mapper";

export const sendMessage = async (
  chatSessionId: string,
  role: string,
  content: string,
  metadata?: object
): Promise<ResponseChatMessage> => {
  const message = await createMessage(chatSessionId, role, content, metadata);

  // Update chat session stats
  await updateChatSessionStats(chatSessionId);

  return mapMessageToResponse(message);
};

export const getMessages = async (chatSessionId: string): Promise<ResponseChatMessage[]> => {
  const messages = await getMessagesByChatId(chatSessionId);
  return messages.map(mapMessageToResponse);
};
