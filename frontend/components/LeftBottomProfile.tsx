"use client";
import { useCurrentUser } from "@/context/ProfileContexts";
import React from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  FileText,
  Users,
  UserPlus,
} from "lucide-react";

const LeftBottomProfile = () => {
  const { user, loading } = useCurrentUser();

  const stats = [
    {
      label: "Likes",
      value: user?.numberOfLikes,
      icon: Heart,
      color: "text-pink-500",
    },
    {
      label: "Comments",
      value: user?.numberOfComments || 0,
      icon: MessageCircle,
      color: "text-blue-500",
    },
    {
      label: "Followers",
      value: user?.followers?.length || 0,
      icon: Users,
      color: "text-green-500",
    },
    {
      label: "Following",
      value: user?.followings?.length || 0,
      icon: UserPlus,
      color: "text-purple-500",
    },
    {
      label: "Posts",
      value: user?.posts?.length || 0,
      icon: FileText,
      color: "text-orange-500",
    },
    {
      label: "Saved",
      value: 46,
      icon: Bookmark,
      color: "text-green-500",
    },
    {
      label: "Communities",
      value: 28,
      icon: Users,
      color: "text-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className=" bg-white rounded-2xl p-5 shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Profile Stats
        </h2>
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
              <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-5 shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Profile Stats
      </h2>
      <div className="space-y-3">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <IconComponent className={`w-5 h-5 ${stat.color}`} />
                <span className="text-gray-600">{stat.label}</span>
              </div>
              <span className="font-semibold text-gray-800">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftBottomProfile;
