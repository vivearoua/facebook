import axios from "axios";

// Function to handle the unfollow action for a user
const handleUnFollow = async (userId: string, token: string | null) => {
  try {
    // Validate token before making the request
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Send a PATCH request to the server to unfollow the user
    const res = await axios.patch(
      `http://localhost:5000/api/user/unfollow/${userId}`,
      {}, // No body is needed
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      }
    );

    // Return the server's response data
    return res.data;

    console.log(res.data);
  } catch (error: any) {
    // Log and throw the error message
    console.error("Error while unfollowing the user:", error);
    throw new Error(
      error.response?.data?.message || "Failed to unfollow the user. Please try again."
    );
  }
};

// Function to initiate the unfollow action
const handleBeginUnFollow = async (
  userId: string,
  token: string | null,
  setUser: (userData: any) => void,
  setIsFollow: (isFollow: boolean) => void
) => {
  try {
    // Optimistically update the follow state to false
    setIsFollow(false);

    // Call handleUnFollow to get the updated user data
    const userResData = await handleUnFollow(userId, token);

    // Ensure the user data exists before updating state
    if (!userResData || !userResData.newUser) {
      throw new Error("Invalid response from server.");
    }

    // Update the user state with the new user data
    setUser(userResData.newUser);
    console.log(userResData.newUser);

  } catch (error: any) {
    // Handle errors and display a proper message
    console.error("Error in handleBeginUnFollow:", error);
    alert(error.message || "An error occurred while unfollowing the user.");

    // Revert the follow state if an error occurs
    setIsFollow(true);
  }
};

export default handleBeginUnFollow;
