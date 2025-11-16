import { Request, Response } from "express";
import User from "../../models/user.model";

const addAvatar = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;

  try {
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID not provided" });
      return;
    }

    const user = await User.findById(userId);
    if (!user){
      res.status(404).json({ message: "User not found" });
      return;
    }
    const filePath = req.file?.path;
    if (!filePath) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    const fileName = filePath.split("\\")[5]

    user.avatar = fileName;
    await user.save();
    res.status(200).json({ message: "Avatar added successfully", user  });
  } catch (error) {
    console.error("Error adding avatar:", error);
    res
      .status(500)
      .json({ message: "An error occurred while adding avatar", error });
  }
};

export default addAvatar;
