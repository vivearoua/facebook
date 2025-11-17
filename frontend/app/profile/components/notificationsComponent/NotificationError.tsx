// components/notifications/NotificationError.tsx
import { Bell } from "lucide-react";

interface NotificationErrorProps {
  error: string;
  onRetry: () => void;
}

export const NotificationError = ({ error, onRetry }: NotificationErrorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 dark:border-gray-700/50 p-12 text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-2xl flex items-center justify-center">
            <Bell className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Unable to Load Notifications
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            {error}
          </p>
          <button
            onClick={onRetry}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};