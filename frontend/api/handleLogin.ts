import axios from "axios";
import { useRouter } from "next/navigation";

const handleLogin = async (
  email: string,
  password: string,
  router: ReturnType<typeof useRouter> // Pass router as an argument
) => {
  // Validate input fields
  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  try {
    // Send login request to the backend
    const response = await axios.post("http://localhost:5000/api/auth/logIn", {
      email,
      password,
    });

    // Check if login was successful
    if (response.status === 200) {
      // Save token to localStorage
      const token = response.data.token;
      localStorage.setItem("accessToken", token);

      // Navigate to the home page
      router.push("/");
    } else {
      // Handle unexpected responses
      alert("Unexpected response from the server.");
    }
  } catch (error: any) {
    // Handle errors from the backend
    if (error.response) {
      // Errors from the server (e.g., 400, 401, 500)
      const errorMessage = error.response.data.message || "An error occurred.";
      alert(`Login failed: ${errorMessage}`);
    } else if (error.request) {
      // Errors related to network issues
      alert(
        "Login failed: Unable to reach the server. Please check your internet connection."
      );
    } else {
      // Other unknown errors
      alert(`Login failed: ${error.message}`);
    }
  }
};

export default handleLogin;
