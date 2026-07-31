"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X, Home, LayoutGrid, Bookmark, Bell, User, Settings,
  Compass, Plus, MessageCircle, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommunities } from "@/features/community/hooks/useCommunities";

const NAV_ITEMS = [
  { href: "/post",          label: "Beranda",    icon: Home        },
  { href: "/communities",   label: "Komunitas",  icon: Compass     },
  { href: "/categories",    label: "Kategori",   icon: LayoutGrid  },
  { href: "/bookmarks",     label: "Tersimpan",  icon: Bookmark    },
  { href: "/notifications", label: "Notifikasi", icon: Bell        },
  { href: "/profile",       label: "Profil",     icon: User        },
  { href: "/settings",      label: "Pengaturan", icon: Settings    },
];

interface MobileDiscordNavProps {
  open: boolean;
  onClose: () => void;
  communitySlug?: string;
}

export default function MobileDiscordNav({
  open,
  onClose,
}: MobileDiscordNavProps) {
  const pathname = usePathname();
  const { data: communities } = useCommunities();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        style={{ backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="absolute inset-y-0 left-0 flex w-72 flex-col shadow-2xl"
        style={{
          background: "rgba(12,8,28,0.92)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-[52px] border-b border-white/5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                boxShadow: "0 0 10px rgba(124,58,237,0.4)",
              }}
            >
              <MessageCircle className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-white/90">Forum Diskusi</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/8 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
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
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-all duration-150 border",
                  isActive
                    ? "text-white bg-[var(--forum-active)] border-[var(--forum-active-border)]"
                    : "text-white/55 hover:text-white/90 hover:bg-[var(--forum-hover)] border-transparent"
                )}
              >
                <item.icon
                  className={cn(
                    "h-4 w-4 shrink-0",
                    isActive ? "text-violet-400" : "text-white/35"
                  )}
                />
                {item.label}
              </Link>
            );
          })}

          {/* Communities */}
          {communities && communities.length > 0 && (
            <>
              <div className="forum-divider mx-2 my-3" />
              <p className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/30">
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
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-all duration-150 border",
                      isActive
                        ? "text-white bg-[var(--forum-active)] border-[var(--forum-active-border)]"
                        : "text-white/55 hover:text-white/90 hover:bg-[var(--forum-hover)] border-transparent"
                    )}
                  >
                    <div
                      className="h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-black text-white overflow-hidden shrink-0"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, #7c3aed, #3b82f6)"
                          : "rgba(255,255,255,0.10)",
                      }}
                    >
                      {c.icon_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.icon_url}
                          alt={c.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        initial
                      )}
                    </div>
                    <span className="truncate">{c.name}</span>
                    {isActive && (
                      <ChevronRight className="h-3.5 w-3.5 ml-auto text-white/30 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </>
          )}

          <div className="forum-divider mx-2 my-3" />

          <Link
            href="/communities/create"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold text-white/50 hover:text-white/80 hover:bg-[var(--forum-hover)] border border-transparent transition-all duration-150"
          >
            <div className="h-6 w-6 rounded-lg border border-dashed border-white/25 flex items-center justify-center shrink-0">
              <Plus className="h-3.5 w-3.5" />
            </div>
            Buat Komunitas Baru
          </Link>
        </nav>
      </div>
    </div>
  );
}
