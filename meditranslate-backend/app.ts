// src/app.ts

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes"; // ✅ no .ts extension
import chatRoutes from "./src/routes/chat.routes"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
