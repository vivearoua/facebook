"use client";
import { useCurrentUser } from "@/context/ProfileContexts";
import getbanner from "@/utils/getbanner";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserInfoEdit from "./UserInfoEdit";
import handleAddBanner from "../api/handleAddBanner";

const BannerAndInfoUser = () => {
  const { user  ,setUser} = useCurrentUser();
  const [isUploading , setIsUploading] = useState(false);
  const [token , setToken ]= useState<string | null>(null)

  useEffect(() => {
     const t = localStorage.getItem("accessToken")
     setToken(t)
  }, [])
  return (
    <div className="w-full relative h-[260px] bg-black rounded-b-3xl">
      <label
        htmlFor="addBanner"
        className="z-50 absolute right-5 top-5 p-3 rounded-full bg-slate-200
         hover:bg-slate-300 cursor-pointer "
      >
        <ImageUp />

        <input
          type="file"
          className="hidden"
          id="addBanner"
          onChange={(e) => {
            handleAddBanner(e , setIsUploading, token , setUser )
          }}
        />
      </label>
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
