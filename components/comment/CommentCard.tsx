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

export default function CommentCard({ comment, postId }: { comment: Comment; postId: string }) {
  const { user } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const initials = (comment.author?.username || "A").slice(0, 2).toUpperCase();
  const isAuthor = user?.id === comment.author?.id;

  if (isEditing) {
    return (
      <div className="p-5 rounded-[24px]" style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
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
      <div className="p-5 rounded-[24px] transition-all duration-200 hover:-translate-y-0.5 group"
        style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <div className="flex gap-3">
          {/* Avatar */}
          <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
            style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
            {initials}
          </div>

          <div className="flex-1 min-w-0 space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-bold text-[var(--forum-text-primary)]">
                  {comment.author?.username || "Anonymous"}
                </span>
                <span className="text-xs text-[var(--forum-text-muted)]">
                  {formatRelativeDate(comment.created_at)}
                </span>
              </div>
              {isAuthor && (
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full text-[var(--forum-text-muted)] hover:text-violet-600 hover:bg-violet-50 transition-all">
                    <Pencil className="h-3 w-3" />Edit
                  </button>
                  <DeleteCommentButton commentId={comment.id} postId={postId} />
                </div>
              )}
            </div>

            {/* Content */}
            <p className="text-sm text-[var(--forum-text-secondary)] whitespace-pre-wrap leading-relaxed">
              {comment.content}
            </p>

            {/* Reply button */}
            {user && (
              <button onClick={() => setShowReplyForm(!showReplyForm)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[var(--forum-text-muted)] hover:text-violet-500 transition-colors mt-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {showReplyForm ? "Tutup" : "Balas"}
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-11">
          <ReplyForm parentId={comment.id} postId={postId} onCancel={() => setShowReplyForm(false)} />
        </div>
      )}

      <ReplyList commentId={comment.id} />
    </div>
  );
}
