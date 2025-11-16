import { Request, Response } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";

export const createPost = async (req: Request, res: Response) => {
  try {
    const postData = req.body;
    const userId = (req as any).user.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Create a new post object
    const newPostData = {
      content: postData ? postData.content : "",
      fullName: user.fullName,
      email: user.email,
      userId,
      postImage: postData ? postData.imageName : null,
    };

    const savedPost = await new Post(newPostData).save();
    user.posts.push((savedPost as any)._id);
    await user.save();

    res.status(201).json(savedPost);
    return;
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
    return;
  }
};
