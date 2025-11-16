import { Request, Response } from "express";
import User from "../../models/user.model";
import mongoose from "mongoose";

const unfollowUser = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const unfollowId = req.params.id;

  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
     res.status(400).json({ message: "Invalid user ID" });
     return
  }

  if (!unfollowId || !mongoose.Types.ObjectId.isValid(unfollowId)) {
     res.status(400).json({ message: "Invalid unfollow ID" });
     return
  }

  try {
    const user = await User.findById(userId)    
      .populate("followings", "fullName avatar email _id mainJob")
   


    const userToUnfollow = await User.findById(unfollowId);

    if (!user || !userToUnfollow) {
       res.status(404).json({ message: "User not found" });
       return
    }

    user.followings = user.followings.filter((following: any) =>
      following._id.toString() !== unfollowId
    );

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (followerId: mongoose.Types.ObjectId) =>
        followerId.toString() !== userId
    );

    await user.save();
    await userToUnfollow.save();

    const newUser = await User.findById(user._id)
      .populate("followings", "fullName avatar email _id mainJob")
      .populate("followers", "fullName avatar email _id mainJob")
      .lean();

    res.status(200).json({
      message: "User unfollowed successfully",
      newUser
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to unfollow user",
      error
    });
  }
};

export default unfollowUser;
