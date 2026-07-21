"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Bookmark,
  Bell,
  User,
  Settings,
  Hash,
  ChevronDown,
  Plus,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/components/providers/SessionProvider";
import { useCommunity } from "@/features/community/hooks/useCommunity";
import UserStatusBar from "./UserStatusBar";

/* ── Nav items for non-community pages ──────────────────── */
const NAV_ITEMS = [
  { href: "/",              label: "Home",          icon: Home },
  { href: "/categories",    label: "Categories",    icon: LayoutGrid },
  { href: "/bookmarks",     label: "Bookmarks",     icon: Bookmark },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile",       label: "Profile",       icon: User },
  { href: "/settings",      label: "Settings",      icon: Settings },
];

/* ── Default channels every community shows ─────────────── */
const DEFAULT_CHANNELS = [
  { id: "general",      label: "general",       type: "text" as const },
  { id: "posts",        label: "posts",         type: "text" as const },
  { id: "announcements",label: "announcements", type: "text" as const },
];

function ChannelItem({
  href,
  label,
  active,
  icon: Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon?: React.ElementType;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-1.5 rounded px-2 py-1 text-sm transition-colors",
        active
          ? "bg-[var(--dc-active)] text-[var(--dc-text-primary)]"
          : "text-[var(--dc-text-channel)] hover:bg-[var(--dc-hover)] hover:text-[var(--dc-text-primary)]"
      )}
    >
      {Icon ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : (
        <Hash className="h-4 w-4 shrink-0 opacity-60" />
      )}
      <span className="truncate">{label}</span>
    </Link>
  );
}

/* ── Community sidebar (when on /communities/[slug]) ─────── */
function CommunitySidebar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const { data: community, isLoading } = useCommunity(slug);

  const basePath = `/communities/${slug}`;
  const isGeneralActive = pathname === basePath || pathname === `${basePath}/`;

  if (isLoading) {
    return (
      <div className="flex-1 p-3 space-y-1 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 rounded bg-[var(--dc-hover)] opacity-40" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Community header / banner */}
      <div className="relative h-12 shrink-0 overflow-hidden border-b border-[var(--dc-hover)]">
        {community?.banner_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={community.banner_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--dc-blurple)]/40 to-transparent" />
        )}
        <div className="relative flex h-full items-center justify-between px-4">
          <span className="font-semibold text-sm text-[var(--dc-text-primary)] truncate">
            {community?.name ?? slug}
          </span>
          <ChevronDown className="h-4 w-4 text-[var(--dc-text-muted)] shrink-0" />
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {/* Text Channels section */}
        <div className="mt-2">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
              Text Channels
            </span>
            <Plus className="h-3.5 w-3.5 text-[var(--dc-text-channel)] hover:text-[var(--dc-text-primary)] cursor-pointer" />
          </div>

          {DEFAULT_CHANNELS.map((ch) => {
            const isActive =
              ch.id === "general"
                ? isGeneralActive
                : pathname === `${basePath}/${ch.id}`;
            return (
              <ChannelItem
                key={ch.id}
                href={ch.id === "general" ? basePath : `${basePath}/${ch.id}`}
                label={ch.label}
                active={isActive}
              />
            );
          })}
        </div>

        {/* Moderator section */}
        <div className="mt-4">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
              Moderator
            </span>
          </div>
          <ChannelItem
            href={`${basePath}/settings`}
            label="Community Settings"
            active={pathname === `${basePath}/settings`}
            icon={Shield}
          />
        </div>
      </div>

      <UserStatusBar />
    </div>
  );
}

/* ── Default sidebar (home / other pages) ────────────────── */
function DefaultSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex h-12 items-center px-4 border-b border-[var(--dc-hover)] shrink-0">
        <span className="font-semibold text-sm text-[var(--dc-text-primary)]">
          Forum Diskusi
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        <div className="mt-1">
          <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--dc-text-channel)]">
            Menu
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <ChannelItem
                key={item.href}
                href={item.href}
                label={item.label}
                active={isActive}
                icon={item.icon}
              />
            );
          })}
        </div>
      </nav>

      <UserStatusBar />
    </div>
  );
}

/* ── Root export ─────────────────────────────────────────── */
export default function ChannelSidebar({ communitySlug }: { communitySlug?: string }) {
  return (
    <aside className="dc-channel-bg hidden lg:flex flex-col w-60 shrink-0 overflow-hidden border-r border-[var(--dc-hover)]">
      {communitySlug ? (
        <CommunitySidebar slug={communitySlug} />
      ) : (
        <DefaultSidebar />
      )}
    </aside>
  );
}
