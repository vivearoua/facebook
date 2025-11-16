import { url } from "@/utils/getavatar";
import axios from "axios";

const handleSaveFullName = async (
  setIsEditFullName: any,
  user: any,
  token: string | null
) => {
  try {
    setIsEditFullName(false);
    const response = await axios.patch(
      `${url}/api/user/editFullName`,
      { fullName: user?.fullName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  } catch (error) {
    console.error("Error updating full name:", error);
    alert("An error occurred while updating full name.");
  }
};

export default handleSaveFullName;
