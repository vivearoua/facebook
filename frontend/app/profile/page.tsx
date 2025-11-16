"use client";
import AboutMe from "@/components/AboutMe";
import React, { useState } from "react";
import BannerAndInfoUser from "./components/BannerAndInfoUser";
import StateSection from "./components/StateSection";
import PostSection from "./components/PostSection";

const ProfilePage = () => {
  const [stateSection, setStateSection] = useState<
    "posts" | "followings" | "followers" | "saved" | "analysis"
  >("posts");

  return (
    <div className=" max-w-[75%] min-h-screen mx-auto">
      <BannerAndInfoUser />
      {/* <AboutMe/> */}
      <StateSection
        stateSection={setStateSection}
        setStateSection={setStateSection}
      />
      <PostSection/>
    </div>
  );
};

export default ProfilePage;
