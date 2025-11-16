"use client";
import FollowLink from "@/components/FollowLink";
// import Header from "@/components/Header";
import InfoUserGet from "@/components/InfoUserGet";
import InfoUserGetNumberLikesComments from "@/components/InfoUserGetNumberLikesComments";
import Post from "@/components/Post";
import axios from "axios";
// import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  params: { id: string }; // Define params structure
}

interface UserType {
  _id: string;
  fullName: string;
  email: string;
  bio: string;
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

  useEffect(() => {
    // Retrieve token from localStorage
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  // Handle the Promise params using React.use()
  const { id } = React.use(params); // Unwrap params using React.use()

  useEffect(() => {
    if (!token || !id) return; // Ensure token and params.id exist

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
        setUser(res.data.user); // Assign user data
        setError(null); // Clear error
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
    <div className="w-full h-fit flex gap-5 justify-around p-5">
      <div
        className="fixed top-0 right-0 bottom-0 left-0 z-[-10] object-cover"
        style={{
          backgroundImage: "url('/2475176.webp')",
          backgroundAttachment: "fixed", // Make the background fixed
          backgroundSize: "cover", // Ensure the image covers the whole screen
          backgroundPosition: "center", // Center the image
        }}
      ></div>
      {/* <Header /> */}
      {/* Lift section */}
      <div className="w-[40%]">
        {/* info && numbers Section */}
        <div className="w-[100%] flex justify-around gap-4">
          <div className="w-[50%] h-full">
            {/* (infoUserGet) => ({fullName , Avatar , email , mainJob , skills })*/}
            <InfoUserGet
              fullName={user?.fullName}
              avatar={user?.avatar}
              email={user?.email}
              mainJob={user?.mainJob}
              skills={user?.Skills}
            />
          </div>

          <div className="w-[50%] h-full ">
            {/* (InfoUserGetNumberLikesComments) => ({numberLikes , numberComments , numberPosts , numberCommunities  })*/}
            <InfoUserGetNumberLikesComments
              numberLikes={user?.numberOfLikes}
              numberComments={user?.numberOfcomments}
              numberPosts={user?.posts.length}
              numberCommunities={5}
            />
          </div>
        </div>

        {/* Bio Section */}
        <div
          className="w-full mt-3 p-6 text-white bg-white/10 rounded-2xl 
        min-h-[200px] max-h-[300] overflow-y-auto backdrop-blur-3xl "
        >
          <h1 className=" ml-6 font-medium mb-3  text-xl">About Me</h1>
          <p className=" whitespace-pre-line">{user?.bio}</p>
        </div>

        <div className="w-full gap-2 flex justify-around mt-3">
          {/* Following Section */}
          <div
            className="w-[50%] overflow-y-auto max-h-[500px] overflow-y-auto
           p-2  bg-white/10 rounded-2xl backdrop-blur-3xl "
          >
            <h1 className=" text-gray-300 text-xl font-medium pl-4 pt-5">
              Following : {user?.followings.length}
            </h1>
            {user?.followings.map((following, index) => (
              <FollowLink
                key={index}
                fullName={following.fullName}
                avatar={following.avatar}
                mainJob={following.mainJob}
                email={following.email}
                _id={following._id}
              />
            ))}
          </div>

          {/* Followers Section */}
          <div className="w-[50%] overflow-y-auto max-h-[500px] p-2 bg-white/10 backdrop-blur-3xl  rounded-2xl ">
            <h1 className=" text-gray-300 text-xl font-medium pl-4 pt-5">
              Following : {user?.followers.length}
            </h1>

            {user?.followers.map((follower, index) => (
              <FollowLink
                key={index}
                fullName={follower.fullName}
                avatar={follower.avatar}
                mainJob={follower.mainJob}
                email={follower.email}
                _id={follower._id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Posts Section*/}
      <div className="w-[60%] h-[85%] ">
        <div className="w-full bg-white/10 max-h-[1500px] overflow-y-auto p-4 rounded-2xl backdrop-blur-3xl h-fit">
          {user?.posts.map((post, index) => (
            <Post
              key={index}
              postId={post._id}
              idUser={user._id}
              userImage={`http://localhost:5000/assets/userAvatars/${user.avatar}`}
              username={user.fullName}
              emailUser={user.email}
              contextOfPost={post.content || ""}
              imageOfPost={
                post.postImage
                  ? `http://localhost:5000/assets/ImagePosts/${post.postImage}`
                  : null
              }
              isLiked={post.isLiked}
              isSave={post.isSaved}
              isFollow={user.isFollow}
              isCurrentUser={false}
              comments={(post as any).comments}
              mainJob={user.mainJob}
              likes={post.likes || []}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
