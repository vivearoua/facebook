import { Server } from "socket.io";
import http from "http";
import express, { Application } from "express";
import jwt from "jsonwebtoken";

const app: Application = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// Map to store userId and corresponding socketId
const userSocketMap: Record<string, string> = {};

// Helper function to get receiver socket ID
export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};

// Socket.IO events
io.on("connection", (socket) => {
  const token = socket.handshake.query.token as string | undefined;

  // Validate token
  if (!token) {
    socket.disconnect();
    return;
  }

  try {
    // Verify token and extract userId
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default-secret-key"
    ) as { id: string };
    const userId = decoded.id;

    if (userId) {
      // Map userId to socketId
      userSocketMap[userId] = socket.id;
      console.log(`User authenticated: ${userId}`);
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }
  } catch (err) {
    console.error("Invalid token:", err);
    socket.disconnect(); // Disconnect socket if token verification fails
    return;
  }

  // Handle socket disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);

    // Find and remove userId from map
    for (const [key, value] of Object.entries(userSocketMap)) {
      if (value === socket.id) {
        delete userSocketMap[key];
        break;
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
