"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/components/providers/SessionProvider";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/actions/auth/logout";
import { useColorTheme, type ColorTheme } from "@/components/providers/ColorThemeProvider";
import ChannelHeader from "@/components/layout/discord/ChannelHeader";
import AvatarUpload from "@/components/profile/AvatarUpload";
import EditProfileForm from "@/components/profile/EditProfileForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  User,
  Settings as SettingsIcon,
  Shield,
  Key,
  Palette,
  Bell,
  LogOut,
  Check,
  Loader2,
  Lock,
  Sparkles,
} from "lucide-react";
import type { Profile } from "@/types";

export default function SettingsPage() {
  const { user } = useSession();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"account" | "profile" | "appearance" | "notifications" | "security">("account");

  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const { colorTheme, setColorTheme } = useColorTheme();
  
  // Notification states
  const [emailNotif, setEmailNotif] = useState(true);
  const [appNotif, setAppNotif] = useState(true);
  const [mentionNotif, setMentionNotif] = useState(true);

  // Profile data query
  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user,
  });

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast.error("Kata sandi minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi kata sandi tidak cocok.");
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast.success("Kata sandi berhasil diperbarui!");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Gagal memperbarui kata sandi.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ChannelHeader />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="h-16 w-16 mb-6 rounded-[28px] flex items-center justify-center"
            style={{ background: "#f0edff", border: "1px solid #d4caff" }}>
            <SettingsIcon className="h-8 w-8 text-violet-400" />
          </div>
          <p className="text-xl font-bold text-[var(--forum-text-primary)] mb-2">Akses Terbatas</p>
          <p className="text-sm text-[var(--forum-text-muted)]">
            Silakan masuk terlebih dahulu untuk mengakses Pengaturan.
          </p>
        </div>
      </div>
    );
  }

  const username = profile?.username || user.email?.split("@")[0] || "User";
  const avatarUrl = profile?.avatar_url || (user.user_metadata?.avatar_url as string);
  const initials = username.slice(0, 2).toUpperCase();

  const navItems = [
    { id: "account", label: "Akun Saya", icon: User },
    { id: "profile", label: "Edit Profil", icon: Sparkles },
    { id: "appearance", label: "Tampilan & Tema", icon: Palette },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "security", label: "Keamanan & Logout", icon: Lock, isDanger: true },
  ];

  return (
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
      {/* Settings nav sidebar */}
      <div
        className="w-full md:w-72 p-4 flex flex-col shrink-0"
        style={{ background: "#f5f4f0", borderRight: "1px solid #e5e3de" }}
      >
        <div className="flex items-center gap-3 mb-6 px-2 mt-3">
          <div className="flex items-center justify-center h-9 w-9 rounded-[16px]"
            style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
            <SettingsIcon className="h-5 w-5 text-violet-500" />
          </div>
          <h2 className="text-base font-black text-[var(--forum-text-primary)] uppercase tracking-wider">Pengaturan</h2>
        </div>

        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[20px] text-sm font-bold transition-all duration-200 border ${
                  isActive
                    ? item.isDanger
                      ? "bg-red-50 text-red-500 border-red-200"
                      : "bg-[var(--forum-active)] text-[var(--forum-active-bar)] border-[var(--forum-active-border)]"
                    : item.isDanger
                    ? "text-red-400 hover:bg-red-50 border-transparent"
                    : "text-[var(--forum-text-secondary)] hover:bg-[var(--forum-hover)] border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive && !item.isDanger ? "text-violet-500" : ""}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-4 pb-12">
          
          {activeTab === "account" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-[28px] p-5"
                style={{ background: "#f0edff", border: "1px solid #d4caff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 className="text-xl font-black text-[var(--forum-text-primary)] mb-1">Akun Saya</h3>
                <p className="text-sm text-[var(--forum-text-muted)]">Ringkasan identitas akun dan keamanan kata sandi.</p>
              </div>

              {/* Profile preview */}
              <div className="rounded-[28px] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5"
                style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0"
                  style={{ background: avatarUrl ? `url(${avatarUrl}) center/cover` : "linear-gradient(135deg, #7c3aed, #3b82f6)" }}>
                  {!avatarUrl && initials}
                </div>
                <div className="min-w-0 flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start mb-1">
                    <h4 className="text-lg font-bold text-[var(--forum-text-primary)] truncate">{username}</h4>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold text-violet-600 px-2.5 py-0.5 rounded-full"
                      style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
                      <Shield className="h-2.5 w-2.5" />{profile?.role || "user"}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--forum-text-secondary)] truncate">{user.email}</p>
                  <p className="text-[11px] text-[var(--forum-text-muted)] font-mono mt-2 px-2.5 py-1 rounded-full inline-block"
                    style={{ background: "#f3f2ef", border: "1px solid #e5e3de" }}>
                    ID: {user.id}
                  </p>
                </div>
              </div>

              {/* Password form */}
              <div className="rounded-[28px] p-6"
                style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
                  <div className="p-2 rounded-[14px]" style={{ background: "#ede9fe", border: "1px solid #d4caff" }}>
                    <Key className="h-4 w-4 text-violet-500" />
                  </div>
                  <h4 className="text-base font-bold text-[var(--forum-text-primary)]">Ubah Kata Sandi</h4>
                </div>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Kata Sandi Baru</label>
                    <Input type="password" placeholder="••••••••" value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="rounded-[16px] h-11 border-gray-200 focus:border-violet-400" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Konfirmasi Kata Sandi Baru</label>
                    <Input type="password" placeholder="••••••••" value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-[16px] h-11 border-gray-200 focus:border-violet-400" />
                  </div>
                  <button type="submit" disabled={isUpdatingPassword}
                    className="forum-btn-accent w-full py-3 rounded-full text-sm font-bold disabled:opacity-50 mt-2">
                    {isUpdatingPassword ? <><Loader2 className="h-4 w-4 animate-spin inline mr-2" />Menyimpan...</> : "Perbarui Kata Sandi"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-[28px] p-5"
                style={{ background: "#edfff5", border: "1px solid #b6f5d3", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 className="text-xl font-black text-[var(--forum-text-primary)] mb-1">Edit Profil</h3>
                <p className="text-sm text-[var(--forum-text-muted)]">Perbarui foto profil, username, nama, dan bio publik Anda.</p>
              </div>
              {loadingProfile ? (
                <div className="h-64 rounded-[28px] bg-gray-100 animate-pulse" />
              ) : profile ? (
                <div className="rounded-[28px] p-6"
                  style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                  <div className="flex flex-col items-center pb-6 border-b border-gray-100 mb-6">
                    <AvatarUpload userId={user.id} currentAvatarUrl={profile.avatar_url} username={profile.username}
                      onAvatarUpdate={(url) => {
                        queryClient.setQueryData(["profile", user.id], { ...profile, avatar_url: url });
                        toast.success("Foto profil diperbarui");
                      }} />
                  </div>
                  <EditProfileForm profile={profile} onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
                    toast.success("Profil berhasil disimpan");
                  }} />
                </div>
              ) : null}
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-[28px] p-5"
                style={{ background: "#edf6ff", border: "1px solid #b3d9ff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 className="text-xl font-black text-[var(--forum-text-primary)] mb-1">Tampilan & Tema</h3>
                <p className="text-sm text-[var(--forum-text-muted)]">Sesuaikan gaya visual antarmuka forum diskusimu.</p>
              </div>
              <div className="rounded-[28px] p-6"
                style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5">
                  <div className="p-2 rounded-[14px]" style={{ background: "#dbeafe", border: "1px solid #b3d9ff" }}>
                    <Palette className="h-4 w-4 text-blue-500" />
                  </div>
                  <h4 className="text-base font-bold text-[var(--forum-text-primary)]">Pilihan Warna Tema</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "frosted", label: "Frosted Glass", color: "#0f0a1e", accentColor: "#7c3aed" },
                    { id: "midnight", label: "Midnight Blue", color: "#020d28", accentColor: "#1d4ed8" },
                    { id: "slate", label: "Forest Dark", color: "#0a150a", accentColor: "#059669" },
                  ].map((t) => {
                    const isActive = colorTheme === t.id;
                    return (
                      <button key={t.id} onClick={() => { setColorTheme(t.id as ColorTheme); toast.info(`Tema: ${t.label}`); }}
                        className={`p-4 rounded-[20px] border-2 text-left flex items-center justify-between transition-all duration-200 ${
                          isActive ? "border-violet-400 bg-[#f0edff]" : "border-gray-200 bg-gray-50 hover:border-gray-300"
                        }`}>
                        <div className="flex items-center gap-3">
                          <div className="h-7 w-7 rounded-full border-2 border-white/20 shadow-inner"
                            style={{ background: t.color }} />
                          <span className="text-sm font-bold text-[var(--forum-text-primary)]">{t.label}</span>
                        </div>
                        <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${isActive ? "border-violet-500 bg-violet-500" : "border-gray-300"}`}>
                          {isActive && <Check className="h-3 w-3 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-[28px] p-5"
                style={{ background: "#fff4ed", border: "1px solid #ffd5b4", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 className="text-xl font-black text-[var(--forum-text-primary)] mb-1">Notifikasi</h3>
                <p className="text-sm text-[var(--forum-text-muted)]">Atur pemberitahuan apa saja yang ingin Anda terima.</p>
              </div>
              <div className="rounded-[28px] overflow-hidden"
                style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                {[
                  { title: "Notifikasi Dalam Aplikasi", desc: "Tampilkan lencana di dalam platform.", state: appNotif, setState: setAppNotif },
                  { title: "Notifikasi Email", desc: "Kirimkan ringkasan ke email Anda.", state: emailNotif, setState: setEmailNotif },
                  { title: "Sebutan (Mention)", desc: "Beritahu saat username saya disebut.", state: mentionNotif, setState: setMentionNotif },
                ].map((n, idx) => (
                  <div key={idx} className={`flex items-center justify-between px-6 py-5 ${idx < 2 ? "border-b border-gray-100" : ""}`}>
                    <div className="pr-4">
                      <h4 className="text-sm font-bold text-[var(--forum-text-primary)] mb-0.5">{n.title}</h4>
                      <p className="text-xs text-[var(--forum-text-muted)]">{n.desc}</p>
                    </div>
                    <button onClick={() => { n.setState(!n.state); toast.success("Tersimpan"); }}
                      className={`w-12 h-7 rounded-full transition-all duration-300 relative shrink-0 ${n.state ? "bg-violet-500" : "bg-gray-200"}`}>
                      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${n.state ? "left-6" : "left-1"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-[28px] p-5"
                style={{ background: "#fff0f0", border: "1px solid #fecaca", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <h3 className="text-xl font-black text-[var(--forum-text-primary)] mb-1">Keamanan & Logout</h3>
                <p className="text-sm text-[var(--forum-text-muted)]">Kelola sesi login dan akses akun Anda.</p>
              </div>
              <div className="rounded-[28px] p-6"
                style={{ background: "#fff0f0", border: "1px solid #fecaca", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-2.5 rounded-[16px]" style={{ background: "#fee2e2", border: "1px solid #fecaca" }}>
                    <LogOut className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[var(--forum-text-primary)] mb-1">Keluar dari Akun</h4>
                    <p className="text-sm text-[var(--forum-text-secondary)] leading-relaxed">
                      Tindakan ini akan mengakhiri sesi aktif Anda. Anda perlu masuk kembali untuk mengakses akun.
                    </p>
                  </div>
                </div>
                <button onClick={() => logout()}
                  className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-all"
                  style={{ boxShadow: "0 4px 16px rgba(239,68,68,0.3)" }}>
                  <LogOut className="h-4 w-4" />
                  Ya, Keluar Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
