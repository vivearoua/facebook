export const url = process.env.SEVER_URL || "http://localhost:5000";

const getavatar = (filename: string | undefined) => {
  if (!filename || filename === "/userImage.webp") {
    // Generate avatar from DiceBear API with default seed
    return "https://api.dicebear.com/7.x/avataaars/svg?seed=User";
  }

  // Extract name from filename (e.g., "alice.png" -> "alice")
  const nameMatch = filename.match(/^([^.]+)/);
  if (nameMatch) {
    const name = nameMatch[1];
    // Generate avatar from DiceBear API using name as seed
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
  }

  return `${url}/assets/userAvatars/${filename}`;
};

export default getavatar;
