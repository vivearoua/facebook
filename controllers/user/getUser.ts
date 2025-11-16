import { Request, Response } from "express";
import User from "../../models/user.model";

const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const currentUserId = (req as any).user?.id; // Extracting current user ID from request

  // Validate the userId
  if (!userId) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const populateOptions = [
      { path: "followers", select: "fullName avatar _id mainJob email" },
      { path: "followings", select: "fullName avatar _id mainJob email" },
      {
        path: "posts",
        populate: {
          path: "comments",
          populate : {
            path : "userId" , 
            select :"fullName avatar mainJob email _id"
          }
        },
      },
    ];

    const user = await User.findById(userId)
      .select("-password -notifications")
      .populate(populateOptions);
      
      
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // Check if the current user is following the user
    const isFollow = user.followers.some(
      (follower: any) => follower._id.toString() === currentUserId
    );

    console.log(isFollow);

    // Format posts with additional details
    const formattedPosts = user.posts.map((post: any) => {
      const isLiked =
        Array.isArray(post.likes) && post.likes.includes(currentUserId);
      // Placeholder for saved posts logic (add logic for saved posts if needed)
      const isSaved = false; // Adjust this logic based on your implementation

      return { ...post.toObject(), isLiked, isSaved };
    });

    res.status(200).json({
      message: "User fetched successfully",
      user: {
        ...user.toObject(),
        isFollow,
        posts: formattedPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user", error: error });
  }
};

export default getUser;
