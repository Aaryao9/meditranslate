// src/controller/chat.controller.ts
import { Request, Response } from "express";
import {
  createChat,
  getChatsForUser
} from "../service/chat.service";
import { mapChatToResponse } from "../mappers/chat.mapper";

export const createChatController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;
    const { title } = req.body;

    const chat = await createChat(userId, title);

    return res.status(201).json({
      message: "Chat session created",
      chat: mapChatToResponse(chat)
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to create chat session" });
  }
};

export const getUserChatsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const chats = await getChatsForUser(userId);

    return res.status(200).json({
      chats: chats.map(mapChatToResponse)
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to fetch chat sessions" });
  }
};
