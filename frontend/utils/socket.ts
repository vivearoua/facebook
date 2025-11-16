import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

// Assuming the token is stored in localStorage
const token = localStorage.getItem("accessToken");

export const getSocket = () => {
  if (!token) {
    console.error("No access token found");
    return null;
  }

  if (!socket) {
    socket = io("http://localhost:5000", {
      transports: ["websocket"],
      query: { token },
    });

    // Handling the notification event
    socket.on("newNotification", (data) => {
      console.log("New notification received:", data.notification);
      // Handle the notification (e.g., show it to the user)
      // You could update the UI or trigger some action
    });
  }
  return socket;
};
