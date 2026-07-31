"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/components/providers/SessionProvider";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/actions/auth/logout";
import { useColorTheme, type ColorTheme } from "@/components/providers/ColorThemeProvider";
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
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="h-16 w-16 mb-6 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10">
          <SettingsIcon className="h-8 w-8 text-white/30" />
        </div>
        <p className="text-xl font-bold text-white mb-2">Akses Terbatas</p>
        <p className="text-sm font-medium text-white/50">
          Silakan masuk terlebih dahulu untuk mengakses Pengaturan.
        </p>
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
    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden relative">
      {/* Settings Navigation Sidebar - Frosted Glass */}
      <div 
        className="w-full md:w-72 p-4 flex flex-col shrink-0 z-10"
        style={{
          background: "rgba(255,255,255,0.01)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-3 mb-8 px-2 mt-4">
          <div 
            className="flex items-center justify-center h-10 w-10 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(59,130,246,0.1))",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            <SettingsIcon className="h-5 w-5 text-violet-400" />
          </div>
          <h2 className="text-lg font-black text-white uppercase tracking-wider">Pengaturan</h2>
        </div>

        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? item.isDanger
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-white/10 text-white border border-white/10 shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
                    : item.isDanger
                    ? "text-red-400/70 hover:bg-red-500/10 hover:text-red-400 border border-transparent"
                    : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive && !item.isDanger ? "text-violet-400" : ""}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 scroll-smooth z-10">
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
          
          {/* TAB 1: AKUN SAYA */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">Akun Saya</h3>
                <p className="text-sm font-medium text-white/50">
                  Ringkasan identitas akun dan keamanan kata sandi Anda.
                </p>
              </div>

              {/* Profile Card Banner Preview */}
              <div 
                className="rounded-[32px] p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent pointer-events-none" />
                
                <div 
                  className="h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg border-2 border-[#0a1020]"
                  style={{ background: avatarUrl ? `url(${avatarUrl}) center/cover` : "linear-gradient(135deg, #7c3aed, #3b82f6)", color: "white" }}
                >
                  {!avatarUrl && initials}
                </div>

                <div className="min-w-0 flex-1 text-center sm:text-left relative z-10 mt-2 sm:mt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-center sm:justify-start">
                    <h4 className="text-2xl font-bold text-white truncate">{username}</h4>
                    <span 
                      className="inline-flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold text-violet-300 px-3 py-1 rounded-xl"
                      style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)" }}
                    >
                      <Shield className="h-3 w-3" />
                      {profile?.role || "user"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white/60 truncate mt-2">{user.email}</p>
                  <p className="text-[11px] text-white/30 font-mono mt-3 bg-white/5 inline-block px-3 py-1 rounded-lg border border-white/5">
                    ID: {user.id}
                  </p>
                </div>
              </div>

              {/* Password Change Form */}
              <div 
                className="rounded-[32px] p-8 space-y-6 shadow-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <Key className="h-5 w-5 text-violet-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Ubah Kata Sandi</h4>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
                      Kata Sandi Baru
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-white/5 border-white/10 text-white focus:border-violet-500/50 rounded-2xl h-12 px-4 shadow-inner"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
                      Konfirmasi Kata Sandi Baru
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-white/5 border-white/10 text-white focus:border-violet-500/50 rounded-2xl h-12 px-4 shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="flex items-center justify-center w-full gap-2 px-6 py-3.5 text-sm font-bold text-white transition-all rounded-2xl hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-[0_4px_20px_rgba(124,58,237,0.3)] mt-2"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", border: "1px solid rgba(255,255,255,0.2)" }}
                  >
                    {isUpdatingPassword ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <span>Perbarui Kata Sandi</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: EDIT PROFIL */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">Edit Profil</h3>
                <p className="text-sm font-medium text-white/50">
                  Perbarui foto profil, username, nama lengkap, dan bio publik Anda.
                </p>
              </div>

              {loadingProfile ? (
                <div className="h-[500px] w-full rounded-[32px] bg-white/5 animate-pulse" style={{ border: "1px solid rgba(255,255,255,0.05)" }} />
              ) : profile ? (
                <div 
                  className="rounded-[32px] p-8 space-y-8 shadow-2xl relative overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-violet-500/10 to-transparent pointer-events-none" />
                  
                  {/* Avatar Upload component */}
                  <div className="flex flex-col items-center justify-center pb-8 border-b border-white/5 relative z-10">
                    <AvatarUpload
                      userId={user.id}
                      currentAvatarUrl={profile.avatar_url}
                      username={profile.username}
                      onAvatarUpdate={(url) => {
                        queryClient.setQueryData(["profile", user.id], {
                          ...profile,
                          avatar_url: url,
                        });
                        toast.success("Foto profil diperbarui");
                      }}
                    />
                  </div>

                  {/* Edit Form */}
                  <div className="relative z-10">
                    <EditProfileForm
                      profile={profile}
                      onSuccess={() => {
                        queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
                        toast.success("Profil berhasil disimpan");
                      }}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 3: TAMPILAN & TEMA */}
          {activeTab === "appearance" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">Tampilan & Tema</h3>
                <p className="text-sm font-medium text-white/50">
                  Sesuaikan gaya visual dan tema antarmuka forum diskusimu.
                </p>
              </div>

              <div 
                className="rounded-[32px] p-8 space-y-6 shadow-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Palette className="h-5 w-5 text-blue-400" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Pilihan Warna Tema</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "frosted", label: "Frosted Glass", color: "bg-[#0f0a1e]", border: "border-violet-500" },
                    { id: "midnight", label: "Midnight Blue", color: "bg-blue-950", border: "border-blue-500" },
                    { id: "slate", label: "Dark Slate", color: "bg-emerald-950", border: "border-emerald-500" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setColorTheme(t.id as ColorTheme);
                        toast.info(`Tema diubah ke ${t.label}`);
                      }}
                      className={`p-5 rounded-[24px] border-2 text-left flex items-center justify-between transition-all duration-300 group ${
                        colorTheme === t.id
                          ? `${t.border} bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] scale-[1.02]`
                          : "border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-8 w-8 rounded-full ${t.color} border-2 border-white/20 shadow-inner`} />
                        <span className="text-sm font-bold text-white">{t.label}</span>
                      </div>
                      <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        colorTheme === t.id ? t.border : "border-white/10 group-hover:border-white/30"
                      }`}>
                         {colorTheme === t.id && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFIKASI */}
          {activeTab === "notifications" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">Notifikasi</h3>
                <p className="text-sm font-medium text-white/50">
                  Atur pemberitahuan apa saja yang ingin Anda terima.
                </p>
              </div>

              <div 
                className="rounded-[32px] p-6 sm:p-8 space-y-4 shadow-2xl relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {[
                  {
                    title: "Notifikasi Dalam Aplikasi",
                    desc: "Tampilkan lencana dan pemberitahuan di dalam platform.",
                    state: appNotif,
                    setState: setAppNotif,
                  },
                  {
                    title: "Notifikasi Email",
                    desc: "Kirimkan ringkasan aktivitas penting ke email Anda.",
                    state: emailNotif,
                    setState: setEmailNotif,
                  },
                  {
                    title: "Sebutan (Mention)",
                    desc: "Beritahu saya saat seseorang menyebut username saya.",
                    state: mentionNotif,
                    setState: setMentionNotif,
                  },
                ].map((n, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-5 rounded-[20px] transition-colors border border-transparent hover:border-white/5 hover:bg-white/[0.03]"
                  >
                    <div className="pr-4">
                      <h4 className="text-base font-bold text-white/90 mb-1">{n.title}</h4>
                      <p className="text-xs font-medium text-white/50 leading-relaxed max-w-sm">{n.desc}</p>
                    </div>

                    <button
                      onClick={() => {
                        n.setState(!n.state);
                        toast.success("Pengaturan notifikasi disimpan");
                      }}
                      className={`w-14 h-8 rounded-full transition-all duration-300 relative shrink-0 border ${
                        n.state 
                          ? "bg-violet-500 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]" 
                          : "bg-white/10 border-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-300 shadow-md ${
                          n.state ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: KEAMANAN & LOGOUT */}
          {activeTab === "security" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-3xl font-black text-white tracking-tight mb-2">Sesi Akun</h3>
                <p className="text-sm font-medium text-white/50">
                  Kelola sesi login dan akses akun Anda.
                </p>
              </div>

              {/* Log Out Danger Box */}
              <div 
                className="rounded-[32px] p-8 space-y-6 shadow-2xl relative overflow-hidden"
                style={{
                  background: "rgba(239,68,68,0.05)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(239,68,68,0.15)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent pointer-events-none" />

                <div className="flex sm:items-start gap-4 text-red-400 relative z-10">
                  <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 shrink-0">
                    <LogOut className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Keluar dari Akun (Log Out)</h4>
                    <p className="text-sm font-medium text-white/60 leading-relaxed">
                      Tindakan ini akan mengakhiri sesi aktif Anda di perangkat ini. Anda perlu masuk kembali untuk mengakses akun.
                    </p>
                  </div>
                </div>

                <div className="pt-4 relative z-10">
                  <button
                    onClick={() => logout()}
                    className="flex items-center justify-center gap-2 px-6 py-4 w-full sm:w-auto text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-2xl transition-all shadow-[0_8px_25px_rgba(239,68,68,0.3)] hover:scale-105"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Ya, Keluar Akun Sekarang</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
