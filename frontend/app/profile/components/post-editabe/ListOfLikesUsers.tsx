// ListOfLikesUsers.tsx
import getavatar from "@/utils/getavatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface User {
  _id: string;
  fullName: string;
  email: string;
  avatar?: string;
  mainJob?: string;
}

interface ListOfLikesUsersProps {
  users: User[];
}

const ListOfLikesUsers: React.FC<ListOfLikesUsersProps> = ({ users }) => {
  if (!users || users.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-8 bottom-0 mb-2 w-64 max-h-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-10">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 dark:text-white">
          Likes ({users.length})
        </h3>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {users.map((user , index) => (
          <Link
            href={`/user/${user._id}`}
            key={index}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex-shrink-0">
              {user.avatar ? (
                <Image
                  src={getavatar(user.avatar)}
                  alt={user.fullName}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-sm font-medium">
                  {user.fullName?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                {user.fullName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.mainJob || "No job specified"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListOfLikesUsers;
