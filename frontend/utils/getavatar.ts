export const url = process.env.SEVER_URL || "http://localhost:5000";
const getavatar = (filename: string | undefined) => {
  return filename ? `${url}/assets/userAvatars/${filename}` : "/userImage.webp";
};

export default getavatar;
