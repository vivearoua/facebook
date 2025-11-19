"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import getavatar from "@/utils/getavatar";
import { FaRegHeart, FaHeart, FaRegComments } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";
import { LuUserRoundPlus } from "react-icons/lu";
import axios from "axios";
import handleBegianLike from "@/api/handleLike";
import handleBeginUnLike from "@/api/handleUnLike";
import handleBeginFollow from "@/api/handleFollow";
import { useCurrentUser } from "@/context/ProfileContexts";
import handleBeginUnFollow from "@/api/handleUnFollow";
import Comment from "./Comment";

// Define a comment interface
interface Comment {
  userId: {
    _id: string;
    fullName: string;
    email: string;
    avatar: string;
    mainJob: string;
  };
  content: string;
}

export interface PostProps {
  postId: string;
  idUser: string;
  userImage: string;
  username: string;
  emailUser: string;
  contextOfPost: string;
  imageOfPost?: string | null;
  isLiked: boolean;
  isSave: boolean;
  comments?: Comment[];
  isFollow: boolean;
  isCurrentUser?: boolean;
  mainJob: string;
  likes: object[]; // Assuming likes are objects, can be adjusted
}

const Post: React.FC<PostProps> = ({
  postId,
  idUser,
  userImage,
  username,
  emailUser,
  contextOfPost,
  imageOfPost,
  isLiked: initialIsLiked,
  isSave: initialIsSave,
  comments: initialComments,
  isFollow: initialIsFollow,
  isCurrentUser,
  mainJob,
  likes: initialLikes,
}) => {
  const [isShowComments, setIsShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isSave, setIsSave] = useState(initialIsSave);
  const [isFollow, setIsFollow] = useState(initialIsFollow);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(initialComments || []);
  const [likes, setLikes] = useState(initialLikes);
  const [token, setToken] = useState<string | null>(null);
  const { setUser } = useCurrentUser();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);

  // Handle comment input change
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  // Handle sending a comment
  const handleSendComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const requestBody = {
      content: newComment,
      postId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/comment/addComment",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setNewComment("");
        const addedComment = response.data.comment; // Assuming backend returns the new comment
        setComments((prevComments) => [...prevComments, addedComment]);
      } else {
        alert("Failed to send the comment. Please try again.");
      }
    } catch (error) {
      console.error("Error sending comment:", error);
      alert("An error occurred while sending your comment.");
    }
  };

  return (
    <div className="w-[95%] mx-auto my-5 h-fit pb-5 bg-[#E6EEFA] rounded-lg">
      <div className="flex items-center p-4 justify-between">
        <Link href={`/user/${idUser}`} className="flex items-center">
          <img
            src={getavatar(userImage)}
            width={60}
            height={60}
            alt={`${username}'s Profile`}
            className="rounded-full object-cover w-[60px] h-[60px]"
          />
          <div className="text-sm font-semibold ml-3">
            {username}
            <div className="text-slate-900 font-normal">{emailUser}</div>
            <div className="text-slate-900 font-medium">{mainJob}</div>
          </div>
        </Link>
        {!isCurrentUser &&
          (!isFollow ? (
            <button
              onClick={() =>
                handleBeginFollow(idUser, token, setUser, setIsFollow)
              }
              className="flex items-center mr-4 px-4 py-2 text-white rounded-lg justify-center bg-blue-600"
            >
              Follow <LuUserRoundPlus className="text-2xl ml-2" />
            </button>
          ) : (
            <button
              onClick={() =>
                handleBeginUnFollow(idUser, token, setUser, setIsFollow)
              }
              className="flex items-center mr-4 px-4 py-2 text-white rounded-lg justify-center bg-red-600"
            >
              Following
            </button>
          ))}
      </div>

      <div className="mx-auto w-[90%] whitespace-pre-wrap">{contextOfPost}</div>
      {imageOfPost && (
        <Image
          src={imageOfPost}
          alt="Image Post"
          width={2000}
          height={2000}
          className="w-[95%] max-w-fit mx-auto max-h-[600px] rounded-2xl mt-6"
        />
      )}

      <hr className="w-[90%] my-4 mt-7 mx-auto border-t-1 border-blue-500" />

      <div className="flex items-center mx-auto justify-around w-[90%]">
        <div className="flex items-center justify-center">
          {isLiked ? (
            <button
              onClick={() =>
                handleBeginUnLike(postId, token, setLikes, setIsLiked)
              }
            >
              <FaHeart className="text-[red] text-2xl" />
            </button>
          ) : (
            <button
              onClick={() =>
                handleBegianLike(postId, token, setLikes, setIsLiked)
              }
            >
              <FaRegHeart className="text-2xl" />
            </button>
          )}
          <div className="text-black ml-3">{likes.length} likes</div>
        </div>

        <div className="flex items-center justify-center">
          <button onClick={() => setIsShowComments(!isShowComments)}>
            <FaRegComments className="text-2xl" />
          </button>
          <div className="text-black ml-3">{comments.length} comments</div>
        </div>

        <button onClick={() => setIsSave(!isSave)}>
          <FaRegBookmark
            className={`text-2xl ${isSave ? "text-yellow-500" : ""}`}
          />
        </button>
      </div>

      {/* Comments Section */}
      {isShowComments && (
        <div className="mt-5 mx-auto w-[95%]">
          <div className="w-full mb-7">
            <div className="text-gray-700 ml-6">Send a Comment</div>
            <div className="flex items-center">
              <input
                type="text"
                className="w-[80%] outline-none p-3 m-1 shadow-2xl rounded-2xl"
                placeholder="Write your comment..."
                value={newComment}
                onChange={handleCommentChange}
              />
              <button onClick={handleSendComment}>
                <GrSend className="text-2xl ml-3" />
              </button>
            </div>
          </div>
          {comments.length > 0 ? (
            comments
              .slice()
              .reverse()
              .map((comment, index) => (
                <Comment
                  key={index}
                  userId={comment.userId._id}
                  content={comment.content}
                  email={comment.userId.email}
                  avatar={comment.userId.avatar}
                  mainJob={comment.userId.mainJob}
                  fullName={comment.userId.fullName}
                />
              ))
          ) : (
            <p className="text-sm text-center mb-4 w-full text-gray-700">
              No comments yet. Be the first!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Post;
