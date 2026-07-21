"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, LayoutGrid, Bookmark, Bell, User, Settings, Hash, Compass, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommunities } from "@/features/community/hooks/useCommunities";

const NAV_ITEMS = [
  { href: "/",              label: "Home",          icon: Home },
  { href: "/categories",    label: "Categories",    icon: LayoutGrid },
  { href: "/communities",   label: "Communities",   icon: Compass },
  { href: "/bookmarks",     label: "Bookmarks",     icon: Bookmark },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile",       label: "Profile",       icon: User },
  { href: "/settings",      label: "Settings",      icon: Settings },
];

interface MobileDiscordNavProps {
  open: boolean;
  onClose: () => void;
  communitySlug?: string;
}

export default function MobileDiscordNav({ open, onClose, communitySlug }: MobileDiscordNavProps) {
  const pathname = usePathname();
  const { data: communities } = useCommunities();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 flex w-72 flex-col dc-channel-bg shadow-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--dc-hover)]">
          <span className="font-semibold text-sm text-[var(--dc-text-primary)]">Menu</span>
          <button onClick={onClose} className="text-[var(--dc-text-muted)] hover:text-[var(--dc-text-primary)]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
            Navigation
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-[var(--dc-active)] text-[var(--dc-text-primary)]"
                    : "text-[var(--dc-text-channel)] hover:bg-[var(--dc-hover)] hover:text-[var(--dc-text-primary)]"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}

          {communities && communities.length > 0 && (
            <>
              <p className="px-2 py-1 mt-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
                Communities
              </p>
              {communities.map((c) => {
                const isActive = pathname.startsWith(`/communities/${c.slug}`);
                return (
                  <Link
                    key={c.id}
                    href={`/communities/${c.slug}`}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-[var(--dc-active)] text-[var(--dc-text-primary)]"
                        : "text-[var(--dc-text-channel)] hover:bg-[var(--dc-hover)] hover:text-[var(--dc-text-primary)]"
                    )}
                  >
                    <Hash className="h-4 w-4 shrink-0 opacity-60" />
                    {c.name}
                  </Link>
                );
              })}
            </>
          )}

          <Link
            href="/communities/create"
            onClick={onClose}
            className="flex items-center gap-2 rounded px-2 py-1.5 text-sm text-[var(--dc-text-channel)] hover:bg-[var(--dc-hover)] hover:text-[var(--dc-text-primary)] transition-colors mt-2"
          >
            <Plus className="h-4 w-4 shrink-0" />
            Create Community
          </Link>
        </nav>
      </div>
    </div>
  );
}
