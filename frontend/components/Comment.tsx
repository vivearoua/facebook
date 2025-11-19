import React from "react";
import Link from "next/link";
import getavatar from "@/utils/getavatar";

export interface CommentProps {
  userId: string;
  fullName: string;
  mainJob: string;
  email: string;
  avatar: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({
  userId,
  fullName,
  mainJob,
  email,
  avatar,
  content,
}) => {
  return (
    <div className="w-[90%] bg-white p-4 rounded-md shadow-2xl mb-4 mx-auto">
      <Link href={`/user/${userId}`} className="m-3 p-2 flex items-center">
        <img
          src={getavatar(avatar)}
          width={40}
          height={40}
          alt={`${fullName}'s Profile`}
          className="rounded-full object-cover w-[40px] h-[40px]"
        />
        <div className="text-sm font-semibold ml-3">
          {fullName}
          <div className="text-slate-900 font-normal">{email}</div>
          <div className="text-slate-900 font-medium">{mainJob}</div>
        </div>
      </Link>
      <div className="w-full mx-3 pb-4">{content}</div>
    </div>
  );
};

export default Comment;
