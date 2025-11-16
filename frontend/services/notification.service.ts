import axios from "axios";

const API_URL = "http://localhost:5000/api/notifications";
const token = localStorage.getItem("accessToken");

export const createNotification = async (userId: string, message: string) => {
  const response = await axios.post(`${API_URL}/create`, { userId, message });
  return response.data;
};

export const getNotifications = async (userId: string) => {
  const response = await axios.get(`${API_URL}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await axios.put(`${API_URL}/read/${id}`);
  return response.data;
};
