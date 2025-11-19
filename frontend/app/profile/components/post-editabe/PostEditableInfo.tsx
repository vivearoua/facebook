import getavatar from "@/utils/getavatar";
import { Divide, SquarePen, Trash2, X } from "lucide-react";
import React from "react";
import handleDeletePost from "../../api/handleDeletePost";
import { useCurrentUser } from "@/context/ProfileContexts";

interface IPostEditableInfo {
  _id: string;
  name: string | undefined;
  email: string | undefined;
  job: string | undefined;
  avatar: string | undefined;
  isEditPost: boolean;
  setIsditPost: any;
  token: string | null;
}

const PostEditableInfo = ({
  _id,
  token,
  name,
  email,
  job,
  avatar,
  setIsditPost,
  isEditPost,
}: IPostEditableInfo) => {
  const { user, setUser } = useCurrentUser();
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-center items-center gap-3 ">
        <div
          className="relative p-[3px] bg-gradient-to-r from-purple-500
       to-blue-600 rounded-full "
        >
          <img
            src={getavatar(avatar)}
            alt="profile"
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover "
          />
          <div
            className=" absolute right-1 z-10 bottom-0  w-4 h-4  border-2 border-slate-200 
         bg-green-500 rounded-full"
          ></div>
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-sm text-gray-600">{email}</div>
          <div className="text-sm font-medium text-slate-800">{job}</div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
        {isEditPost ? (
          <div
            onClick={() => setIsditPost(false)}
            className="p-2 rounded-xl bg-slate-200 text-slate-500
         cursor-pointer hover:bg-slate-300 hover:text-slate-800 duration-300"
          >
            <X size={18} />
          </div>
        ) : (
          <div
            className=" p-2 rounded-xl bg-indigo-200 text-indigo-500
         cursor-pointer hover:bg-indigo-300 hover:text-indigo-800 duration-300 "
            onClick={() => setIsditPost(true)}
          >
            <SquarePen size={18} />
          </div>
        )}
        <div
          className="p-2 rounded-xl bg-red-200 text-red-500
         cursor-pointer hover:bg-red-300 hover:text-red-800 duration-300"
          onClick={() => {
            handleDeletePost(setUser, user, _id, token);
          }}
        >
          <Trash2 size={18} />
        </div>
      </div>
    </div>
  );
};

export default PostEditableInfo;
