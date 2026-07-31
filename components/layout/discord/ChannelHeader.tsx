"use client";

import { useState } from "react";
import { Bell, Search, Menu, User, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/providers/SessionProvider";
import { useUnreadNotifications } from "@/hooks/useUnreadNotifications";
import MobileDiscordNav from "./MobileDiscordNav";

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

function TopBarAction({
  href, onClick, label, active, children,
}: {
  href?: string; onClick?: () => void; label: string; active?: boolean; children: React.ReactNode;
}) {
  const cls = `flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150 cursor-pointer shrink-0 ${
    active
      ? "bg-violet-100 text-violet-700"
      : "text-[var(--forum-text-muted)] hover:bg-gray-100 hover:text-[var(--forum-text-primary)]"
  }`;
  if (href) return <Link href={href} className={cls} aria-label={label} title={label}>{children}</Link>;
  return <button onClick={onClick} className={cls} aria-label={label} title={label}>{children}</button>;
}

interface AppTopBarProps {
  channelName?: string;
  channelDescription?: string;
  showMemberList?: boolean;
  onToggleMemberList?: () => void;
  communitySlug?: string;
}

export default function ChannelHeader({
  channelName, channelDescription, communitySlug,
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
      setSearch(""); setSearchOpen(false);
    }
  }

  return (
    <>
      <header
        className="flex h-[68px] items-center gap-3 px-5 shrink-0 z-20"
        style={{
          background: "var(--forum-topbar-bg)",
          borderBottom: "1px solid var(--forum-topbar-border)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {/* LEFT — title */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl text-[var(--forum-text-muted)] hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Buka menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-[var(--forum-text-primary)] truncate capitalize leading-tight">
              {title}
            </h1>
            {channelDescription && (
              <p className="text-[13px] text-[var(--forum-text-muted)] truncate hidden sm:block leading-tight mt-0.5">
                {channelDescription}
              </p>
            )}
          </div>
        </div>

        {/* CENTER — search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center gap-2 rounded-xl px-4 py-2 w-80 transition-all duration-200"
          style={{
            background: searchFocused ? "#fff" : "#f3f2ef",
            border: searchFocused ? "1.5px solid #7c3aed" : "1.5px solid #e5e3de",
            boxShadow: searchFocused ? "0 0 0 3px rgba(124,58,237,0.12)" : "none",
          }}
        >
          <Search
            className="h-4 w-4 shrink-0 transition-colors"
            style={{ color: searchFocused ? "#7c3aed" : "#8b87a0" }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Cari diskusi..."
            className="bg-transparent text-sm font-medium text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] outline-none flex-1 w-full"
          />
          {search && (
            <button type="button" onClick={() => setSearch("")}
              className="text-[var(--forum-text-muted)] hover:text-[var(--forum-text-primary)] shrink-0">
              <X className="h-3 w-3" />
            </button>
          )}
        </form>

        {/* RIGHT — actions */}
        <div className="flex items-center gap-1 shrink-0">
          <TopBarAction label="Cari" onClick={() => setSearchOpen(v => !v)}>
            <Search className="h-4 w-4 md:hidden" />
            <span className="hidden md:block sr-only">Search</span>
          </TopBarAction>

          <TopBarAction href="/notifications" label="Notifikasi">
            <div className="relative">
              <Bell className="h-[18px] w-[18px]" />
              {hasUnread && (
                <span
                  className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full flex items-center justify-center text-[8px] font-bold text-white"
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

      {/* Mobile search */}
      {searchOpen && (
        <form onSubmit={handleSearch}
          className="lg:hidden flex items-center gap-2 px-4 py-2.5 border-b border-[var(--forum-topbar-border)] bg-white">
          <Search className="h-4 w-4 text-[var(--forum-text-muted)] shrink-0" />
          <input autoFocus type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Cari diskusi..."
            className="bg-transparent text-sm text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] outline-none flex-1" />
          <button type="button" onClick={() => setSearchOpen(false)} className="text-[var(--forum-text-muted)]">
            <X className="h-4 w-4" />
          </button>
        </form>
      )}

      <MobileDiscordNav open={mobileOpen} onClose={() => setMobileOpen(false)} communitySlug={communitySlug} />
    </>
  );
}
