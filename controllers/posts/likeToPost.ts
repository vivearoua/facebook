import { Request, Response } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";
import Notification from "../../models/notification.model";
import { Server } from "socket.io";
import { getReceiverSocketId } from "../../socket/soket";

export const likeToPost = async (req: Request, res: Response, io: Server) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "Post already liked" });
    }

    const userCreatorPost = await User.findById(post.userId);
    if (!userCreatorPost) {
      return res.status(404).json({ error: "Post creator not found" });
    }

    post.likes.push(userId);
    userCreatorPost.numberOfLikes = (userCreatorPost.numberOfLikes || 0) + 1;

    const newNotification = new Notification({
      action: "like",
      postId: post._id,
      senderUserId: userId,
    });

    await newNotification.save();

    const populatedNotification = await newNotification.populate(
      "senderUserId",
      "fullName avatar _id"
    );

    userCreatorPost.notifications.push((newNotification as any)._id);

    await Promise.all([post.save(), userCreatorPost.save()]);

    const receiverSocketId = getReceiverSocketId((userCreatorPost as any)._id);

    console.log(receiverSocketId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newNotification", populatedNotification);
    }

    res.status(200).json({ message: "Post liked successfully", post });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
};
