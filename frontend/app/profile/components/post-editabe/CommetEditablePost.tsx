import handleAddComment from "@/api/handleAddComment";
import Comment from "@/components/Comment";
import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";

const CommetEditablePost = ({
  comments,
  postId,
}: {
  comments: any;
  postId: string;
}) => {
  const [newComment, setNewComment] = useState<string>("");
  const [commentsState, setComments] = useState(comments);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    setToken(t);
  }, []);

  return (
    <div className="mt-5 mx-auto w-[95%]">
      <div className="w-full mb-7">
        <div className="text-gray-700 ml-1">Send a Comment</div>

        <div className="flex items-center">
          <input
            type="text"
            className="w-[80%] outline-none p-3 m-1 shadow-2xl rounded-2xl"
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={() =>
              handleAddComment(
                newComment,
                postId,
                token,
                setNewComment,
                setComments
              )
            }
          >
            <Send className="text-2xl ml-3" />
          </button>
        </div>
      </div>

      {commentsState.length > 0 ? (
        commentsState
          .slice()
          .reverse()
          .map((comment: any) => (
            <Comment
              key={comment._id}
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
  );
};

export default CommetEditablePost;
