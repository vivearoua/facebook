import { useCurrentUser } from "@/context/ProfileContexts";
import React from "react";
import PostEditable from "./PostEditable";
import { FileText, PlusCircle } from "lucide-react";
import Link from "next/link";

const PostSection = () => {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex flex-col gap-6 mb-28">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mb-28">
      {user?.posts?.length ? (
        (user as any).posts.map((post : any, index : number) => (
          <PostEditable key={index} post={post} />
        ))
      ) : (
        <div className="text-center py-12">
          <div className="bg-white  rounded-2xl  p-8 max-w-md mx-auto">
            <div
              className="w-16 h-16 mx-auto mb-4 bg-blue-50  rounded-full flex
             items-center justify-center"
            >
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              No Posts Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Share your thoughts, experiences, or expertise with your
              community. Your first post is waiting to be created!
            </p>
            <Link
              href={"/"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Create Your First Post
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostSection;
