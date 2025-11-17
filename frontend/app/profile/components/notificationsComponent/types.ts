// components/notifications/types.ts
export interface INotification {
  _id: string;
  senderUserId: {
    _id: string;
    fullName: string;
    email: string;
    avatar: string | undefined;
  };
  postId?: string;
  isRead: boolean;
  action: string;
  createdAt: string;
}