import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import { connectToDb } from "./config/connect";
import authRoutes from "./routes/authRoutes.routes";
import userRoutes from "./routes/userRoutes.routes";
import postRoutes from "./routes/postRoutes.routes";
import commentRoutes from "./routes/commentRoutes.routes";
import notificationRoutes from "./routes/notificationRoutes.routes";
import { app, server, io } from "./socket/soket";

// Application port from environment variables
const PORT = process.env.PORT || 5000;
// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files setup
const assetsPath = path.join(__dirname, "assets");
app.use("/assets/userAvatars", express.static(path.join(assetsPath, "userAvatars")));
app.use("/assets/ImagePosts", express.static(path.join(assetsPath, "ImagePosts")));

// Pass io to routes via app
app.set("io", io);

// Route setup
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/notification", notificationRoutes);

// Start the server
server.listen(PORT, async () => {
  console.log(`Server running on port: ${PORT} ❤ 👍`);
  connectToDb(); // Connect to the database
});
