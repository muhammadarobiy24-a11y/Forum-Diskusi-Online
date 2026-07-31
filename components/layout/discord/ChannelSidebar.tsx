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
  Compass,
  Plus,
  Users,
  FileText,
  Shield,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCommunity } from "@/features/community/hooks/useCommunity";
import { useCommunities } from "@/features/community/hooks/useCommunities";
import UserStatusBar from "./UserStatusBar";

/* ─── Nav items ──────────────────────────────────────────── */
const NAV_MAIN = [
  { href: "/post",          label: "Beranda",       icon: Home      },
  { href: "/communities",   label: "Komunitas",     icon: Compass   },
  { href: "/categories",    label: "Kategori",      icon: LayoutGrid},
  { href: "/bookmarks",     label: "Tersimpan",     icon: Bookmark  },
  { href: "/notifications", label: "Notifikasi",    icon: Bell      },
];

const NAV_ACCOUNT = [
  { href: "/profile",  label: "Profil Saya", icon: User     },
  { href: "/settings", label: "Pengaturan",  icon: Settings },
];

/* ─── Generic nav link ───────────────────────────────────── */
function NavLink({
  href,
  label,
  icon: Icon,
  active,
  badge,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl mx-3 px-4 py-3 text-[15px] font-semibold transition-all duration-150",
        active
          ? "bg-[var(--forum-active)] text-white border border-[var(--forum-active-border)]"
          : "text-white/55 hover:text-white/90 hover:bg-[var(--forum-hover)] border border-transparent"
      )}
    >
      {/* Active left bar */}
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[24px] rounded-r-full"
          style={{
            background: "var(--forum-active-bar)",
            boxShadow: "0 0 8px var(--forum-active-bar)",
          }}
        />
      )}

      <Icon
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-colors",
          active ? "text-violet-400" : "text-white/35 group-hover:text-white/60"
        )}
      />
      <span className="truncate flex-1">{label}</span>
      {badge && badge > 0 ? (
        <span
          className="shrink-0 h-5 min-w-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
          style={{ background: "var(--forum-danger)" }}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </Link>
  );
}

/* ─── Section label ──────────────────────────────────────── */
function SectionLabel({
  label,
  action,
}: {
  label: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-2">
      <span className="text-[11px] font-bold uppercase tracking-widest text-white/35">
        {label}
      </span>
      {action}
    </div>
  );
}

/* ─── Community sidebar (saat di /communities/[slug]) ────── */
function CommunitySidebar({ slug }: { slug: string }) {
  const pathname = usePathname();
  const { data: community, isLoading } = useCommunity(slug);
  const basePath = `/communities/${slug}`;

  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-2.5 animate-pulse">
        <div className="h-20 rounded-2xl bg-white/5" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 rounded-xl bg-white/4" />
        ))}
      </div>
    );
  }

  const COMMUNITY_NAV = [
    { href: basePath,              label: "Diskusi",    icon: MessageCircle },
    { href: `${basePath}/members`, label: "Anggota",   icon: Users         },
    { href: `${basePath}/about`,   label: "Tentang",   icon: FileText      },
    { href: `${basePath}/settings`,label: "Pengaturan",icon: Shield        },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Community header card */}
      <div
        className="relative mx-3 mt-3 mb-1 rounded-2xl overflow-hidden shrink-0"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Banner */}
        <div className="h-16 w-full overflow-hidden relative">
          {community?.banner_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={community.banner_url}
              alt=""
              className="h-full w-full object-cover opacity-50"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-600/40 via-blue-500/25 to-transparent" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>

        {/* Icon + name */}
        <div className="flex items-center gap-3 px-4 pt-2 pb-3">
          <div
            className="-mt-5 h-10 w-10 rounded-xl border-2 overflow-hidden flex items-center justify-center text-base font-black text-white shrink-0 shadow-lg"
            style={{
              background: community?.icon_url
                ? undefined
                : "linear-gradient(135deg, #7c3aed, #3b82f6)",
              borderColor: "rgba(0,0,0,0.5)",
            }}
          >
            {community?.icon_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={community.icon_url}
                alt={community.name}
                className="h-full w-full object-cover"
              />
            ) : (
              (community?.name?.[0] ?? "?").toUpperCase()
            )}
          </div>
          <div className="min-w-0 -mt-1">
            <p className="text-sm font-bold text-white truncate leading-tight">
              {community?.name ?? slug}
            </p>
            <p className="text-[11px] text-white/40 truncate">
              {community?.member_count?.toLocaleString("id-ID") ?? "—"} anggota
            </p>
          </div>
        </div>
      </div>

      {/* Community nav */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5">
        <SectionLabel label="Navigasi" />
        {COMMUNITY_NAV.map(({ href, label, icon }) => (
          <NavLink
            key={href}
            href={href}
            label={label}
            icon={icon}
            active={
              href === basePath
                ? pathname === basePath || pathname === `${basePath}/`
                : pathname.startsWith(href)
            }
          />
        ))}

        <div className="forum-divider mx-4 mt-4" />

        {/* Back to all communities */}
        <div className="pt-2">
          <NavLink
            href="/communities"
            label="Semua Komunitas"
            icon={Compass}
            active={false}
          />
        </div>
      </nav>

      <UserStatusBar />
    </div>
  );
}

