"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { useSession } from "@/components/providers/SessionProvider";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AppTopBar() {
  const { user } = useSession();
  const { data: unreadCount } = useUnreadNotifications(user?.id);
  const hasUnread = (unreadCount ?? 0) > 0;
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");

  const username =
    (user?.user_metadata?.username as string) ||
    user?.email?.split("@")[0] ||
    "Pengguna";
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;
  const initials = username.slice(0, 2).toUpperCase();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/post?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setShowSearch(false);
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full" style={{ background: "var(--app-bg, #f5e6d3)" }}>
      <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">

        {/* LEFT — avatar + greeting */}
        <Link href="/profile" className="flex items-center gap-3 min-w-0">
          <div
            className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0 overflow-hidden"
            style={{
              background: avatarUrl
                ? `url(${avatarUrl}) center/cover`
                : "linear-gradient(135deg, #6c5ce7, #a29bfe)",
            }}
          >
            {!avatarUrl && initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[var(--forum-text-muted)] leading-none">
              {user ? "Selamat datang" : "Forum Diskusi"}
            </p>
            <p className="text-base font-black text-[var(--forum-text-primary)] truncate leading-tight mt-0.5">
              {user ? username : "Masuk dulu"}
            </p>
          </div>
        </Link>

        {/* RIGHT — search + notif */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search toggle */}
          <button
            onClick={() => setShowSearch(v => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all"
            style={{ background: "rgba(0,0,0,0.06)" }}
            aria-label="Cari"
          >
            <Search className="h-4.5 w-4.5 text-[var(--forum-text-primary)]" />
          </button>

          {/* Notifications */}
          <Link href="/notifications" aria-label="Notifikasi">
            <div
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-all"
              style={{ background: "rgba(0,0,0,0.06)" }}
            >
              <Bell className="h-4.5 w-4.5 text-[var(--forum-text-primary)]" />
              {hasUnread && (
                <span
                  className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full border-2"
                  style={{ background: "#e17055", borderColor: "var(--app-bg, #f5e6d3)" }}
                />
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Collapsible search bar */}
      {showSearch && (
        <form
          onSubmit={handleSearch}
          className="px-4 pb-3 max-w-2xl mx-auto"
        >
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{ background: "#fff", border: "1.5px solid oklch(0.88 0.025 62)" }}
          >
            <Search className="h-4 w-4 text-[var(--forum-text-muted)] shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari diskusi, topik..."
              className="flex-1 bg-transparent text-sm font-semibold text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs font-bold text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)]"
              >
                ✕
              </button>
            )}
          </div>
        </form>
      )}
    </header>
  );
}
