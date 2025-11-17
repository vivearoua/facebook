import { url } from "./getavatar";

const getimagepost = (filename: string | undefined) => {
  return filename ? `${url}/assets/ImagePosts/${filename}` : "/.webp";
};

export default getimagepost;
