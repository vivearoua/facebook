import mongoose, { Schema, Document, Types } from "mongoose";

export interface IComment extends Document {
  content: string;
  userId: Types.ObjectId;
}
const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref : "User"
  },
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);
export default Comment;
