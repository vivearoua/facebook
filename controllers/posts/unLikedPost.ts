import { Request, Response } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";
import { Server } from "socket.io";

export const unLikedPost = async (req: Request, res: Response , io: Server ) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id; // Assuming `authMiddleware` attaches the user to the request

    // Fetch the post
    const post = await Post.findById(id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    // Check if the user has liked the post
    if (!post.likes.includes(userId)) {
      res.status(400).json({ error: "Post not liked by user" });
      return;
    }

    // Remove the user's like
    post.likes = post.likes.filter(
      (likeId) => likeId.toString() !== userId.toString()
    );

    // Update the post creator's like count
    const userCreatorPost = await User.findById(post.userId);
    if (userCreatorPost) {
      userCreatorPost.numberOfLikes = Math.max(
        (userCreatorPost.numberOfLikes || 0) - 1,
        0
      );
      await userCreatorPost.save();
    }

    // Save the updated post
    await post.save();

    res.status(200).json({ message: "Post unliked successfully", post });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ error: "Failed to unlike post" });
  }
};
