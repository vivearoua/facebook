import { Request, Response } from "express";
import User from "../../models/user.model";

const getProfileCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = (req as any)?.user?.id;
    if (!userId) {
      res.status(400).json({ message: "User ID not provided" });
      return;
    }

    const user = await User.findById(userId)
      .populate("followers", "fullName avatar email _id mainJob")
      .populate("followings", "fullName avatar email _id mainJob")
      .populate({
        path: "posts",
        populate: [
          {
            path: "comments",
            select: " _id content",
            populate: {
              path: "userId",
              select: " _id avatar fullName email mainJob",
            },
          },
          {
            path: "likes",
            select: "_id avatar fullName email mainJob",
          },
        ],
      });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "Profile fetched successfully", user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
};

export default getProfileCurrentUser;
