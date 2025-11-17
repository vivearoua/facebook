import React, { useState } from "react";
import axios from "axios";
import TextareaComponent from "./TextareaComponent";
import ActionsComponent from "./ActionsComponent";
import Image from "next/image";

interface AddPostProps {
  context: string;
  setContext: React.Dispatch<React.SetStateAction<string>>;
  token: string | null;
}

const AddPost: React.FC<AddPostProps> = ({ context, setContext, token }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imageName, setImageName] = useState<string | null>(null);

  const handleImagePostUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("PostImage", file);

    setIsUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/post/addImagePost",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setImageName(response.data.fileName);
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

  const handlePost = async () => {
    if (!token) {
      alert("Token is missing! Please log in.");
      return;
    }

    if (!context.trim() && !imageName) {
      alert("Please add some content or an image to post.");
      return;
    }

    const postData = {
      content: context.trim(),
      imageName: imageName || null,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/post/createPost",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setContext("");
        setImageName(null);
      } else {
        alert("Failed to create the post.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    }
  };

  const removeImage = () => {
    setImageName(null);
  };

  return (
    <div className="w-full rounded-3xl bg-white shadow-lg border border-gray-200 mb-6 transition-all duration-300 hover:shadow-xl">
      {/* Textarea Component */}
      <TextareaComponent
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />

      {isUploading && (
        <div className="flex justify-center items-center w-full px-5 py-4">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="text-gray-600 font-medium">
              Uploading image...
            </span>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {imageName && !isUploading && (
        <div className="relative w-[95%] mx-auto rounded-2xl mb-4 bg-gray-50 p-4 border border-gray-200">
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
          >
            ×
          </button>
          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={`http://localhost:5000/assets/ImagePosts/${imageName}`}
              alt={`Uploaded Image: ${imageName}`}
              fill
              className="object-cover rounded-lg shadow-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      )}

      {/* Actions Component */}
      <ActionsComponent
        handleImageUpload={handleImagePostUpload}
        onPost={handlePost}
        hasContent={!!context.trim() || !!imageName}
      />
    </div>
  );
};

export default AddPost;
