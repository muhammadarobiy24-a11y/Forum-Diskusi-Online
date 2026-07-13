"use client";

import { MessageSquare } from "lucide-react";

export default function CommentEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <MessageSquare className="h-10 w-10 text-muted-foreground mb-3" />
      <h3 className="text-sm font-semibold">Belum ada komentar</h3>
      <p className="text-xs text-muted-foreground mt-1">
        Jadilah yang pertama berkomentar.
      </p>
    </div>
  );
}
