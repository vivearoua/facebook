import { Bookmark, Heart, MessageSquareText } from "lucide-react";
import React, { useState } from "react";
import ListOfLikesUsers from "./ListOfLikesUsers";
import handleBeginUnLike from "@/api/handleUnLike";
import handleBeginLike from "@/api/handleLike";

const InterActivePost = ({
  likes,
  comments,
  setIsOpenComments,
  isOpenComments,
  postId,
  token,
  isLiked,
  setIsLiked,
  setLikes,
}: {
  likes: any;
  comments: any;
  isOpenComments: boolean;
  setIsOpenComments: any;
  postId: string;
  token: string | null;
  isLiked: boolean;
  setIsLiked: any;
  setLikes: any;
}) => {
  const [isHoveringLikes, setIsHoveringLikes] = useState(false);
  return (
    <div className="relative my-5 flex justify-around items-center">
      <div
        className="flex justify-center items-center gap-3 group relative"
        onMouseEnter={() => setIsHoveringLikes(true)}
        onMouseLeave={() => setIsHoveringLikes(false)}
        onClick={() => {
          if (isLiked) {
            return handleBeginUnLike(postId, token, setLikes, setIsLiked);
          }
          if (!isLiked) {
            return handleBeginLike(postId, token, setLikes, setIsLiked);
          }
        }}
      >
        <Heart className={` ${isLiked && "text-red-500 "}`} />
        <div>{likes?.length || 0} Likes</div>

        {isHoveringLikes && <ListOfLikesUsers users={likes} />}
      </div>

      <div
        className="flex justify-center items-center gap-3 cursor-pointer hover:text-blue-500 transition-colors"
        onClick={() => setIsOpenComments(!isOpenComments)}
      >
        <MessageSquareText />
        <div>{comments?.length || 0} Comments</div>
      </div>

      <div className="flex justify-center items-center gap-3 cursor-pointer hover:text-green-500 transition-colors">
        <Bookmark />
        <div>Save</div>
      </div>
    </div>
  );
};

export default InterActivePost;
