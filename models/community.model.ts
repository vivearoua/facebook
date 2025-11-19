import mongoose, { Schema, Document, Types } from "mongoose";


export interface ICommunity extends Document {
    name: string;
    CreatorId: Types.ObjectId;
    admins: Types.ObjectId[];
    members: Types.ObjectId[];
    bio: string;
    posts: Types.ObjectId[];
}

const communitySchema = new Schema<ICommunity>(
    {
        name: {
            type: String,
            required: true,
        },
        CreatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        admins: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        members: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        bio: {
            type: String,
            default: "",
        },
        posts: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Post",
            default: [],
        },
    },
    { timestamps: true }
);

const Community = mongoose.model<ICommunity>("Community", communitySchema);

export default Community;