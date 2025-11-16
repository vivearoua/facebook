import getavatar from "@/utils/getavatar";
import { FolderUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import InfoEditing from "./InfoEditing";
import handleImageUpload from "../api/handleImageUpload";
import { useCurrentUser } from "@/context/ProfileContexts";

interface IUserInfo {
  name: string | undefined;
  email: string | undefined;
  job: string | undefined;
  avatar: string | undefined;
}
const UserInfoEdit = ({ name, email, job, avatar }: IUserInfo) => {
  const { setUser } = useCurrentUser();
  const [isUploading, setIsUploading] = useState(false);
  const [token, setToken] = useState<string | null>();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);

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
        <div
          className=" group rounded-full w-full h-full absolute bg-black 
        opacity-0 hover:opacity-40 duration-300 inset-0 flex justify-center items-center  "
        >
          <label
            htmlFor="UploadAvatar"
            className=" bg-slate-200 p-2 rounded-full cursor-pointer"
          >
            <FolderUp className=" text-sm" size={18} />
            <input
              type="file"
              id="UploadAvatar"
              className=" hidden"
              accept="image/*"
              onChange={(e) => {
                handleImageUpload(e, setIsUploading, token, setUser);
              }}
            />
          </label>
        </div>
      </div>
      <InfoEditing name={name} job={job} email={email} />
    </div>
  );
};

export default UserInfoEdit;
