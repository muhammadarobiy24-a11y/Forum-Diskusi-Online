"use client";

import CommentCard from "./CommentCard";
import CommentSkeleton from "./CommentSkeleton";
import CommentEmptyState from "./CommentEmptyState";
import { useComments } from "@/hooks/useComments";

interface CommentListProps {
  postId: string;
}

export default function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading } = useComments(postId);

  return (
    <div className="space-y-4">
      {isLoading ? (
        <CommentSkeleton />
      ) : !comments || comments.length === 0 ? (
        <CommentEmptyState />
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} postId={postId} />
          ))}
        </div>
      )}
    </div>
  );
}
