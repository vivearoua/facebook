import getbanner from "@/utils/getbanner";
import Image from "next/image";
import React from "react";
import UserIDInfoEdit from "./UserIDInfoEdit";

interface IBanner {
  name: string | undefined;
  email: string | undefined;
  job?: string | undefined;
  avatar: string | undefined;
  banner: string | undefined;
}

const BannerAndInfoIdUser = ({ name, email, job, avatar, banner }: IBanner) => {
  return (
    <div className="w-full relative h-[260px] bg-black rounded-b-3xl">
      <Image
        src={getbanner(banner)}
        className=" w-full object-cover h-full rounded-b-3xl "
        alt="banner"
        width={3000}
        height={3000}
      />
      <div
        className=" absolute w-full h-full rounded-b-3xl bg-gradient-to-t
       from-black to-transparent inset-0  "
      ></div>
      <UserIDInfoEdit name={name} avatar={avatar} email={email} job={job} />
    </div>
  );
};

export default BannerAndInfoIdUser;
