export interface Like {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
}

export interface GetLikesParams {
  postId: string;
}

export interface GetLikeCountResponse {
  count: number;
}
