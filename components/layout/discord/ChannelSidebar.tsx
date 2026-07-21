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
  Volume2,
  ChevronDown,
  Plus,
  Shield,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommunity } from "@/features/community/hooks/useCommunity";
import UserStatusBar from "./UserStatusBar";

const NAV_ITEMS = [
  { href: "/post",          label: "Home",          icon: Home,        section: "main" },
  { href: "/communities",   label: "Communities",   icon: Compass,     section: "main" },
  { href: "/categories",    label: "Categories",    icon: LayoutGrid,  section: "main" },
  { href: "/bookmarks",     label: "Bookmarks",     icon: Bookmark,    section: "main" },
  { href: "/notifications", label: "Notifications", icon: Bell,        section: "main" },
  { href: "/profile",       label: "Profile",       icon: User,        section: "user" },
  { href: "/settings",      label: "Settings",      icon: Settings,    section: "user" },
];

const TEXT_CHANNELS = [
  { id: "general",       label: "general" },
  { id: "posts",         label: "posts" },
  { id: "announcements", label: "announcements" },
];

const VOICE_CHANNELS = [
  { id: "lobby",  label: "Lobby" },
  { id: "gaming", label: "Gaming" },
];

interface ChannelItemProps {
  href: string;
  label: string;
  active: boolean;
  icon?: React.ElementType;
  type?: "text" | "voice" | "nav";
}

function ChannelItem({ href, label, active, icon: Icon, type = "text" }: ChannelItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-2 rounded-md mx-2 px-2 py-[6px] text-[15px] font-medium transition-all duration-100",
        active
          ? "bg-[oklch(0.33_0.008_264)] text-[var(--dc-text-primary)]"
          : "text-[var(--dc-text-channel)] hover:bg-[oklch(0.29_0.006_264)] hover:text-[oklch(0.82_0.006_264)]"
      )}
    >
      {/* Active indicator bar */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-white" />
      )}

      {Icon ? (
        <Icon className={cn("h-[18px] w-[18px] shrink-0", active ? "text-[var(--dc-text-primary)]" : "text-[var(--dc-text-channel)] group-hover:text-[oklch(0.78_0.006_264)]")} />
      ) : type === "voice" ? (
        <Volume2 className={cn("h-[18px] w-[18px] shrink-0", active ? "text-[var(--dc-text-primary)]" : "text-[var(--dc-text-channel)] group-hover:text-[oklch(0.78_0.006_264)]")} />
      ) : (
        <Hash className={cn("h-[18px] w-[18px] shrink-0", active ? "text-[var(--dc-text-primary)]" : "text-[var(--dc-text-channel)] group-hover:text-[oklch(0.78_0.006_264)]")} />
      )}
      <span className="truncate leading-snug">{label}</span>
    </Link>
  );
}

function SectionHeader({ label, onAdd }: { label: string; onAdd?: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 pt-5 pb-1 group">
      <button className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--dc-text-channel)] hover:text-[oklch(0.78_0.006_264)] transition-colors">
        <ChevronDown className="h-3 w-3" />
        {label}
      </button>
      {onAdd && (
        <button
          onClick={onAdd}
          className="h-4 w-4 text-[var(--dc-text-channel)] hover:text-[var(--dc-text-primary)] transition-colors opacity-0 group-hover:opacity-100"
          aria-label={`Add ${label}`}
        >
          <Plus className="h-full w-full" />
        </button>
      )}
    </div>
  );
}

/* Community sidebar */
function CommunitySidebar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const { data: community, isLoading } = useCommunity(slug);
  const basePath = `/communities/${slug}`;
  const isGeneralActive = pathname === basePath || pathname === `${basePath}/`;

  if (isLoading) {
    return (
      <div className="flex-1 p-3 space-y-2 animate-pulse">
        <div className="h-12 rounded-lg bg-[var(--dc-hover)] opacity-30" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 rounded-md bg-[var(--dc-hover)] opacity-20" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Community header with banner */}
      <div className="relative h-[72px] shrink-0 overflow-hidden">
        {community?.banner_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={community.banner_url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--dc-blurple)]/60 via-[oklch(0.50_0.22_290)]/40 to-[oklch(0.45_0.20_310)]/30" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--dc-channel-bg)]/80" />
        {/* Content */}
        <div className="relative flex h-full items-end justify-between px-4 pb-3">
          <div className="min-w-0">
            <p className="font-bold text-white text-[15px] leading-tight truncate drop-shadow-sm">
              {community?.name ?? slug}
            </p>
          </div>
          <ChevronDown className="h-4 w-4 text-white/70 shrink-0" />
        </div>
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto pb-2">
        {/* Text Channels */}
        <SectionHeader label="Text Channels" onAdd={() => {}} />
        <div className="space-y-0.5 mt-1">
          {TEXT_CHANNELS.map((ch) => {
            const isActive = ch.id === "general"
              ? isGeneralActive
              : pathname === `${basePath}/${ch.id}`;
            return (
              <ChannelItem
                key={ch.id}
                href={ch.id === "general" ? basePath : `${basePath}/${ch.id}`}
                label={ch.label}
                active={isActive}
                type="text"
              />
            );
          })}
        </div>

        {/* Voice Channels */}
        <SectionHeader label="Voice Channels" onAdd={() => {}} />
        <div className="space-y-0.5 mt-1">
          {VOICE_CHANNELS.map((ch) => (
            <ChannelItem
              key={ch.id}
              href="#"
              label={ch.label}
              active={false}
              type="voice"
            />
          ))}
        </div>

        {/* Moderator */}
        <SectionHeader label="Moderator" />
        <div className="space-y-0.5 mt-1">
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

/* Default sidebar */
function DefaultSidebar() {
  const pathname = usePathname();

  const mainItems = NAV_ITEMS.filter((i) => i.section === "main");
  const userItems = NAV_ITEMS.filter((i) => i.section === "user");

  return (
    <div className="flex flex-col h-full">
      {/* App name header */}
      <div className="flex h-14 items-center px-5 border-b border-[oklch(1_0_0/6%)] shrink-0 bg-gradient-to-r from-[var(--dc-channel-bg)] to-[oklch(0.23_0.006_264)]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[var(--dc-blurple)] flex items-center justify-center dc-glow-blurple">
            <Hash className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-[15px] text-[var(--dc-text-primary)] tracking-tight">
            Forum Diskusi
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Main section */}
        <div className="px-2 pt-1 pb-1">
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--dc-text-channel)]">
            Navigate
          </p>
          <div className="space-y-0.5">
            {mainItems.map((item) => {
              const isActive =
                item.href === "/post"
                  ? pathname === "/" || pathname.startsWith("/post")
                  : pathname.startsWith(item.href);
              return (
                <ChannelItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive}
                  icon={item.icon}
                  type="nav"
                />
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 my-2 h-px bg-[oklch(1_0_0/6%)]" />

        {/* User section */}
        <div className="px-2 pb-1">
          <p className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--dc-text-channel)]">
            Account
          </p>
          <div className="space-y-0.5">
            {userItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <ChannelItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={isActive}
                  icon={item.icon}
                  type="nav"
                />
              );
            })}
          </div>
        </div>
      </nav>

      <UserStatusBar />
    </div>
  );
}

export default function ChannelSidebar({ communitySlug }: { communitySlug?: string }) {
  return (
    <aside className="dc-channel-bg hidden lg:flex flex-col w-64 shrink-0 overflow-hidden shadow-xl shadow-black/20">
      {communitySlug ? (
        <CommunitySidebar slug={communitySlug} />
      ) : (
        <DefaultSidebar />
      )}
    </aside>
  );
}
