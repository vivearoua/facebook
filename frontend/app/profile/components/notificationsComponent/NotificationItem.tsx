import { EyeOff } from "lucide-react";
import Image from "next/image";
import getavatar from "@/utils/getavatar";
import { INotification } from "./types";
import {
  getNotificationIcon,
  getNotificationMessage,
  getTimeAgo,
} from "./notificationUtils";

interface NotificationItemProps {
  notification: INotification;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  return (
    <div
      className={`p-6 transition-all duration-300 group hover:bg-white/50  ${
        notification.isRead
          ? "bg-white/50 "
          : "bg-gradient-to-r from-blue-50 to-purple-50   border-l-4 border-l-blue-500"
      }`}
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 relative">
          <div className="relative">
            <div
              className="w-16 h-16"
            >
              <Image
                src={getavatar(notification.senderUserId.avatar)}
                width={64}
                height={64}
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                alt={notification.senderUserId.fullName}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-gray-800 dark:text-white text-base font-medium leading-relaxed">
            {getNotificationMessage(notification)}
          </p>
        </div>
        <div className="rounded-full p-1.5 ">
          {getNotificationIcon(notification.action)}
        </div>
      </div>
    </div>
  );
};
