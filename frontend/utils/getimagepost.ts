import { url } from "./getavatar";

const getimagepost = (filename: string | undefined) => {
  console.log(filename);
  return filename ? `${url}/assets/ImagePosts/${filename}` : "/.webp";
};

export default getimagepost;
