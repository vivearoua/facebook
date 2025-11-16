import { Request, Response } from "express";
import Post from "../../models/post.model";
import User from "../../models/user.model";

export const getPost = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const user = await User.findById(userId).select("savedPost followings");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const savedPostIds = Array.isArray(user.savedPost) ? user.savedPost : [];
    const followingIds = Array.isArray(user.followings)
      ? user.followings.map((id: any) => id.toString())
      : [];

    const posts = await Post.find()
      .populate("userId", "avatar fullName email mainJob")
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          select: "avatar fullName email mainJob",
        },
      })
      .lean();

    const formattedData = posts.map((post) => {
      const isLiked =
        Array.isArray(post.likes) &&
        post.likes.some((like: any) => like.toString() === userId);

      const isSaved = savedPostIds.some(
        (savedPostId: any) =>
          savedPostId.toString() === (post as any)._id.toString()
      );

      const isFollowed = followingIds.includes(
        (post.userId as any)._id.toString()
      );

      const isCurrentUser = (post.userId as any)._id.toString() === userId;

      return { post, isLiked, isSaved, isFollowed, isCurrentUser };
    });

    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch posts. Please try again later." });
  }
};
