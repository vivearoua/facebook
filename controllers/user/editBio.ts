import { Request, Response } from "express";
import User from "../../models/user.model";

const editBio = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { bio } = req.body;

  try {
    if (!bio) {
       res.status(400).json({ message: "Bio is required" });
       return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );

    if (!user) {
       res.status(404).json({ message: "User not found" });
       return;
    }

    res.status(200).json({ message: "Bio updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update bio", error });
  }
};

export default editBio;