/* ─── Default sidebar ────────────────────────────────────── */
function DefaultSidebar() {
  const pathname = usePathname();
  const { data: communities } = useCommunities();

  return (
    <div className="flex flex-col h-full">
      {/* App brand */}
      <Link
        href="/post"
        className="flex items-center gap-3.5 px-5 h-[68px] shrink-0 border-b border-[var(--forum-sidebar-border)] hover:bg-[var(--forum-hover)] transition-colors"
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl shadow-lg shrink-0"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            boxShadow: "0 0 18px rgba(124,58,237,0.50)",
          }}
        >
          <MessageCircle className="h-5 w-5 text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[15px] font-black text-white tracking-tight leading-tight">
            Forum Diskusi
          </p>
          <p className="text-[11px] text-white/35 font-medium leading-tight">
            Community Platform
          </p>
        </div>
      </Link>

      {/* Scrollable nav area */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {/* Main navigation */}
        <SectionLabel label="Menu" />
        {NAV_MAIN.map((item) => {
          const isActive =
            item.href === "/post"
              ? pathname === "/" || pathname.startsWith("/post")
              : pathname.startsWith(item.href);
          return (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={isActive}
            />
          );
        })}

        <div className="forum-divider mx-4 mt-4" />

        {/* My Communities */}
        <SectionLabel
          label="Komunitas"
          action={
            <Link
              href="/communities/create"
              className="flex h-5 w-5 items-center justify-center rounded-lg text-white/35 hover:bg-white/10 hover:text-white transition-colors"
              title="Buat Komunitas"
            >
              <Plus className="h-3.5 w-3.5" />
            </Link>
          }
        />

        {communities && communities.length > 0 ? (
          communities.slice(0, 10).map((c) => {
            const href = `/communities/${c.slug}`;
            const isActive = pathname.startsWith(href);
            const initial = (c.name?.[0] ?? "?").toUpperCase();
            return (
              <Link
                key={c.id}
                href={href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl mx-3 px-4 py-2.5 text-[15px] font-semibold transition-all duration-150",
                  isActive
                    ? "bg-[var(--forum-active)] text-white border border-[var(--forum-active-border)]"
                    : "text-white/55 hover:text-white/90 hover:bg-[var(--forum-hover)] border border-transparent"
                )}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[20px] rounded-r-full"
                    style={{
                      background: "var(--forum-active-bar)",
                      boxShadow: "0 0 8px var(--forum-active-bar)",
                    }}
                  />
                )}
                <div
                  className="h-7 w-7 rounded-lg overflow-hidden flex items-center justify-center text-[11px] font-black text-white shrink-0"
                  style={{
                    background: isActive
                      ? "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(59,130,246,0.9))"
                      : "rgba(255,255,255,0.10)",
                    border: isActive
                      ? "1px solid rgba(167,139,250,0.4)"
                      : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {c.icon_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={c.icon_url} alt={c.name} className="h-full w-full object-cover" />
                  ) : (
                    initial
                  )}
                </div>
                <span className="truncate">{c.name}</span>
                {isActive && (
                  <ChevronRight className="h-3.5 w-3.5 ml-auto shrink-0 text-white/40" />
                )}
              </Link>
            );
          })
        ) : (
          <div className="mx-4 py-3 text-[12px] text-white/30 italic text-center">
            Belum ada komunitas
          </div>
        )}

        {communities && communities.length > 10 && (
          <Link
            href="/communities"
            className="flex items-center gap-2 mx-4 py-2 text-[12px] font-semibold text-white/40 hover:text-white/70 transition-colors"
          >
            <span>Lihat semua komunitas</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}

        <div className="forum-divider mx-4 mt-4" />

        {/* Account section */}
        <SectionLabel label="Akun" />
        {NAV_ACCOUNT.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            active={pathname.startsWith(item.href)}
          />
        ))}

        {/* Padding bottom */}
        <div className="h-2" />
      </nav>

      <UserStatusBar />
    </div>
  );
}

/* ─── Export ─────────────────────────────────────────────── */
export default function ChannelSidebar({
  communitySlug,
}: {
  communitySlug?: string;
}) {
  return (
    <aside
      className="hidden lg:flex flex-col w-72 shrink-0 overflow-hidden"
      style={{
        background: "var(--forum-sidebar-bg)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid var(--forum-sidebar-border)",
      }}
    >
      {communitySlug ? (
        <CommunitySidebar slug={communitySlug} />
      ) : (
        <DefaultSidebar />
      )}
    </aside>
  );
}
