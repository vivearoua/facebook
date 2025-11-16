import React from "react";
import DataPost from "./DataPost";

const MiddeBottomProfile = () => {
  return (
    <div className="w-full h-[700px] rounded-3xl bg-white/80 backdrop-blur-xl shadow-xl border border-white/20 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <span className="mr-2">📝</span>
          Your Posts
        </h2>
      </div>
      <div className="h-[calc(100%-80px)] overflow-y-auto">
        <DataPost />
      </div>
    </div>
  );
};

export default MiddeBottomProfile;