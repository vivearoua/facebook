import { url } from "@/utils/getavatar";
import axios from "axios";

const handleSaveMainJob = async (
  setIsEditMainJob: any,
  user: any,
  token: string | null
) => {
  try {
    setIsEditMainJob(false);
    const response = await axios.patch(
      `${url}/api/user/editMainJob`,
      { mainJob: user?.mainJob },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Error updating main job:", error);
    alert("An error occurred while updating main job.");
  }
};

export default handleSaveMainJob;
