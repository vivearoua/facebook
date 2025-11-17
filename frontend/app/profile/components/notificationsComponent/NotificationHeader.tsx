import { Bell, CheckCheck } from "lucide-react";

interface NotificationHeaderProps {
  unreadCount: number;
}

export const NotificationHeader = ({ 
  unreadCount, 
}: NotificationHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Bell className="w-6 h-6 text-white" />
          </div>
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900">
              {unreadCount}
            </span>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Stay updated with your activity
          </p>
        </div>
      </div>

    </div>
  );
};