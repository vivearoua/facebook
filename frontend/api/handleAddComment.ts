import axios from "axios";

const handleAddComment = async (
  newComment: string | undefined,
  postId: string,
  token: string | null,
  setNewComment: any,
  setComments: any,
) => {
  
  if (!newComment || !newComment.trim()) {
    alert("Comment cannot be empty.");
    return;
  }

  const requestBody = {
    content: newComment,
    postId,
  };

  try {
    const response = await axios.post(
      "http://localhost:5000/api/comment/addComment",
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 201) {
      // Clear input
      setNewComment("");

      // Extract returned comment
      const addedComment = response.data.comment;

      // Update comments list in state
      setComments((prevComments: any[]) => {
        // Ensure prevComments is an array
        if (!Array.isArray(prevComments)) return [addedComment];
        return [...prevComments, addedComment];   // append new comment
      });

    } else {
      alert("Failed to send the comment. Please try again.");
    }
  } catch (error) {
    console.error("Error sending comment:", error);
    alert("An error occurred while sending your comment.");
  }
};

export default handleAddComment;
