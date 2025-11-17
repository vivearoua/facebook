import { url } from "@/utils/getavatar";
import axios from "axios";

const getNotifications = async (
  token : string | null,
  setNotifications : any,
) => {
  try {
    const response = await axios.get(
      `${url}/api/notification/getNotifications`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setNotifications(response.data.notifications || []);
  } catch (error) {
    console.error("Error fetching notifications:", error);
  }
};

export default getNotifications;
