import React from "react";
import { FaShare, FaImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoImagesOutline } from "react-icons/io5";
import { LuMapPin } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { GrSend } from "react-icons/gr";

interface ActionsProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPost: () => void;
  hasContent: boolean;
}

const ActionsComponent: React.FC<ActionsProps> = ({
  handleImageUpload,
  onPost,
  hasContent,
}) => {
  return (
    <div className="flex items-center justify-between p-6 pt-2 border-t border-gray-100">
      {/* Left Side - Action Buttons */}
      <div className="flex items-center space-x-4">
        {/* Image Upload */}
        <div className="relative group">
          <label 
            htmlFor="UploadImagePost"
            className="flex items-center justify-center w-10 h-10 rounded-full 
            bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 
            cursor-pointer transition-all duration-200 group-hover:scale-110"
            title="Add Image"
          >
            <IoImagesOutline className="text-xl" />
          </label>
          <input
            type="file"
            id="UploadImagePost"
            className="hidden"
            onChange={handleImageUpload}
            accept="image/*"
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
          px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 
          transition-opacity duration-200 whitespace-nowrap">
            Add Image
          </div>
        </div>

        {/* Other Action Buttons */}
        {[
          { icon: LuMapPin, label: "Add Location", color: "text-green-600" },
          { icon: FaRegCircleUser, label: "Tag People", color: "text-purple-600" },
          { icon: FaShare, label: "Share", color: "text-orange-600" },
        ].map(({ icon: Icon, label, color }) => (
          <div key={label} className="relative group">
            <button
              className={`flex items-center justify-center w-10 h-10 rounded-full 
              bg-gray-100 hover:bg-gray-200 ${color} hover:scale-110 
              transition-all duration-200`}
              title={label}
            >
              <Icon className="text-xl" />
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
            px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 
            transition-opacity duration-200 whitespace-nowrap">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Post Button */}
      <button
        onClick={onPost}
        disabled={!hasContent}
        className={`flex items-center justify-center shadow-lg w-48
        font-semibold py-3 px-6 rounded-xl transition-all duration-200
        ${
          hasContent
            ? "bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-700 hover:to-blue-600 text-white  transform hover:scale-105"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Public Post
        <GrSend className="text-lg ml-2" />
      </button>
    </div>
  );
};

export default ActionsComponent;