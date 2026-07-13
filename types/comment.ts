export interface CommentAuthor {
  id: string;
  username: string;
  avatar_url: string | null;
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  author: CommentAuthor;
}

export interface Reply {
  id: string;
  content: string;
  created_at: string;
  author: CommentAuthor;
}

export interface CreateCommentInput {
  postId: string;
  content: string;
}

export interface UpdateCommentInput {
  id: string;
  content: string;
}

export interface CreateReplyInput {
  postId: string;
  parentId: string;
  content: string;
}
