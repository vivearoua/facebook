import getavatar from "@/utils/getavatar";
import { FolderUp } from "lucide-react";
import Image from "next/image";
import React from "react";

interface I {
  name: string | undefined;
  email: string | undefined;
  job: string | undefined;
  avatar: string | undefined;
}

const UserIDInfoEdit = ({ name, email, job, avatar }: I) => {
  return (
    <div className=" absolute bottom-[20px] left-16 flex justify-center items-center gap-2 ">
      <div
        className="relative p-[3px] bg-gradient-to-r from-purple-500
       to-blue-600 rounded-full group  "
      >
        <Image
          src={getavatar(avatar)}
          alt={name || "user"}
          width={100}
          height={100}
          className=" w-24 h-24 rounded-full object-cover "
        />
        <div
          className=" absolute right-1 z-10 bottom-0  w-6 h-6  border-2 border-slate-200 
         bg-green-500 rounded-full"
        ></div>
      </div>
      <div className="">
        <div className=" font-medium text-white">{name}</div>
        <div className=" text-sm text-slate-300">{email}</div>
        <div className="text-sm text-slate-200 font-medium">{job}</div>
      </div>
    </div>
  );
};

export default UserIDInfoEdit;
