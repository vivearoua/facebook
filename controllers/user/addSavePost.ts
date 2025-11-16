import { Request, Response } from "express";
import User from "../../models/user.model";

const addSavePost = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { postId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.savedPost.includes(postId)) {
      res.status(400).json({ message: "Post already saved" });
      return;
    }

    user.savedPost.push(postId);
    await user.save();

    res.status(200).json({ message: "Post saved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to save post", error });
  }
};

export default addSavePost;
