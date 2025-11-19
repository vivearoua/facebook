import Link from "next/link";
import React from "react";
import getavatar from "@/utils/getavatar";

const Following = ({
  name,
  email,
  mainJob,
  imageSrc,
  id,
}: {
  name: string;
  email: string;
  mainJob: string;
  imageSrc: string;
  id: string;
}) => {
  return (
    <div className="group">
      <Link
        href={`/user/${id}`}
        className="flex items-center rounded-2xl
         hover:bg-slate-100"
      >
        <div className="relative flex-shrink-0 p-3">
          <img
            src={getavatar(imageSrc)}
            width={48}
            height={48}
            alt={`${name}'s profile image`}
            className="rounded-full object-cover w-12 h-12 
              transition-transform duration-200"
          />
          <div className="absolute bottom-[6px] right-[6px] w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
        </div>

        {/* User Info */}
        <div className=" flex-1 min-w-0">
          <h3 className="font-semibol text-sm">{name}</h3>
          <p className="text-xs text-gray-300 truncate ">{email}</p>
          <div className="flex items-center">
            <span className="text-xs  px-2 py-1 rounded-full font-medium backdrop-blur-sm">
              {mainJob || "Professional"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Following;
