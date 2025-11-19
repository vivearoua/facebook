"use client";

import React from "react";
import Image from "next/image";
import Following from "./Following";
import { useCurrentUser } from "@/context/ProfileContexts";

const SideBarLeft = () => {
  const { user } = useCurrentUser();

  return (
    <div className="w-[18%] rounded-3xl overflow-y-auto bg-white shadow-lg border border-gray-200 h-[90%]">
      {/* Profile Header with Background */}
      <div className="relative rounded-t-3xl overflow-hidden">
        <Image
          src="/beautiful-night-sky-sunset-scenery-digital-art-563@0@i.jpg"
          alt="Background image"
          width={2000}
          height={2000}
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        {/* User Info Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-lg font-bold">{user?.fullName || "User"}</h2>
          <p className="text-sm opacity-90">
            {user?.mainJob || "Professional"}
          </p>
        </div>
      </div>

      {/* Inspiration Quote */}
      <div className="p-5">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-lg">💫</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Believe in yourself, embrace challenges, and stay persistent.
              Every step forward brings you closer to your goals. Keep going,
              success is within your reach!
            </p>
          </div>
        </div>
      </div>

      <hr className="w-[90%] mx-auto border-gray-200" />

      {/* Following Section Header */}
      <div className="flex items-center justify-between mt-6 px-5">
        <div>
          <h2 className="text-lg font-bold text-gray-800">Your Following</h2>
          <p className="text-sm text-gray-500 mt-1">People you follow</p>
        </div>
        <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
          {user?.followings?.length || 0}
        </div>
      </div>

      {/* Following List */}
      <div className="mt-4 space-y-3 pb-6">
        {user?.followings && user.followings.length > 0 ? (
          user.followings.map((follower, index) => (
            <Following
              key={index}
              name={follower?.fullName}
              email={follower?.email}
              mainJob={follower?.mainJob}
              imageSrc={follower?.avatar}
              id={follower._id}
            />
          ))
        ) : (
          <div className="text-center py-8 px-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👥</span>
            </div>
            <p className="text-gray-500 text-sm">
              You're not following anyone yet
            </p>
            <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
              Discover people
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBarLeft;
