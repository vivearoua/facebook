"use client";
import React, { useEffect, useState } from "react";
import AddPost from "./AddPost";
import axios from "axios";
import Post from "./Post";

const Content = () => {
  const [context, setContext] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [Datas, setData] = useState<any[]>([]);

  // Load token from localStorage on initial render
  useEffect(() => {
    const tokenLocal = localStorage.getItem("accessToken");
    setToken(tokenLocal);
  }, []);

  // Fetch posts when token is available
  useEffect(() => {
    if (!token) return;

    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/post/getPost", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [token]);

  return (
    <div className="w-[60%]  overflow-y-auto overflow-x-hidden rounded-3xl h-[90%]">
      {/* Add Post Component */}
      <AddPost context={context} setContext={setContext} token={token} />

      {/* Posts List */}
      <div className="w-full pb-12 py-1 rounded-3xl bg-white/10 backdrop-blur-lg mb-4 h-fit">
        {Datas.map((data, index) => (
          <Post
            key={index}
            postId={data.post._id}
            idUser={data.post.userId._id}
            userImage={`http://localhost:5000/assets/userAvatars/${data.post.userId.avatar}`}
            username={data.post.userId.fullName}
            emailUser={data.post.userId.email}
            contextOfPost={data.post.content}
            imageOfPost={
              data.post.postImage
                ? `http://localhost:5000/assets/ImagePosts/${data.post.postImage}`
                : null
            }
            isLiked={data.isLiked}
            isSave={data.isSave}
            isFollow={data.isFollowed}
            isCurrentUser={data.isCurrentUser}
            comments={data.post.comments}
            mainJob={data.post.userId.mainJob}
            likes={data.post.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
