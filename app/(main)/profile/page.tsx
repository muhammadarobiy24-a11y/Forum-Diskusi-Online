"use client";

import { useSession } from "@/components/providers/SessionProvider";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileTabs from "@/components/profile/ProfileTabs";
import { User, LogOut } from "lucide-react";
import { logout } from "@/app/actions/auth/logout";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";

export default function ProfilePage() {
  const { user } = useSession();

  if (!user) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="h-16 w-16 mb-6 rounded-[28px] flex items-center justify-center"
            style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
            <User className="h-8 w-8 text-violet-400" />
          </div>
          <p className="text-xl font-bold text-[var(--forum-text-primary)] mb-2">Akses Terbatas</p>
          <p className="text-sm text-[var(--forum-text-muted)]">
            Silakan masuk dengan akun Anda untuk melihat halaman profil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ChannelHeader />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-4 xl:px-6 xl:py-6 flex flex-col gap-4">

          {/* Hero card */}
          <div className="rounded-[28px] p-5"
            style={{ background: "#f0edff", border: "1px solid #d4caff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-[16px] flex items-center justify-center shrink-0"
                  style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
                  <User className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-[var(--forum-text-primary)] tracking-tight">Profil Saya</h1>
                  <p className="text-sm text-[var(--forum-text-muted)]">Kelola informasi akun dan aktivitas</p>
                </div>
              </div>
              <button
                onClick={() => logout()}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-red-500 hover:bg-red-50 transition-all border border-red-200"
              >
                <LogOut className="h-4 w-4" />
                Keluar
              </button>
            </div>
          </div>

          {/* Profile card */}
          <div className="rounded-[28px] p-5 sm:p-6"
            style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <ProfileCard userId={user.id} />
          </div>

          {/* Stats card */}
          <div className="rounded-[28px] p-5 sm:p-6"
            style={{ background: "#fff4ed", border: "1px solid #ffd5b4", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <ProfileStats userId={user.id} />
          </div>

          {/* Tabs card */}
          <div className="rounded-[28px] p-5 sm:p-6 mb-8"
            style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <ProfileTabs userId={user.id} />
          </div>

        </div>
      </div>
    </div>
  );
}
