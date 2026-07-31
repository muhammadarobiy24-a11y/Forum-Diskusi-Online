"use client";

import { formatRelativeDate } from "@/lib/utils/date";
import type { Reply } from "@/types/comment";

interface ReplyCardProps {
  reply: Reply;
}

export default function ReplyCard({ reply }: ReplyCardProps) {
  const initials = (reply.author?.username || "A").slice(0, 2).toUpperCase();

  return (
    <div className="ml-12 flex gap-3 group">
      {/* Thread line */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-px flex-1 mt-1" style={{ background: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Reply Content */}
      <div
        className="flex-1 min-w-0 p-4 rounded-2xl mb-3 transition-all duration-300 hover:border-white/15"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div
            className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
            style={{ background: "linear-gradient(135deg, #a855f7, #6366f1)", color: "white" }}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/80">
                {reply.author?.username || "Anonymous"}
              </span>
              <span className="text-[10px] font-medium text-white/35">
                {formatRelativeDate(reply.created_at)}
              </span>
            </div>
            <p className="text-xs font-medium text-white/60 whitespace-pre-wrap leading-relaxed">
              {reply.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
