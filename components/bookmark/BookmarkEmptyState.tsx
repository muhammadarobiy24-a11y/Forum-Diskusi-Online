"use client";

import Link from "next/link";
import { Bookmark, Compass } from "lucide-react";

export default function BookmarkEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center rounded-[28px]"
      style={{ background: "#edfff5", border: "1px solid #b6f5d3" }}>
      <div className="flex items-center justify-center h-16 w-16 rounded-[24px] mb-5"
        style={{ background: "#dcfce7", border: "1px solid #b6f5d3" }}>
        <Bookmark className="h-8 w-8 text-emerald-500" />
      </div>
      <h3 className="text-xl font-bold text-[var(--forum-text-primary)] mb-2">Belum ada bookmark</h3>
      <p className="text-sm text-[var(--forum-text-muted)] mb-6 max-w-sm mx-auto">
        Simpan postingan menarik untuk dibaca nanti saat Anda membutuhkannya.
      </p>
      <Link href="/post"
        className="forum-btn-accent inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm">
        <Compass className="h-4 w-4" />
        Jelajahi Postingan
      </Link>
    </div>
  );
}
