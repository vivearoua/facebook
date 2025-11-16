import { useCurrentUser } from "@/context/ProfileContexts";
import React, { useEffect, useState } from "react";
import PostEditableInfo from "./post-editabe/PostEditableInfo";
import EdtiablePostConent from "./post-editabe/EdtiablePostConent";
import EdtiablePostImge from "./post-editabe/EdtiablePostImge";
import InterActivePost from "./post-editabe/InterActivePost";
import CommetEditablePost from "./post-editabe/CommetEditablePost";

const PostEditable = (post: any) => {
  const { user, loading } = useCurrentUser();
  const [isLiked, setIsLiked] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isEditPost, setIsditPost] = useState(false);
  const [isOpenComments, setIsOpenComments] = useState(false);
  const [likes  , setLikes]  = useState(post.post.likes); 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setToken(token);
  }, []);
  useEffect(() => {
    if (user && post?.post?.likes) {
      const is = post.post.likes.some(
        (like: any) => like._id === (user as any)._id
      );
      console.log(is)
      setIsLiked(is);
    }
  }, [user, post]);

  return (
    <div className="w-3/4 h-fit bg-[#E6EEFA] mx-auto rounded-xl p-6">
      <PostEditableInfo
        _id={post.post._id}
        name={user?.fullName}
        email={user?.email}
        job={user?.mainJob}
        avatar={user?.avatar}
        isEditPost={isEditPost}
        setIsditPost={setIsditPost}
        token={token}
      />

      <EdtiablePostConent content={post.post.content} />
      <EdtiablePostImge image={post.post.postImage} />
      <InterActivePost
        likes={likes}
        comments={post.post.comments}
        isOpenComments={isOpenComments}
        setIsOpenComments={setIsOpenComments}
        postId={post.post._id}
        token={token}
        isLiked={isLiked}
        setIsLiked={setIsLiked}
        setLikes={setLikes}
      />
      {isOpenComments && (
        <CommetEditablePost
          postId={post.post._id}
          comments={post.post.comments}
        />
      )}
    </div>
  );
};

export default PostEditable;
