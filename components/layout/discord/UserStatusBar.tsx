"use client";

import Link from "next/link";
import { Settings, LogOut, User, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useSession } from "@/components/providers/SessionProvider";
import { logout } from "@/app/actions/auth/logout";

export default function UserStatusBar() {
  const { user } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  const username =
    (user.user_metadata?.username as string) ||
    user.email?.split("@")[0] ||
    "User";
  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div
      className="relative shrink-0 border-t"
      style={{ borderColor: "var(--forum-sidebar-border)" }}
    >
      {/* Popup menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="absolute bottom-full left-2 right-2 mb-2 rounded-2xl py-1.5 z-40 shadow-2xl"
            style={{
              background: "rgba(15,10,30,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            {/* User header */}
            <div
              className="flex items-center gap-2.5 px-4 py-3 mx-1.5 mb-1 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="h-9 w-9 rounded-xl overflow-hidden flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{
                  background: avatarUrl
                    ? undefined
                    : "linear-gradient(135deg, #7c3aed, #3b82f6)",
                  backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!avatarUrl && initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">
                  {username}
                </p>
                <p className="text-[11px] text-white/40 truncate leading-tight">
                  {user.email}
                </p>
              </div>
            </div>

            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 mx-1.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white hover:bg-white/8 transition-colors"
            >
              <User className="h-4 w-4 text-white/40" />
              Profil Saya
            </Link>

            <Link
              href="/settings"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 mx-1.5 rounded-xl text-sm font-semibold text-white/70 hover:text-white hover:bg-white/8 transition-colors"
            >
              <Settings className="h-4 w-4 text-white/40" />
              Pengaturan
            </Link>

            <div className="forum-divider mx-3 my-1.5" />

            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              className="flex items-center gap-2.5 px-4 py-2.5 mx-1.5 w-[calc(100%-12px)] rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/15 hover:text-red-300 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>
        </>
      )}

      {/* User card */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2.5 w-full px-3 py-3 text-left hover:bg-[var(--forum-hover)] transition-colors group"
      >
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className="h-8 w-8 rounded-xl overflow-hidden flex items-center justify-center text-xs font-bold text-white"
            style={{
              background: avatarUrl
                ? undefined
                : "linear-gradient(135deg, #7c3aed, #3b82f6)",
              backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!avatarUrl && initials}
          </div>
          {/* Online dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2"
            style={{
              background: "var(--forum-online)",
              boxShadow: "0 0 5px var(--forum-online)",
              borderColor: "transparent",
            }}
          />
        </div>

        {/* Name + status */}
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-bold text-white/85 truncate leading-tight group-hover:text-white transition-colors">
            {username}
          </p>
          <p className="text-[11px] text-white/35 leading-tight flex items-center gap-1">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--forum-online)" }}
            />
            Online
          </p>
        </div>

        <ChevronUp
          className={`h-3.5 w-3.5 text-white/30 shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
