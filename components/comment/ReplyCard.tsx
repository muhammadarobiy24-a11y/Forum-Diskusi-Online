"use client";

import { formatRelativeDate } from "@/lib/utils/date";
import type { Reply } from "@/types/comment";

export default function ReplyCard({ reply }: { reply: Reply }) {
  const initials = (reply.author?.username || "A").slice(0, 2).toUpperCase();

  return (
    <div className="ml-11 flex gap-3 mb-2">
      {/* Thread line */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-px flex-1 mt-1 bg-gray-200" />
      </div>

      <div className="flex-1 min-w-0 p-4 rounded-[20px]"
        style={{ background: "#faf9f6", border: "1px solid #e8e6e1" }}>
        <div className="flex items-start gap-3">
          <div className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0 mt-0.5"
            style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)" }}>
            {initials}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--forum-text-primary)]">
                {reply.author?.username || "Anonymous"}
              </span>
              <span className="text-[10px] text-[var(--forum-text-muted)]">
                {formatRelativeDate(reply.created_at)}
              </span>
            </div>
            <p className="text-xs text-[var(--forum-text-secondary)] whitespace-pre-wrap leading-relaxed">
              {reply.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
