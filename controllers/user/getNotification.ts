import { Request, Response } from "express";
import User from "../../models/user.model";

const getNotification = async (req: Request, res: Response) => {
  const userId = (req as any).user._id;

  try {
    const user = await User.findById(userId).populate("notifications");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res
      .status(200)
      .json({
        message: "Notifications fetched successfully",
        notifications: user.notifications,
      });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications", error });
  }
};

export default getNotification;
