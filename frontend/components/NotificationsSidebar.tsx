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
}

const NotificationsSidebar: React.FC<NotificationsSidebarProps> = ({
  notifications,
  serverUrl,
}) => {
  console.log(notifications);

  return (
    <div
      className={`absolute bottom-[90px] right-[-100px] bg-white  shadow-2xl max-h-[800px] overflow-y-auto text-black rounded-lg  p-4 w-[400px]`}
    >
      <h4 className="font-bold text-lg mb-2">Notifications</h4>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notif, index) => (
            <li
              key={index}
              className={`flex items-center gap-2 py-3 border-t ${
                notif.isRead === false ? "bg-green-200" : ""
              } rounded-lg m-2 p-2  `}
            >
              <div className="rounded-full w-[50px] mr-3 h-[50px] relative">
                <Image
                  src={
                    notif.senderUserId?.avatar
                      ? `${serverUrl}/assets/userAvatars/${notif.senderUserId.avatar}`
                      : "/default-avatar.png"
                  }
                  alt="Sender Avatar"
                  width={2000}
                  height={2000}
                  className="rounded-full w-[50px] h-[50px]"
                />

                {notif.action === "like" && (
                  <FaHeart className=" absolute text-[red] bottom-[-3px] right-[-3px] text-xl" />
                )}

                {notif.action === "comment" && (
                  <Image
                    src={"/comment-icon.png"}
                    alt=" comment avatar"
                    width={2000}
                    height={2000}
                    className=" absolute  bottom-[-3px] right-[-3px] w-[20px] h-[20px]"
                  />
                )}

                {notif.action === "follow" && (
                  <Image
                    src={"/follow-person-icon-free-png.webp"}
                    alt=" comment avatar"
                    width={2000}
                    height={2000}
                    className=" absolute bottom-[-20px] right-[-20px] w-[50px] h-[50px]"
                  />
                )}
              </div>

              <div>
                {notif.action === "like" && (
                  <div className=" text-sm ">
                    <Link
                      href={`user/${notif?.senderUserId?._id}`}
                      className=" text-blue-700 font-medium underline"
                    >
                      {notif.senderUserId?.fullName}
                    </Link>{" "}
                    liked 💖💖 one of{" "}
                    <Link
                      href={`/post/${notif.postId}`}
                      className="text-blue-700 font-medium underline"
                    >
                      your posts
                    </Link>
                  </div>
                )}

                {notif.action === "comment" && (
                  <div>
                    <Link
                      href={`user/${notif?.senderUserId?._id}`}
                      className="text-blue-700 font-medium underline"
                    >
                      {notif.senderUserId?.fullName}
                    </Link>{" "}
                    commented on one of{" "}
                    <Link
                      href={`/post/${notif.postId}`}
                      className="text-blue-700 font-medium underline"
                    >
                      your posts
                    </Link>
                  </div>
                )}

                {notif.action === "follow" && (
                  <div>
                    <Link
                      href={`user/${notif?.senderUserId?._id}`}
                      className="text-blue-700 font-medium underline"
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
        <p className="text-center text-gray-500">No notifications</p>
      )}
    </div>
  );
};

export default NotificationsSidebar;
