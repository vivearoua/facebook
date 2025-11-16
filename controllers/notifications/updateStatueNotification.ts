import { Request, Response } from "express";
import Notification from "../../models/notification.model";

const updateStatueNotification = async (req: Request, res: Response) => {
  try {
    const unreadNotifications: { _id: string }[] = req.body;

    if (
      !Array.isArray(unreadNotifications) ||
      unreadNotifications.some((notif) => typeof notif._id !== "string")
    ) {
      res.status(400).json({
        error:
          "Notification IDs must be an array of objects containing _id as a string.",
      });
      return;
    }

    const notificationIds = unreadNotifications.map((notif) => notif._id);

    const result = await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { isRead: true }
    );

    if (result.matchedCount === 0) {
      res.status(404).json({
        error: "No notifications found to update",
      });
      return;
    }

    res.status(200).json({
      message: "Notifications updated successfully",
      updatedCount: result.modifiedCount,
    });
  } catch (error: any) {
    console.error("Error updating notification statuses:", error.message);

    if (error.name === "CastError") {
      res.status(400).json({
        error: "Invalid notification IDs format.",
      });
      return;
    }

    res.status(500).json({
      error: "An error occurred while updating the notifications",
    });
  }
};

export default updateStatueNotification;
