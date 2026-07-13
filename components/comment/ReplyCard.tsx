"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils/date";
import type { Reply } from "@/types/comment";

interface ReplyCardProps {
  reply: Reply;
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  const initials = (reply.author?.username || "A").slice(0, 2).toUpperCase();

  return (
    <Card className="ml-8">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <Avatar size="sm">
            {reply.author?.avatar_url && (
              <AvatarImage src={reply.author.avatar_url} alt={reply.author.username} />
            )}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {reply.author?.username || "Anonymous"}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatRelativeDate(reply.created_at)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {reply.content}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
