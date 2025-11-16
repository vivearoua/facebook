import { Request, Response } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";
import Comment from "../../models/commenst.model";
import Notification from "../../models/notification.model";
import { getReceiverSocketId } from "../../socket/soket";
import { Server } from "socket.io";

export const addComment = async (req: Request, res: Response , io : Server) => {
  try {
    const { content, postId } = req.body;
    const userId = (req as any).user?.id;

    if (!userId || !postId || !content) {
      res.status(400).json({
        error: "User ID, Post ID, and content are required",
      });
      return;
    }

    const [user, post] = await Promise.all([
      User.findById(userId).select("fullName avatar email _id mainJob"),
      Post.findById(postId),
    ]);

    const userCreatorPost = await User.findById(post?.userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    if (!userCreatorPost) {
      res.status(404).json({ error: "Post creator not found" });
      return;
    }

    const newComment = new Comment({
      content,
      userId,
    });

    await newComment.save();

    post.comments.push(newComment._id as any);
    await post.save();

    const populatedComment = await newComment.populate(
      "userId",
      "fullName avatar email _id mainJob"
    );

    const newNotification = new Notification({
      action: "comment",
      postId: post._id,
      senderUserId: user?._id,
    });

    
    const populatedNotification = await newNotification.populate(
      "senderUserId",
      "fullName avatar _id"
    );

    await newNotification.save();

    userCreatorPost.notifications.push((newNotification as any)._id);

    await userCreatorPost.save();

    const receiverSocketId = getReceiverSocketId((userCreatorPost as any)._id);

    console.log(receiverSocketId);
    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newNotification", populatedNotification);
    }



    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });
    return;
  } catch (error) {
    console.error("Error adding comment:", error);

    res.status(500).json({
      error: "Failed to add comment",
      details: error instanceof Error ? error.message : error,
    });
    return;
  }
};
