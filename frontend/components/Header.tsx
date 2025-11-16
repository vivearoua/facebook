"use client";
import React, { useEffect, useState } from "react";
import { House, MessageCircleMore, Users, Bell, Menu } from "lucide-react";
import { useCurrentUser } from "@/context/ProfileContexts";
import axios from "axios";
import { NavLink } from "./NavLink";
import NotificationsSidebar from "./NotificationsSidebar";
import { getSocket } from "@/utils/socket";

const navs = [
  {
    name: "Home",
    path: "/",
    icon: House,
  },
  {
    name: "Communities",
    path: "/communities",
    icon: Users,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: MessageCircleMore,
  },
  {
    name: "Menu",
    action: "toggle-sidebar",
    icon: Menu,
  },
];
const Header = () => {
  const { user, loading, setSideBarIsOpen, sideBarIsOpen } = useCurrentUser();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState("/");

  // Fetch token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
    // Set active nav based on current path
    setActiveNav(window.location.pathname);
  }, []);

  // Fetch notifications and handle real-time updates
  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notification/getNotifications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Setup WebSocket connection for real-time notifications
    const socket = getSocket();
    socket.on("newNotification", (populateNotifi) => {
      console.log(populateNotifi);
      setNotifications((prev) => [populateNotifi, ...prev]);
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [token]);

  // Toggle notifications sidebar and mark unread notifications as read
  const toggleNotifications = async () => {
    setShowNotifications((prev) => !prev);

    const unreadNotifications = notifications.filter((notif) => !notif.isRead);

    if (unreadNotifications.length > 0) {
      try {
        await axios.patch(
          "http://localhost:5000/api/notification/updateStatueNotification",
          unreadNotifications,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (error) {
        console.error("Error updating notification status:", error);
      }
    }
  };

  // Handle nav click
  const handleNavClick = (path: string) => {
    setActiveNav(path);
  };

  // Count unread notifications
  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  // Return skeleton UI while loading user data
  if (loading) {
    return (
      <div className="z-10 fixed left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-lg h-16 rounded-2xl bottom-6 px-6 flex items-center justify-between shadow-lg border border-gray-200 animate-pulse">
        <div className="flex gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="w-10 h-10 bg-gray-200 rounded-full"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Generate profile image URL
  const serverUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const profileImage = user?.avatar
    ? `${serverUrl}/assets/userAvatars/${user.avatar}`
    : "/default-avatar.png";

  return (
    <>
      <div
        className="z-10 w-fit gap-8 p-1 fixed left-1/2 transform -translate-x-1/2
       bg-[#E6EEFA]  rounded-full px-6 bottom-6 flex items-center justify-around shadow-xl border border-gray-200/60"
      >
        {navs.map((nav, index) => (
          <NavLink
            key={index}
            name={nav.name}
            path={nav.path ?? ""}
            icon={nav.icon}
            isActive={activeNav === nav.path}
            onClick={() => {
              if (nav.action === "toggle-sidebar") {
                setSideBarIsOpen(!sideBarIsOpen);
              } else if (nav.path) {
                handleNavClick(nav.path);
                window.location.href = nav.path;
              }
            }}
          />
        ))}

        <button
          onClick={toggleNotifications}
          className="relative p-3 rounded-full transition-all duration-300 group cursor-pointer"
        >
          <div
            className={`
            p-2 rounded-full transition-all duration-300
            ${
              showNotifications
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-500"
            }
          `}
          >
            <Bell className="w-5 h-5" />
          </div>

          {/* Notification Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}

          {/* Tooltip */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 bg-slate-800 text-white rounded-full px-3 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md whitespace-nowrap">
            Notifications
          </div>
        </button>
      </div>

      {showNotifications && (
        <NotificationsSidebar
          notifications={notifications}
          serverUrl={serverUrl}
          onClose={() => setShowNotifications(false)}
        />
      )}
    </>
  );
};

export default Header;
