"use client";
import { useCurrentUser } from "@/context/ProfileContexts";
import { Users, Heart } from "lucide-react";
import React from "react";

const FollowerAndIng = () => {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 shadow-sm border">
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((item) => (
            <div key={item} className="text-center">
              <div className="h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="flex justify-center -space-x-2">
                {[1, 2, 3].map((avatar) => (
                  <div key={avatar} className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border">
      <div className="grid grid-cols-2 gap-6">
        {/* Following */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-600">Following</h3>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-3">{user?.followings?.length || 0}</div>
          <div className="flex justify-center -space-x-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full border-2 border-white"></div>
            ))}
          </div>
        </div>

        {/* Followers */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-red-500" />
            <h3 className="text-sm font-medium text-gray-600">Followers</h3>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-3">{user?.followers?.length || 0}</div>
          <div className="flex justify-center -space-x-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-full border-2 border-white"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowerAndIng;