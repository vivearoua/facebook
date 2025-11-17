import axios from "axios";

const handleUnFollow = async (userId: string, token: string | null) => {
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const res = await axios.patch(
      `http://localhost:5000/api/user/unfollow/${userId}`, 
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    return res.data;

  } catch (error: any) {
    console.error("Error while unfollowing the user:", error);
    throw new Error(
      error.response?.data?.message || "Failed to unfollow the user. Please try again."
    );
  }
};

const handleBeginUnFollow = async (
  userId: string,
  token: string | null,
  setUser: (userData: any) => void,
  setIsFollow?: (isFollow: boolean) => void
) => {
  try {
    if(setIsFollow) setIsFollow(false);

    const userResData = await handleUnFollow(userId, token);

    if (!userResData || !userResData.newUser) {
      throw new Error("Invalid response from server.");
    }

    setUser(userResData.newUser);
    console.log(userResData.newUser);

  } catch (error: any) {
    console.error("Error in handleBeginUnFollow:", error);
    alert(error.message || "An error occurred while unfollowing the user.");

     if(setIsFollow) setIsFollow(true);
  }
};

export default handleBeginUnFollow;
