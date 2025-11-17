import mongoose, { Schema, Document, Types } from "mongoose";

export interface INotification extends Document {
  senderUserId: Types.ObjectId;
  postId?: Types.ObjectId;
  isRead: boolean;
  action: string;
}

const notificationSchema = new Schema<INotification>({
  senderUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  action: {
    type: String,
    enum: ["like", "follow", "comment"],
    required: true,
  },
});

const Notification = mongoose.model<INotification>("Notification", notificationSchema);

export default Notification;
