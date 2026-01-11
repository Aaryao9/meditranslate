// src/controller/chatMessage.controller.ts
import { Request, Response } from "express";
import { sendMessage, getMessages } from "../service/chatMessage.service";

// POST /api/chats/:id/messages
export const createMessageController = async (req: Request, res: Response) => {
  try {
    const chatSessionId = req.params.id;

    // Runtime check for safety
    if (!chatSessionId || Array.isArray(chatSessionId)) {
      return res.status(400).json({ message: "Invalid chat session ID" });
    }

    const { role, content, metadata } = req.body;

    const message = await sendMessage(chatSessionId, role, content, metadata);

    return res.status(201).json({
      message: "Message sent successfully",
      chatMessage: message
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/chats/:id/messages
export const getMessagesController = async (req: Request, res: Response) => {
  try {
    const chatSessionId = req.params.id;

    if (!chatSessionId || Array.isArray(chatSessionId)) {
      return res.status(400).json({ message: "Invalid chat session ID" });
    }

    const messages = await getMessages(chatSessionId);

    return res.status(200).json({ messages });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
