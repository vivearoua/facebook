"use client";
import React from "react";
import Post from "./Post";
import { useCurrentUser } from "@/context/ProfileContexts";

const DataPost = () => {
  const { user } = useCurrentUser();

  if (!user) {
    return <p>Loading...</p>; // Placeholder in case user data is still loading
  }

  // Check if posts are undefined or empty
  if (!user.posts || user.posts.length === 0) {
    return (
      <p className="text-sm text-center mb-4 w-full text-gray-700">
        No posts available.
      </p>
    );
  }

  return (
    <div>
      {user.posts.map((post, index) => (
        <Post
          key={index}
          postId={post._id}
          idUser={post.userId}
          userImage={
          `http://localhost:5000/assets/userAvatars/${user.avatar}`
             
          }
          username={user.fullName|| "Unknown User"}
          emailUser={user.email || "No email provided"}
          contextOfPost={post.content || ""}
          imageOfPost={
            post.postImage
              ? `http://localhost:5000/assets/ImagePosts/${post.postImage}`
              : null
          }
          isLiked={false}
          isSave={false}
          isFollow={ false}
          isCurrentUser={true}
          comments={post.comments || []}
          mainJob={user.mainJob || "No job specified"}
          likes={post.likes || []}
        />
      ))}
    </div>
  );
};

export default DataPost;
