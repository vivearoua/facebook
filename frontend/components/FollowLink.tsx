import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FollowTypes {
  fullName: string | undefined;
  email: string | undefined;
  avatar: string | undefined;
  _id: string | undefined;
  mainJob: string | undefined;
}

const FollowLink: React.FC<FollowTypes> = ({
  fullName,
  email,
  avatar,
  _id,
  mainJob,
}) => {
  return (
 
      <Link href={`/user/${_id}`} className="m-3 p-2 flex items-center">

        <Image
          src={`http://localhost:5000/assets/userAvatars/${avatar}`}
          width={50}
          height={50}
          alt={`${name}'s profile image`}
          className="rounded-full object-cover w-[50px] h-[50px]"
        />
        <div className="text-sm text-white font-semibold ml-3">
          {fullName}
          <div className="text-slate-200 font-normal">{email}</div>
          <div className="text-slate-200 font-medium">{mainJob}</div>
        </div>
      </Link>

  );
};

export default FollowLink;
