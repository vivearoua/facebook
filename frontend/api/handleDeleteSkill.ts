import axios from "axios";

// Function to handle deleting a skill for a user
const handleDeleteSkill = async (skill: string, token: string | null) => {
  try {
    // Validate token before making the request
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Send a DELETE request to the server to delete the skill
    const res = await axios.delete("http://localhost:5000/api/user/deleteSkill", {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure proper token formatting
      },
      data: { skill }, // Include skill in the request body
    });

    // Return the server's response data
    return res.data;
  } catch (error) {
    console.error("Error while deleting skill:", error);
    throw new Error("Failed to delete skill. Please try again.");
  }
};

// Function to initiate the skill deletion process
const handleBeginDeleteSkill = async (
  skill: string,
  token: string | null,
  setUser: (userData: any) => void
) => {
  try {
    // Call handleDeleteSkill and get the updated user data
    const userResData = await handleDeleteSkill(skill, token);

    // Ensure user data exists before updating state
    if (!userResData || !userResData.user) {
      throw new Error("Invalid response from server");
    }

    // Update user state with new data
    setUser(userResData.user);
    alert("Skill deleted successfully!");
  } catch (error) {
    console.error("Error in handleBeginDeleteSkill:", error);
    alert("An error occurred while deleting the skill.");
  }
};

export default handleBeginDeleteSkill;
