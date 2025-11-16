import axios from "axios";

// Function to handle the like action for a post
const handleLike = async (postId: string, token: string | null) => {
  try {
    // Validate token before making the request
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Send a PATCH request to the server to like the post
    const res = await axios.patch(
      `http://localhost:5000/api/post/likeToPost/${postId}`,
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
    console.error("Error while liking the post:", error);
    throw new Error(error.response?.data?.message || "Failed to like post. Please try again.");
  }
};

// Function to initiate the like action
const handleBeginLike = async (
  postId: string,
  token: string | null,
  setLikes: (likesData: any) => void,
  setIsLiked: (isLiked: boolean) => void
) => {
  setIsLiked(true);
  try {
    // Call handleLike to get the updated post data
    const postResData = await handleLike(postId, token);


    // Ensure the post data exists before updating state
    if (!postResData || !postResData.post) {
      throw new Error("Invalid response from server");
    }

    // Update state with the new likes and like status
    setLikes(postResData.post.likes);
     // Assuming the post is liked, adjust this logic based on actual response
  } catch (error: any) {
    // Handle errors and display a proper message
    console.error("Error in handleBeginLike:", error);
    alert(error.message || "An error occurred while liking the post.");
  }
};

export default handleBeginLike;
