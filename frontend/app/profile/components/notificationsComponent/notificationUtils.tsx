import { Heart, MessageCircle, UserPlus, Share, MapPin, Bell } from "lucide-react";
import { INotification } from "./types";

export const getNotificationMessage = (notification: INotification): string => {
  const senderName = notification.senderUserId.fullName;
  switch (notification.action) {
    case "like":
      return `${senderName} liked your post`;
    case "comment":
      return `${senderName} commented on your post`;
    case "follow":
      return `${senderName} started following you`;
    case "mention":
      return `${senderName} mentioned you in a post`;
    case "share":
      return `${senderName} shared your post`;
    default:
      return `${senderName} performed an action`;
  }
};

export const getNotificationIcon = (action: string) => {
  const iconClass = "w-5 h-5";
  switch (action) {
    case "like":
      return <Heart className={`${iconClass} text-red-500 fill-red-500`} />;
    case "comment":
      return <MessageCircle className={`${iconClass} text-blue-500`} />;
    case "follow":
      return <UserPlus className={`${iconClass} text-green-500`} />;
    case "mention":
      return <MapPin className={`${iconClass} text-purple-500`} />;
    case "share":
      return <Share className={`${iconClass} text-orange-500`} />;
    default:
      return <Bell className={`${iconClass} text-gray-500`} />;
  }
};

export const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};