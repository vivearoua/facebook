import React from "react";
import { type UserType } from "../page";
import Post from "@/components/Post";
import getavatar from "@/utils/getavatar";
import getimagepost from "@/utils/getimagepost";

const PostSectionIdUser = (user: UserType) => {
  return (
    <div className="w-full pb-12 py-1 rounded-3xl bg-white/10 backdrop-blur-lg mb-4 h-fit">
      {user.posts?.map((data, index) => (
        <Post
          key={index}
          postId={data._id}
          idUser={user._id}
          userImage={`${getavatar(user.avatar)}`}
          username={user.fullName}
          emailUser={user.email}
          contextOfPost={data.content || " "}
          imageOfPost={getimagepost(data.postImage)}
          isLiked={data.isLiked}
          isSave={(data as any).isSave || false}
          isFollow={user.isFollow}
          isCurrentUser={false}
          comments={(data as any).comments}
          mainJob={user.mainJob}
          likes={(data as any).likes}
        />
      ))}
    </div>
  );
};

export default PostSectionIdUser;
