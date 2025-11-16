import React from "react";

interface InfoUserGetNumberLikesCommentsTypes {
  numberLikes: string | undefined;
  numberComments: string | undefined;
  numberPosts: number | undefined;
  numberCommunities: number | undefined;
}

const InfoUserGetNumberLikesComments: React.FC<
  InfoUserGetNumberLikesCommentsTypes
> = ({ numberLikes, numberComments, numberPosts, numberCommunities }) => {
  return (
    <div className="w-full bg-white/10 rounded-2xl backdrop-blur-3xl p-6 h-[250px]">
      <h1 className=" text-white text-lg font-semibold mb-3">
        Likes : <span className=" font-normal">{numberLikes}</span>
      </h1>
      <h1 className=" text-white text-lg font-semibold mb-3">
        Comments : <span className=" font-normal">{numberComments}</span>
      </h1>

      <h1 className=" text-white text-lg font-semibold mb-3">
        Created Post : <span className=" font-normal">{numberPosts}</span>
      </h1>
      <h1 className=" text-white text-lg font-semibold mb-3">
        Communities : <span className=" font-normal">{numberCommunities}</span>
      </h1>
    </div>
  );
};

export default InfoUserGetNumberLikesComments;
