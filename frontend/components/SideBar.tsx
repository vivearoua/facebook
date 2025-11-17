"use client";
import { useCurrentUser } from "@/context/ProfileContexts";
import getavatar from "@/utils/getavatar";
import {
  LogOut,
  Settings,
  User,
  Home,
  MessageSquare,
  Bell,
  Search,
  CircleX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideBar = () => {
  const { user, loading, sideBarIsOpen, setSideBarIsOpen } = useCurrentUser();

  const menuItems = [
    { icon: Home, label: "Home", href: "/", color: "text-blue-600" },
    { icon: Search, label: "Search", href: "/search", color: "text-green-600" },
    {
      icon: MessageSquare,
      label: "Messages",
      href: "/messages",
      color: "text-purple-600",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/",
      color: "text-yellow-600",
    },
    {
      icon: User,
      label: "Profile",
      href: "/profile",
      color: "text-indigo-600",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/",
      color: "text-gray-600",
    },
  ];

  if (loading) {
    return (
      <div
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-50 to-indigo-100 border-r border-gray-200 transition-all duration-300 ${
          sideBarIsOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-center space-y-6 p-4">
          <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="space-y-3 w-full">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="w-full h-10 bg-gray-300 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-white to-blue-50/30
               border-r border-gray-200/60 backdrop-blur-sm transition-all duration-300 
               ${
                 sideBarIsOpen
                   ? "w-64 opacity-100"
                   : "w-0 opacity-0 overflow-hidden"
               } z-50 shadow-xl`}
    >
      <div className="p-6 border-b border-gray-200/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AF</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AppName
            </h1>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setSideBarIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <CircleX />
          </button>
        </div>
      </div>

      <div className="p-6 border-b border-gray-200/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="p-[2px] bg-gradient-to-r from-purple-500 to-blue-600 rounded-full">
              <div className="w-12 h-12 rounded-full bg-white p-0.5">
                <Image
                  src={getavatar(user?.avatar)}
                  alt={user?.fullName || "Profile"}
                  width={48}
                  height={48}
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 border-2 border-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate">
              {user?.fullName || "User"}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={() => setSideBarIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                      hover:bg-white hover:shadow-md hover:border hover:border-gray-100"
          >
            <div
              className={`p-2 rounded-lg bg-gray-50 group-hover:bg-blue-50 
                          transition-colors duration-200 ${item.color}`}
            >
              <item.icon size={20} />
            </div>
            <span
              className="font-medium text-gray-700 group-hover:text-blue-600 
                         transition-colors duration-200"
            >
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 right-0 px-4">
        <button
          className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 
                    bg-red-50 hover:bg-red-100 hover:shadow-md w-full group"
        >
          <div className="p-2 rounded-lg bg-white group-hover:bg-red-200 transition-colors duration-200">
            <LogOut size={20} className="text-red-600" />
          </div>
          <span className="font-medium text-red-600">Logout</span>
        </button>
      </div>

      <div className="absolute top-1/4 -left-2 w-1 h-32 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-full" />
      <div className="absolute bottom-1/4 -left-2 w-1 h-20 bg-gradient-to-b from-purple-400 to-pink-500 rounded-r-full opacity-60" />
    </div>
  );
};

export default SideBar;
