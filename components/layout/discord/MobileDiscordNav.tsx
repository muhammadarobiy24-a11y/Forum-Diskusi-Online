"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X, Home, Bookmark, Bell, User, Settings,
  Compass, Plus, MessageCircle, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommunities } from "@/features/community/hooks/useCommunities";

const NAV_ITEMS = [
  { href: "/post",          label: "Beranda",    icon: Home     },
  { href: "/communities",   label: "Komunitas",  icon: Compass  },
  { href: "/bookmarks",     label: "Tersimpan",  icon: Bookmark },
  { href: "/notifications", label: "Notifikasi", icon: Bell     },
  { href: "/profile",       label: "Profil",     icon: User     },
  { href: "/settings",      label: "Pengaturan", icon: Settings },
];

interface MobileDiscordNavProps {
  open: boolean;
  onClose: () => void;
  communitySlug?: string;
}

export default function MobileDiscordNav({ open, onClose }: MobileDiscordNavProps) {
  const pathname = usePathname();
  const { data: communities } = useCommunities();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      {/* Drawer */}
      <div
        className="absolute inset-y-0 left-0 flex w-72 flex-col shadow-2xl"
        style={{ background: "#ffffff", borderRight: "1px solid #e8e6e1" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-[60px] border-b border-[#e8e6e1] shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
            >
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-[var(--forum-text-primary)]">Threadly</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--forum-text-muted)] hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
            Menu
          </p>

          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/post"
                ? pathname === "/" || pathname.startsWith("/post")
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-[20px] px-3 py-2.5 text-sm font-semibold transition-all duration-150 border",
                  isActive
                    ? "text-[var(--forum-active-bar)] bg-[var(--forum-active)] border-[var(--forum-active-border)]"
                    : "text-[var(--forum-text-secondary)] hover:text-[var(--forum-text-primary)] hover:bg-[var(--forum-hover)] border-transparent"
                )}
              >
                <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-violet-600" : "text-[var(--forum-text-muted)]")} />
                {item.label}
              </Link>
            );
          })}

          {/* Communities */}
          {communities && communities.length > 0 && (
            <>
              <div className="forum-divider mx-2 my-3" />
              <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
                Komunitas Anda
              </p>
              {communities.map((c) => {
                const isActive = pathname.startsWith(`/communities/${c.slug}`);
                const initial = (c.name?.[0] ?? "?").toUpperCase();
                return (
                  <Link
                    key={c.id}
                    href={`/communities/${c.slug}`}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-[20px] px-3 py-2.5 text-sm font-semibold transition-all duration-150 border",
                      isActive
                        ? "text-[var(--forum-active-bar)] bg-[var(--forum-active)] border-[var(--forum-active-border)]"
                        : "text-[var(--forum-text-secondary)] hover:text-[var(--forum-text-primary)] hover:bg-[var(--forum-hover)] border-transparent"
                    )}
                  >
                    <div
                      className="h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-black overflow-hidden shrink-0"
                      style={{
                        background: isActive ? "linear-gradient(135deg, #7c3aed, #3b82f6)" : "#ede9fe",
                        color: isActive ? "white" : "#7c3aed",
                      }}
                    >
                      {c.icon_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={c.icon_url} alt={c.name} className="h-full w-full object-cover" />
                      ) : initial}
                    </div>
                    <span className="truncate">{c.name}</span>
                    {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto text-[var(--forum-active-bar)] shrink-0" />}
                  </Link>
                );
              })}
            </>
          )}

          <div className="forum-divider mx-2 my-3" />

          <Link
            href="/communities/create"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--forum-text-secondary)] hover:text-[var(--forum-text-primary)] hover:bg-[var(--forum-hover)] border border-transparent transition-all duration-150"
          >
            <div className="h-6 w-6 rounded-lg border border-dashed border-[#d4caff] flex items-center justify-center shrink-0 text-violet-500">
              <Plus className="h-3.5 w-3.5" />
            </div>
            Buat Komunitas Baru
          </Link>
        </nav>
      </div>
    </div>
  );
}
