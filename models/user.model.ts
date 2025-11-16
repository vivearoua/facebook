import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  bio: string;
  avatar: string | undefined;
  followers: Types.ObjectId[];
  followings: Types.ObjectId[];
  mainJob: string;
  Skills: string[];
  communities: Types.ObjectId[];
  notifications: Types.ObjectId[];
  posts: Types.ObjectId[];
  numberOfLikes: number;
  numberOfcomments: number;
  savedPost: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "New Account",
    },
    avatar: {
      type: String,
      default: "/userImage.webp",
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    followings: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    mainJob: {
      type: String,
      default: "Don't have any Jobs",
    },
    Skills: {
      type: [String],
      default: [],
    },
    communities: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Community",
    },
    notifications: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Notification",
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Post",
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    numberOfcomments: {
      type: Number,
      default: 0,
    },
    savedPost: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Post",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
