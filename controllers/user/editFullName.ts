import { Request, Response } from "express";
import User from "../../models/user.model";

const editFullName = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { fullName } = req.body;


  try {
    if (!fullName) {
      res.status(400).json({ message: "Full name is required" });
      return;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { fullName },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Full name updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update full name", error });
  }
};

export default editFullName;
