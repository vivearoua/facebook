import { useCurrentUser } from "@/context/ProfileContexts";
import React, { useEffect, useState } from "react";
import getNotifications from "../api/getNotifications";
import {
  NotificationHeader,
  NotificationList,
  NotificationLoading,
  NotificationError,
  INotification,
} from "./notificationsComponent";

const NotificationSection = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("Authentication required");
          return;
        }
        await getNotifications(token, setNotifications);
      } catch (err) {
        setError("Failed to load notifications");
        console.error("Error fetching notifications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif._id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading) {
    return <NotificationLoading />;
  }

  if (error) {
    return <NotificationError error={error} onRetry={handleRetry} />;
  }

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <div className="min-h-screen w-3/4 py-8 mx-auto">
      <div className=" mx-auto">
        <NotificationHeader
          unreadCount={unreadCount}

        />
        <div className=" overflow-hidden">
          <NotificationList
            notifications={notifications}
            onMarkAsRead={markAsRead}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
