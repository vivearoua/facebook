import { url } from "@/utils/getavatar";
import axios from "axios";


const handleDeletePost = async (
  setUser: any,
  user: any,
  _id: string,
  token: string | null
) => {
  try {
    await axios.delete(`${url}/api/post/deletePost/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newPosts = user.posts.filter((post: any) => {
      return post._id !== _id;
    });

    setUser({
      ...user,
      posts: newPosts,
    });
  } catch (error) {
    console.log(error);
  }
};

export default handleDeletePost;
