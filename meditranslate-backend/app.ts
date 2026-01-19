// src/app.ts

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes"; 
import chatRoutes from "./src/routes/chat.routes";
import translationRoutes from "./src/routes/translation.routes";
import ocrRoutes from "./src/routes/ocr.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const cors = require("cors");

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/translation", translationRoutes);
app.use("/api", ocrRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
