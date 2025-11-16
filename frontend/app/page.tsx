import React from "react";
import Image from "next/image";
import SideBarLeft from "@/components/SideBarLeft";
import Content from "@/components/Content";
import SideBarRight from "@/components/SideBarRight";

const Page = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden flex pt-5 justify-around">
      <SideBarLeft />
      <Content />
      <SideBarRight />
    </div>
  );
};
export default Page;
