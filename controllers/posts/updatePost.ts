import { Request, Response } from "express";
import Post from "../../models/post.model";

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPost) {
       res.status(404).json({ error: "Post not found" });
       return
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};
