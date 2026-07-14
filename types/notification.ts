export interface NotificationActor {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface Notification {
  id: string;
  user_id: string;
  actor_id: string;
  post_id: string | null;
  comment_id: string | null;
  type: "like" | "comment" | "reply" | "bookmark";
  message: string;
  is_read: boolean;
  created_at: string;
  actor?: NotificationActor;
}

export interface GetNotificationsParams {
  userId: string;
  page?: number;
  limit?: number;
}

export interface GetNotificationsResponse {
  notifications: Notification[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    startItem: number;
    endItem: number;
  };
}
