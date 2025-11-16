import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
  content?: string;
  fullName: string;
  email: string;
  userId: Types.ObjectId;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  postImage?: string;
}

const postSchema = new Schema<IPost>(
  {
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref : "User",
      default: [],
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref : "Comment",
      default: [],
    },
    postImage: String,
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
