"use client";

import { useState } from "react";
import { Bell, Search, Menu, User, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/providers/SessionProvider";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import MobileDiscordNav from "./MobileDiscordNav";

/* ── Map route → page title ────────────────────────────── */
function usePageTitle(channelName?: string): string {
  const pathname = usePathname();

  if (channelName) return channelName;

  if (pathname === "/" || pathname.startsWith("/post/create")) return "Forum";
  if (pathname.startsWith("/post/") && pathname.includes("/edit")) return "Edit Post";
  if (pathname.startsWith("/post/")) return "Detail Post";
  if (pathname === "/post") return "Beranda";
  if (pathname === "/communities") return "Komunitas";
  if (pathname === "/communities/create") return "Buat Komunitas";
  if (pathname.startsWith("/communities/")) {
    const slug = pathname.split("/")[2];
    return slug ? slug.replace(/-/g, " ") : "Komunitas";
  }
  if (pathname === "/categories") return "Kategori";
  if (pathname.startsWith("/categories/")) return "Kategori";
  if (pathname === "/bookmarks") return "Tersimpan";
  if (pathname === "/notifications") return "Notifikasi";
  if (pathname === "/profile") return "Profil";
  if (pathname === "/settings") return "Pengaturan";
  return "Forum";
}

/* ── Action icon button ────────────────────────────────── */
function TopBarAction({
  href,
  onClick,
  label,
  active,
  children,
}: {
  href?: string;
  onClick?: () => void;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  const cls = `flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150 cursor-pointer shrink-0
    ${active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/8 hover:text-white/90"}`;

  if (href)
    return (
      <Link href={href} className={cls} aria-label={label} title={label}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls} aria-label={label} title={label}>
      {children}
    </button>
  );
}

/* ── Main export ────────────────────────────────────────── */
interface AppTopBarProps {
  /** Override the auto-detected title */
  channelName?: string;
  channelDescription?: string;
  /** Unused legacy — kept to avoid breaking call-sites */
  showMemberList?: boolean;
  onToggleMemberList?: () => void;
  communitySlug?: string;
}

export default function ChannelHeader({
  channelName,
  channelDescription,
  onToggleMemberList,
  showMemberList,
  communitySlug,
}: AppTopBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const router = useRouter();
  const { user } = useSession();
  const { data: unreadCount } = useUnreadNotifications(user?.id);
  const hasUnread = (unreadCount ?? 0) > 0;
  const title = usePageTitle(channelName);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/post?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setSearchOpen(false);
    }
  }

  return (
    <>
      <header
        className="flex h-[60px] items-center gap-3 px-5 shrink-0 z-20"
        style={{
          background: "var(--forum-topbar-bg)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--forum-topbar-border)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.15)",
        }}
      >
        {/* LEFT — hamburger (mobile) + page title */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl text-white/50 hover:bg-white/8 hover:text-white transition-colors shrink-0"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-white/90 truncate capitalize leading-tight">
              {title}
            </h1>
            {channelDescription && (
              <p className="text-[13px] text-white/40 truncate hidden sm:block leading-tight mt-0.5">
                {channelDescription}
              </p>
            )}
          </div>
        </div>

        {/* CENTER — search (desktop inline) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 rounded-xl px-4 py-2 w-80 transition-all duration-200"
          style={{
            background: "rgba(0,0,0,0.25)",
            border: searchFocused
              ? "1px solid rgba(124,58,237,0.55)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: searchFocused
              ? "0 0 0 3px rgba(124,58,237,0.12)"
              : "none",
          }}
        >
          <Search
            className="h-4 w-4 shrink-0 transition-colors"
            style={{ color: searchFocused ? "#a78bfa" : "rgba(255,255,255,0.30)" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Cari diskusi..."
            className="bg-transparent text-sm font-medium text-white/90 placeholder:text-white/30 outline-none flex-1 w-full"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-white/30 hover:text-white/60 transition-colors shrink-0"
              aria-label="Hapus"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </form>

        {/* RIGHT — actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Mobile search toggle */}
          <TopBarAction
            label="Cari"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <Search className="h-4 w-4 md:hidden" />
            {/* On desktop show nothing — handled inline above */}
            <span className="hidden md:block sr-only">Search</span>
          </TopBarAction>

          <TopBarAction href="/notifications" label="Notifikasi">
            <div className="relative">
              <Bell className="h-[18px] w-[18px]" />
              {hasUnread && (
                <span
                  className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white border border-black/40"
                  style={{ background: "var(--forum-danger)" }}
                >
                  {(unreadCount ?? 0) > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
          </TopBarAction>

          <TopBarAction href="/profile" label="Profil">
            <User className="h-[18px] w-[18px]" />
          </TopBarAction>
        </div>
      </header>

      {/* Mobile full-width search */}
      {searchOpen && (
        <form
          onSubmit={handleSearch}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 border-b"
          style={{
            background: "rgba(0,0,0,0.35)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <Search className="h-4 w-4 text-white/40 shrink-0" />
          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari diskusi..."
            className="bg-transparent text-sm text-white/90 placeholder:text-white/30 outline-none flex-1"
          />
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="text-white/40 hover:text-white/70"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
      )}

      <MobileDiscordNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        communitySlug={communitySlug}
      />
    </>
  );
}
