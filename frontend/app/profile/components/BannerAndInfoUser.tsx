"use client";
import { useCurrentUser } from "@/context/ProfileContexts";
import getbanner from "@/utils/getbanner";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import UserInfoEdit from "./UserInfoEdit";

const BannerAndInfoUser = () => {
  const { user } = useCurrentUser();
  return (
    <div className="w-full relative h-[260px] bg-black rounded-b-3xl">
      <div
        className=" absolute right-5 top-5 p-3 rounded-full bg-slate-200
         hover:bg-slate-300 cursor-pointer "
      >
        <ImageUp />
      </div>
      <Image
        src={getbanner((user as any)?.banner)}
        className=" w-full object-cover h-full rounded-b-3xl "
        alt="banner"
        width={3000}
        height={3000}
      />
      <div
        className=" absolute w-full h-full rounded-b-3xl bg-gradient-to-t
       from-black to-transparent inset-0  "
      ></div>
      <UserInfoEdit
        name={user?.fullName}
        avatar={user?.avatar}
        email={user?.email}
        job={user?.mainJob}
      />
    </div>
  );
};

export default BannerAndInfoUser;
