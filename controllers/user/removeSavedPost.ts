import { Request, Response } from "express";
import User from "../../models/user.model";

const removeSavedPost = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  const { postId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return;
    }

    user.savedPost = user.savedPost.filter((id) => id.toString() !== postId);
    await user.save();

    res.status(200).json({ message: "Post removed from saved successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove saved post", error });
  }
};

export default removeSavedPost;
