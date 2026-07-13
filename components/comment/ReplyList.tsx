"use client";

import ReplyCard from "./ReplyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useReplies } from "@/hooks/useReplies";

interface ReplyListProps {
  commentId: string;
}

export default function ReplyList({ commentId }: ReplyListProps) {
  const { data: replies, isLoading } = useReplies(commentId);

  if (isLoading) {
    return (
      <div className="ml-8 space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-3">
              <div className="flex gap-3">
                <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!replies || replies.length === 0) {
    return null;
  }

  return (
    <div className="ml-8 space-y-3">
      {replies.map((reply) => (
        <ReplyCard key={reply.id} reply={reply} />
      ))}
    </div>
  );
}
