import axios from "axios";

const handleFollow = async (userId: string, token: string | null) => {
  try {
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    const res = await axios.patch(
      `http://localhost:5000/api/user/follow/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error: any) {
    console.error("Error while following the user:", error);
    throw new Error(
      error.response?.data?.message ||
        "Failed to follow the user. Please try again."
    );
  }
};
const handleBeginFollow = async (
  userId: string,
  token: string | null,
  setUser: (userData: any) => void,
  setIsFollow?: (isFollow: boolean) => void
) => {
  try {
    if (setIsFollow) setIsFollow(true);
    const userResData = await handleFollow(userId, token);

    if (!userResData || !userResData.newUser) {
      throw new Error("Invalid response from server");
    }

    setUser(userResData.newUser);

    console.log(userResData.newUser);
  } catch (error: any) {
    console.error("Error in handleBeginFollow:", error);
    alert(error.message || "An error occurred while following the user.");

    if (setIsFollow) setIsFollow(false);
  }
};

export default handleBeginFollow;
