import axios from "axios";

// Function to handle the follow action for a user
const handleFollow = async (userId: string, token: string | null) => {
  try {
    // Validate token before making the request
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Send a PATCH request to the server to follow the user
    const res = await axios.patch(
      `http://localhost:5000/api/user/follow/${userId}`,
      {}, // No body is needed
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
    console.error("Error while following the user:", error);
    throw new Error(
      error.response?.data?.message ||
        "Failed to follow the user. Please try again."
    );
  }
};

// Function to initiate the follow action
const handleBeginFollow = async (
  userId: string,
  token: string | null,
  setUser: (userData: any) => void,
  setIsFollow: (isFollow: boolean) => void
) => {
  try {
    // Set follow state optimistically
    setIsFollow(true);

    // Call handleFollow to get the updated user data
    const userResData = await handleFollow(userId, token);

    // Ensure the user data exists before updating state
    if (!userResData || !userResData.newUser) {
      throw new Error("Invalid response from server");
    }

    // Update state with the new user data
    setUser(userResData.newUser);

    console.log(userResData.newUser);
  } catch (error: any) {
    // Handle errors and display a proper message
    console.error("Error in handleBeginFollow:", error);
    alert(error.message || "An error occurred while following the user.");

    // Revert the optimistic follow state if an error occurs
    setIsFollow(false);
  }
};

export default handleBeginFollow;
