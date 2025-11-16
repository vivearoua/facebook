import { Request, Response } from "express";
import User from "../../models/user.model";

const getNotifications = async (req: Request, res: Response) => {
  try {
    const userId = (req as any)?.user?.id;
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const user = await User.findById(userId).populate({
      path: "notifications",
      populate: {
        path: "senderUserId",
        select: "fullName avatar _id",
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ notifications: user.notifications.reverse() });
    return;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching notifications" });
    return;
  }
};

export default getNotifications;
