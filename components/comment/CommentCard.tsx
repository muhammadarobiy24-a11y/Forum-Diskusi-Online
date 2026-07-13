"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, MessageSquare } from "lucide-react";
import { formatRelativeDate } from "@/lib/utils/date";
import { useSession } from "@/components/providers/SessionProvider";
import EditCommentForm from "./EditCommentForm";
import DeleteCommentButton from "./DeleteCommentButton";
import ReplyForm from "./ReplyForm";
import ReplyList from "./ReplyList";
import type { Comment } from "@/types/comment";

interface CommentCardProps {
  comment: Comment;
  postId: string;
}

export default function CommentCard({ comment, postId }: CommentCardProps) {
  const { user } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const initials = (comment.author?.username || "A").slice(0, 2).toUpperCase();
  const isAuthor = user?.id === comment.author?.id;

  if (isEditing) {
    return (
      <Card>
        <CardContent className="p-4">
          <EditCommentForm
            commentId={comment.id}
            initialContent={comment.content}
            postId={postId}
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar size="sm">
              {comment.author?.avatar_url && (
                <AvatarImage src={comment.author.avatar_url} alt={comment.author.username} />
              )}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {comment.author?.username || "Anonymous"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeDate(comment.created_at)}
                  </span>
                </div>

                {isAuthor && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Pencil className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <DeleteCommentButton commentId={comment.id} postId={postId} />
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {comment.content}
              </p>

              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Balas
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showReplyForm && (
        <div className="ml-8">
          <ReplyForm
            parentId={comment.id}
            postId={postId}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      <ReplyList commentId={comment.id} />
    </div>
  );
}
