import axios from "axios";

// Function to handle adding a skill for a user
const handleAddSkill = async (skill: string, token: string | null) => {
  try {
    // Validate token before making the request
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Send a POST request to the server to add the skill
    const res = await axios.patch(
      "http://localhost:5000/api/user/addSkill",
      { skill }, // Skill as part of the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure proper token formatting
        },
      }
    );

    // Return the server's response data
    return res.data;
  } catch (error) {
    console.error("Error while adding skill:", error);
    throw new Error("Failed to add skill. Please try again.");
  }
};

// Function to initiate the skill addition process
const handleBeginAddSkill = async (
  skill: string,
  token: string | null,
  setUser: (userData: any) => void
) => {
  try {
    // Call handleAddSkill and get the updated user data
    const userResData = await handleAddSkill(skill, token);

    // Ensure user data exists before updating state
    if (!userResData || !userResData.user) {
      throw new Error("Invalid response from server");
    }

    // Update user state with new data
    setUser(userResData.user);
    alert("Skill added successfully!");
  } catch (error) {
    console.error("Error in handleBeginAddSkill:", error);
    alert("An error occurred while adding the skill.");
  }
};

export default handleBeginAddSkill;
