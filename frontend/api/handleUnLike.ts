import axios from "axios";

// Function to handle the unlike action for a post
const handleUnLike = async (postId: string, token: string | null) => {
  try {
    // Validate token before making the request
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Send a PATCH request to the server to unlike the post
    const res = await axios.patch(
      `http://localhost:5000/api/post/unLikedPost/${postId}`, // URL changed to unLikedPost
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure proper token formatting
        },
      }
    );

    // Return the server's response data
    return res.data;
  } catch (error: any) {
    // Log and throw the error message
    console.error("Error while unliking the post:", error);
    throw new Error(error.response?.data?.message || "Failed to unlike post. Please try again.");
  }
};

// Function to initiate the unlike action
const handleBeginUnLike = async (
  postId: string,
  token: string | null,
  setLikes: (likesData: any) => void,
  setIsLiked: (isLiked: boolean) => void
) => {
  setIsLiked(false);
  try {
    // Call handleUnLike to get the updated post data
    const postResData = await handleUnLike(postId, token);
    // Ensure the post data exists before updating state
    if (!postResData || !postResData.post) {
      throw new Error("Invalid response from server");
    }

    // Update state with the new likes and like status
    setLikes(postResData.post.likes);
     // Set as false because the post is now unliked
  } catch (error: any) {
    // Handle errors and display a proper message
    console.error("Error in handleBeginUnLike:", error);
    alert(error.message || "An error occurred while unliking the post.");
  }
};

export default handleBeginUnLike;
