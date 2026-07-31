"use client";

import { useReplies } from "@/hooks/useReplies";
import ReplyCard from "./ReplyCard";

interface ReplyListProps {
  commentId: string;
}

export default function ReplyList({ commentId }: ReplyListProps) {
  const { data: replies, isLoading } = useReplies(commentId);

  if (isLoading) {
    return (
      <div className="ml-12 space-y-2">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-16 rounded-2xl animate-pulse"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          />
        ))}
      </div>
    );
  }

  if (!replies || replies.length === 0) {
    return null;
  }

  return (
    <div className="space-y-0">
      {replies.map((reply) => (
        <ReplyCard key={reply.id} reply={reply} />
      ))}
    </div>
  );
}
