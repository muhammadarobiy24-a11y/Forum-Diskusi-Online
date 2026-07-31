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
      <div className="flex flex-col h-full overflow-hidden relative">
        <ChannelHeader channelName="profile" channelDescription="Kelola informasi akun Anda" />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="h-16 w-16 mb-6 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
            <User className="h-8 w-8 text-white/30" />
          </div>
          <p className="text-xl font-bold text-white mb-2">Akses Terbatas</p>
          <p className="text-sm font-medium text-white/50">
            Silakan masuk dengan akun Anda untuk melihat halaman profil.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <ChannelHeader channelName="profile" channelDescription="Kelola informasi akun dan aktivitas" />
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8">
          
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="flex items-center justify-center h-10 w-10 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1))",
                  border: "1px solid rgba(124,58,237,0.2)",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.1)",
                }}
              >
                <User className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white leading-none">Profil Saya</h1>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/30 transition-all border border-red-500/20 shadow-[0_4px_15px_rgba(239,68,68,0.1)]"
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </button>
          </div>

          <div className="space-y-6 pb-20">
            {/* Profile Card Banner */}
            <ProfileCard userId={user.id} />

            {/* Stats Grid */}
            <ProfileStats userId={user.id} />

            {/* Activity Tabs */}
            <ProfileTabs userId={user.id} />
          </div>
          
        </div>
      </div>
    </div>
  );
}
