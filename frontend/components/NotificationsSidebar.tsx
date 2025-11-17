
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

interface Notification {
  senderUserId?: {
    avatar?: string;
    fullName?: string;
    _id?: string;
  };
  action: string;
  postId?: string;
  isRead: boolean;
}

interface NotificationsSidebarProps {
  notifications: Notification[];
  serverUrl: string;
  onClose: () => void;
}

const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({
  notifications,
  serverUrl,
  onClose,
}) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white 
           shadow-2xl overflow-y-auto text-black
            p-4 w-[400px] z-50 transform transition-transform duration-300 ease-out
            animate-slide-in-right`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-lg">Notifications</h4>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Notifications List */}
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notif, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 py-3 border-b ${
                  notif.isRead === false ? "bg-green-50" : ""
                } rounded-lg px-2 hover:bg-gray-50 transition-colors duration-200`}
              >
                <div className="rounded-full w-[50px] mr-3 h-[50px] relative flex-shrink-0">
                  <Image
                    src={
                      notif.senderUserId?.avatar
                        ? `${serverUrl}/assets/userAvatars/${notif.senderUserId.avatar}`
                        : "/default-avatar.png"
                    }
                    alt="Sender Avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />

                  {notif.action === "like" && (
                    <FaHeart className="absolute text-[red] bottom-[-3px] right-[-3px] text-xl bg-white rounded-full p-1" />
                  )}

                  {notif.action === "comment" && (
                    <Image
                      src={"/comment-icon.png"}
                      alt="comment icon"
                      width={20}
                      height={20}
                      className="absolute bottom-[-3px] right-[-3px] w-[20px] h-[20px] bg-white rounded-full p-1"
                    />
                  )}

                  {notif.action === "follow" && (
                    <Image
                      src={"/follow-person-icon-free-png.webp"}
                      alt="follow icon"
                      width={30}
                      height={30}
                      className="absolute bottom-[-10px] right-[-10px] w-[30px] h-[30px] bg-white rounded-full p-1"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {notif.action === "like" && (
                    <div className="text-sm">
                      <Link
                        href={`/user/${notif?.senderUserId?._id}`}
                        className="text-blue-700 font-medium hover:underline"
                      >
                        {notif.senderUserId?.fullName}
                      </Link>{" "}
                      liked 💖 one of{" "}
                      <Link
                        href={`/post/${notif.postId}`}
                        className="text-blue-700 font-medium hover:underline"
                      >
                        your posts
                      </Link>
                    </div>
                  )}

                  {notif.action === "comment" && (
                    <div className="text-sm">
                      <Link
                        href={`/user/${notif?.senderUserId?._id}`}
                        className="text-blue-700 font-medium hover:underline"
                      >
                        {notif.senderUserId?.fullName}
                      </Link>{" "}
                      commented on one of{" "}
                      <Link
                        href={`/post/${notif.postId}`}
                        className="text-blue-700 font-medium hover:underline"
                      >
                        your posts
                      </Link>
                    </div>
                  )}

                  {notif.action === "follow" && (
                    <div className="text-sm">
                      <Link
                        href={`/user/${notif?.senderUserId?._id}`}
                        className="text-blue-700 font-medium hover:underline"
                      >
                        {notif.senderUserId?.fullName}
                      </Link>{" "}
                      is following you now
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-center text-gray-500">No notifications</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default NotificationsSidebar;