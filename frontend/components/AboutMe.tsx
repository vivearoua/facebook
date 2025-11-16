"use client";
import { useCurrentUser } from "@/context/ProfileContexts";
import axios from "axios";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";

const AboutMe = () => {
  const { user, setUser, loading } = useCurrentUser();
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState(user?.bio || "");

  const handleSaveBio = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/user/editBio",
        { bio }, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setUser({ ...user, bio }); 
        setIsEditingBio(false);
      } else {
        alert("Failed to update bio.");
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      alert("An error occurred while updating bio.");
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white mt-28 rounded-2xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">About Me</h2>
        <button 
          onClick={() => setIsEditingBio(!isEditingBio)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <CiEdit className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      {isEditingBio ? (
        <div className="space-y-4">
          <textarea
            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveBio}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditingBio(false);
                setBio(user?.bio || "");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[100px]">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {user?.bio || "No bio available. Click the edit button to add your bio."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AboutMe;