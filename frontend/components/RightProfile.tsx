"use client";
import { useCurrentUser } from "@/context/ProfileContexts";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import SkillsSection from "./SkillsSection";

const RightProfile = () => {
  const { user, setUser } = useCurrentUser();
  const [isUploading, setIsUploading] = useState(false);
  const [isEditMainJob, setIsEditMainJob] = useState(false);
  const [isEditFullName, setIsEditFullName] = useState(false);
  const [token, setToken] = useState<string | null>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken || "");
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    setIsUploading(true);
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/user/addAvatar",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUser(response.data.user);
        alert("Avatar updated successfully!");
      } else {
        alert("Failed to upload the image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditMainJob = () => {
    setIsEditMainJob(true);
  };

  const handleSaveMainJob = async () => {
    try {
      setIsEditMainJob(false);
      const response = await axios.patch(
        "http://localhost:5000/api/user/editMainJob",
        { mainJob: user?.mainJob },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Main job updated successfully!");
      } else {
        alert("Failed to update main job.");
      }
    } catch (error) {
      console.error("Error updating main job:", error);
      alert("An error occurred while updating main job.");
    }
  };

  const handleEditFullName = () => {
    setIsEditFullName(true);
  };

  const handleSaveFullName = async () => {
    try {
      setIsEditFullName(false);
      const response = await axios.patch(
        "http://localhost:5000/api/user/editFullName",
        { fullName: user?.fullName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Full name updated successfully!");
      } else {
        alert("Failed to update full name.");
      }
    } catch (error) {
      console.error("Error updating full name:", error);
      alert("An error occurred while updating full name.");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <Image
            src={
              user?.avatar
                ? `http://localhost:5000/assets/userAvatars/${user.avatar}`
                : "/default-avatar.png"
            }
            width={70}
            height={70}
            alt="Profile Avatar"
            className="rounded-full object-cover border-2 border-gray-300"
          />
          <label
            htmlFor="ProfileImage"
            className="absolute bottom-0 right-0 bg-gray-600 text-white p-1 rounded-full cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <IoIosAddCircleOutline className="w-4 h-4" />
          </label>
          <input
            type="file"
            className="hidden"
            id="ProfileImage"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="flex-1">
          {/* Full Name */}
          {isEditFullName ? (
            <input
              type="text"
              value={user?.fullName || ""}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              onBlur={handleSaveFullName}
              className="w-full text-lg font-semibold text-gray-900 bg-transparent border-b border-gray-400 outline-none"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2 group">
              <h2 className="text-lg font-semibold text-gray-900">
                {user?.fullName || "Your Name"}
              </h2>
              <CiEdit
                className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                onClick={handleEditFullName}
              />
            </div>
          )}

          {/* Email */}
          <p className="text-gray-700 text-sm mt-1">
            {user?.email || "Your Email"}
          </p>

          {/* Main Job */}
          {isEditMainJob ? (
            <input
              type="text"
              value={user?.mainJob || ""}
              onChange={(e) => setUser({ ...user, mainJob: e.target.value })}
              onBlur={handleSaveMainJob}
              className="w-full text-gray-700 bg-transparent border-b border-gray-400 outline-none mt-1"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-2 group mt-1">
              <p className="text-gray-700 text-sm">
                {user?.mainJob || "Your Job"}
              </p>
              <CiEdit
                className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                onClick={handleEditMainJob}
              />
            </div>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <SkillsSection user={user} token={token} setUser={setUser} />

      {/* Loading State */}
      {isUploading && (
        <div className="absolute inset-0 bg-white/90 rounded-2xl flex items-center justify-center">
          <p className="text-gray-700 font-medium">Uploading...</p>
        </div>
      )}
    </div>
  );
};

export default RightProfile;
