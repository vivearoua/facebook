import { INotification } from "./types";
import { NotificationItem } from "./NotificationItem";
import { Bell } from "lucide-react";

interface NotificationListProps {
  notifications: INotification[];
  onMarkAsRead: (id: string) => void;
}

export const NotificationList = ({
  notifications,
  onMarkAsRead,
}: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="text-center py-16 px-8">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl flex items-center justify-center">
          <Bell className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          No Notifications Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-sm mx-auto leading-relaxed">
          When you receive notifications, they will appear here. Stay active to
          get updates!
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100/50 dark:divide-gray-700/50">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};
