import { useCurrentUser } from "@/context/ProfileContexts";
import getavatar from "@/utils/getavatar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Users, UserCheck, UserPlus } from "lucide-react";
import handleBeginFollow from "@/api/handleFollow";
import handleBeginUnFollow from "@/api/handleUnFollow";

const FollowShow = ({
  type,
  follows,
}: {
  type: "followers" | "followings";
  follows?: any;
}) => {
  const { user, setUser } = useCurrentUser();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);
  }, []);

  let arrayofFollows =
    type === "followers" ? user?.followers : user?.followings;

  if (follows) {
    arrayofFollows = follows;
  }

  const isFollowing = (userId: string) => {
    return user?.followings?.some((follow: any) => follow._id === userId);
  };

  const isCurrentUser = (userId: string) => {
    return user?._id === userId;
  };

  if (!arrayofFollows || (arrayofFollows as any).length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Users className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {type === "followers" ? "No Followers Yet" : "Not Following Anyone"}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {type === "followers"
              ? "When someone follows you, they'll appear here."
              : "Start following people to see them in your list."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3 mb-2">
          {type === "followers" ? (
            <Users className="w-6 h-6 text-blue-500" />
          ) : (
            <UserCheck className="w-6 h-6 text-green-500" />
          )}
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {type === "followers" ? "Followers" : "Following"}
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {arrayofFollows.length} {type === "followers" ? "people" : "accounts"}
        </p>
      </div>

      <div className="space-y-3">
        {arrayofFollows?.map((follow: any, index: number) => (
          <div
            key={index}
            className="group w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:border-gray-200 dark:hover:border-gray-600"
          >
            <Link
              href={`/user/${follow._id}`}
              className="flex items-center gap-4 flex-1 min-w-0"
            >
              <div className="relative p-[2px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                <Image
                  src={getavatar(follow.avatar)}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-800"
                  alt={follow.fullName}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 dark:text-white text-base truncate">
                  {follow.fullName}
                  {isCurrentUser(follow._id) && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full">
                      You
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                  {follow.mainJob || "No profession specified"}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs truncate mt-1">
                  {follow.email}
                </p>
              </div>
            </Link>

            <div className="flex-shrink-0 ml-4">
              {/* For Followers List */}
              {type === "followers" && (
                <>
                  {isCurrentUser(follow._id) ? (
                    // Current user - show disabled button
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 rounded-full text-sm font-medium cursor-not-allowed flex items-center gap-2 border border-gray-200 dark:border-gray-600"
                    >
                      <UserCheck className="w-4 h-4" />
                      Yourself
                    </button>
                  ) : isFollowing(follow._id) ? (
                    // Following - show unfollow button
                    <button
                      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-red-200"
                      onClick={() => {
                        handleBeginUnFollow(follow._id, token, setUser);
                      }}
                    >
                      <UserCheck className="w-4 h-4" />
                      Following
                    </button>
                  ) : (
                    // Not following - show follow back button
                    <button
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white shadow-sm hover:shadow-md rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2"
                      onClick={() => {
                        handleBeginFollow(follow._id, token, setUser);
                      }}
                    >
                      <UserPlus className="w-4 h-4" />
                      Follow Back
                    </button>
                  )}
                </>
              )}

              {/* For Followings List */}
              {type === "followings" && (
                <>
                  {isCurrentUser(follow._id) ? (
                    // Current user - show disabled button
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 rounded-full text-sm font-medium cursor-not-allowed flex items-center gap-2 border border-gray-200 dark:border-gray-600"
                    >
                      <UserCheck className="w-4 h-4" />
                      Yourself
                    </button>
                  ) : (
                    // Other users - show following button
                    <button 
                      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 border border-red-200"
                      onClick={() => {
                        handleBeginUnFollow(follow._id, token, setUser);
                      }}
                    >
                      <UserCheck className="w-4 h-4" />
                      Following
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowShow;