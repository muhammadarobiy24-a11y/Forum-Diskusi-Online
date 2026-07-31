"use client";

import { useState } from "react";
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
      <div
        className="p-5 rounded-3xl"
        style={{
          background: "rgba(124,58,237,0.06)",
          border: "1px solid rgba(124,58,237,0.25)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <EditCommentForm
          commentId={comment.id}
          initialContent={comment.content}
          postId={postId}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className="p-5 rounded-3xl transition-all duration-300 hover:border-white/15 group"
        style={{
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex gap-4">
          {/* Avatar */}
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "white" }}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-white/90">
                  {comment.author?.username || "Anonymous"}
                </span>
                <span className="text-xs font-medium text-white/40">
                  {formatRelativeDate(comment.created_at)}
                </span>
              </div>

              {isAuthor && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <Pencil className="h-3 w-3" />
                    Edit
                  </button>
                  <DeleteCommentButton commentId={comment.id} postId={postId} />
                </div>
              )}
            </div>

            {/* Content */}
            <p className="text-sm font-medium text-white/70 whitespace-pre-wrap leading-relaxed">
              {comment.content}
            </p>

            {/* Reply button */}
            {user && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-violet-400 transition-colors mt-1"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                {showReplyForm ? "Tutup" : "Balas"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <div className="ml-12">
          <ReplyForm
            parentId={comment.id}
            postId={postId}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {/* Replies */}
      <ReplyList commentId={comment.id} />
    </div>
  );
}
