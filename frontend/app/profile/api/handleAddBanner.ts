import { url } from "@/utils/getavatar";
import axios from "axios";

const handleAddBanner = async (
  e: React.ChangeEvent<HTMLInputElement> | any,
  setIsUploading: any,
  token: string | null | undefined,
  setUser: any
) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const formData = new FormData();
  formData.append("banner", file);
  setIsUploading(true);
  try {
    const response = await axios.patch(`${url}/api/user/add-banner`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      setUser(response.data.user);
    } else {
      alert("Failed to upload the image.");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("An error occurred while uploading the image.");
  } finally {
    setIsUploading(false);
  }
};

export default handleAddBanner;
