"use client";
import React from "react";
import Following from "./Following";
import { useCurrentUser } from "@/context/ProfileContexts";
import { User } from "lucide-react";

const SideBarRight = () => {
  const { user } = useCurrentUser();

  return (
    <div className="relative w-[18%] h-[90%] space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl p-6 overflow-y-auto h-[48%] border border-white/10 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold ">Your Followers</h2>
          </div>
          <div className="bg-white/20 rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold backdrop-blur-sm">
            {user?.followers?.length || 0}
          </div>
        </div>


        <div className="space-y-3">
          {user?.followers && user.followers.length > 0 ? (
            user.followers.map((follower, index) => (
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
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <span className="text-2xl "><User /></span>
              </div>
              <p className="text-gray-300 text-sm mb-2">No followers yet</p>
              <button className=" text-xs font-medium  transition-colors">
                Share your profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarRight;
