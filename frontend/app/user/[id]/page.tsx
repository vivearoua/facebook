"use client";
import FollowLink from "@/components/FollowLink";
import InfoUserGet from "@/components/InfoUserGet";
import InfoUserGetNumberLikesComments from "@/components/InfoUserGetNumberLikesComments";
import Post from "@/components/Post";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BannerAndInfoIdUser from "./components/BannerAndInfoIdUser";
import StateSectionUserId from "./components/StateSectionUserId";
import FollowShow from "@/app/profile/components/FollowShow";
import PostSectionIdUser from "./components/PostSectionIdUser";

interface Props {
  params: { id: string };
}
export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  bio: string;
  banner: string;
  isFollow: boolean;
  avatar: string;
  followers: {
    fullName: string;
    email: string;
    _id: string;
    avatar: string;
    mainJob: string;
  }[];
  followings: {
    fullName: string;
    _id: string;
    email: string;
    avatar: string;
    mainJob: string;
  }[];
  mainJob: string;
  Skills: string[];
  posts: {
    _id: string;
    isLiked: boolean;
    isSaved: boolean;
    content?: string;
    likes?: object[];
    comments: {
      content: string;
      userId: {
        _id: string;
        fullName: string;
        email: string;
        avatar: string;
        mainJob: string;
      }[];
    }[];
    postImage?: string;
  }[];
  numberOfLikes: string;
  numberOfcomments: string;
}
const UserInfo = ({ params }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stateSection, setStateSection] = useState<
    "posts" | "followings" | "followers"
  >("posts");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);
  const { id } = React.use(params);

  useEffect(() => {
    if (!token || !id) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/getUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data.user);
        setError(null);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);
  console.log(user);

  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-3/4 mx-auto h-fit  p-5">
      <BannerAndInfoIdUser
        banner={user?.banner}
        avatar={user?.avatar}
        name={user?.fullName}
        email={user?.email}
        job={user?.mainJob}
      />
      <StateSectionUserId
        setStateSection={setStateSection}
        stateSection={stateSection}
      />

      {stateSection === "followers" && (
        <FollowShow type="followers" follows={user?.followers} />
      )}
      {stateSection === "followings" && (
        <FollowShow type="followings" follows={user?.followings} />
      )}

      {stateSection === "posts" && (
        <PostSectionIdUser user={user} />
      )}
    </div>
  );
};

export default UserInfo;
