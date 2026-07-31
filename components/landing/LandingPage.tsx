"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MessageCircle,
  Hash,
  Heart,
  Bookmark,
  Bell,
  Users,
  ArrowRight,
  Zap,
  TrendingUp,
  Menu,
  X,
  Star,
  Shield,
  Globe,
} from "lucide-react";

/* ─── Glassmorphism Card ─── */
function GlassCard({ children, className = "", style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{
      background: "#ffffff",
      border: "1px solid #e8e6f0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05), 0 8px 24px rgba(124,58,237,0.04)",
      borderRadius: 24,
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ─── Glow Orb ─── */
function Orb({
  color,
  size,
  top,
  left,
  opacity = 0.35,
}: {
  color: string;
  size: number;
  top?: string;
  left?: string;
  opacity?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        filter: "blur(40px)",
      }}
    />
  );
}

/* ─── data ─── */
const features = [
  {
    icon: MessageCircle,
    title: "Diskusi Real-time",
    desc: "Buat dan ikuti diskusi seru dengan ribuan anggota komunitas aktif.",
    color: "#a78bfa",
  },
  {
    icon: Hash,
    title: "Topik & Kategori",
    desc: "Temukan kategori favorit — teknologi, seni, sains, dan lainnya.",
    color: "#60a5fa",
  },
  {
    icon: Heart,
    title: "Saling Apresiasi",
    desc: "Berikan like untuk konten bermanfaat dari sesama anggota.",
    color: "#f472b6",
  },
  {
    icon: Bookmark,
    title: "Simpan Artikel",
    desc: "Bookmark postingan menarik dan baca ulang kapan pun kamu mau.",
    color: "#34d399",
  },
  {
    icon: Bell,
    title: "Notifikasi Cepat",
    desc: "Pemberitahuan real-time saat ada balasan atau aktivitas baru.",
    color: "#fbbf24",
  },
  {
    icon: Users,
    title: "Komunitas Server",
    desc: "Gabung komunitas Discord-style dengan channel khusus per topik.",
    color: "#a78bfa",
  },
];

const stats = [
  { value: "1K+", label: "Anggota", icon: Users },
  { value: "5K+", label: "Postingan", icon: MessageCircle },
  { value: "20+", label: "Kategori", icon: Hash },
  { value: "100%", label: "Gratis", icon: Star },
];

const testimonials = [
  {
    name: "Reza K.",
    role: "Software Developer",
    text: "Forum ini terasa modern dan cepat. Diskusinya berkualitas dan komunitas-nya sangat suportif!",
    avatar: "R",
    color: "#a78bfa",
  },
  {
    name: "Dinda S.",
    role: "UI/UX Designer",
    text: "Tampilannya bersih dan elegan banget. Gampang cari topik yang aku suka, navigasinya intuitif.",
    avatar: "D",
    color: "#60a5fa",
  },
  {
    name: "Fajar M.",
    role: "Mahasiswa",
    text: "Banyak ilmu yang aku dapat dari sini. Komunitasnya friendly dan selalu ada yang mau bantu!",
    avatar: "F",
    color: "#34d399",
  },
];

/* ─────────────────────────────────────────────── */
export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #faf9f6 0%, #f0edff 40%, #edf6ff 100%)",
        color: "var(--forum-text-primary)",
        fontFamily: "var(--font-nunito), Nunito, ui-sans-serif, system-ui, sans-serif",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Pastel ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <Orb color="#ede9fe" size={700} top="-10%" left="-15%" opacity={0.8} />
        <Orb color="#dbeafe" size={500} top="30%" left="60%" opacity={0.6} />
        <Orb color="#fce7f3" size={400} top="70%" left="10%" opacity={0.5} />
        <Orb color="#d1fae5" size={600} top="50%" left="40%" opacity={0.3} />
      </div>

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 px-4 py-3">
        <GlassCard className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6" style={{ borderRadius: 16 }}>
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", boxShadow: "0 0 20px rgba(124,58,237,0.5)" }}
            >
              <MessageCircle size={16} />
            </div>
            <span className="text-sm font-bold tracking-tight text-[var(--forum-text-primary)]">Forum Diskusi</span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {["Fitur", "Komunitas", "Tentang"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium text-[var(--forum-text-muted)] transition-colors hover:text-[var(--forum-text-primary)]"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-xl px-4 py-2 text-sm font-medium text-[var(--forum-text-secondary)] transition-colors hover:text-[var(--forum-text-primary)]"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                boxShadow: "0 0 20px rgba(124,58,237,0.4)",
              }}
            >
              Daftar Gratis
            </Link>
          </div>

          {/* Mobile */}
          <button
            className="rounded-xl p-2 text-[var(--forum-text-secondary)] hover:text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </GlassCard>

        {mobileOpen && (
          <GlassCard className="mx-auto mt-2 max-w-6xl p-4" style={{ borderRadius: 16 }}>
            <div className="flex flex-col gap-2">
              {["Fitur", "Komunitas", "Tentang"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--forum-text-secondary)] hover:bg-white/5 hover:text-[var(--forum-text-primary)]"
                >
                  {l}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Link href="/login" className="rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm font-medium text-[var(--forum-text-secondary)]">
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
                >
                  Daftar Gratis
                </Link>
              </div>
            </div>
          </GlassCard>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative px-4 pb-24 pt-16">
        <div className="mx-auto max-w-6xl text-center">

          {/* Badge */}
          <div className="mb-8 inline-flex">
            <GlassCard
              className="flex items-center gap-2 px-5 py-2"
              style={{ borderRadius: 999 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-violet-400" style={{ boxShadow: "0 0 8px #a78bfa" }} />
              <span className="text-xs font-semibold text-[var(--forum-text-secondary)]">Platform Diskusi Online Terbaik</span>
            </GlassCard>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-[var(--forum-text-primary)]">Tempat Diskusi</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Yang Bermakna
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-base font-medium leading-relaxed text-[var(--forum-text-muted)]">
            Bergabunglah dengan komunitas aktif. Bagikan ide, temukan inspirasi, dan terhubung dengan orang-orang yang memiliki minat yang sama.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                boxShadow: "0 0 40px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.4)",
              }}
            >
              Mulai Sekarang
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/post"
              className="flex items-center gap-2 rounded-2xl px-8 py-3.5 text-sm font-bold text-[var(--forum-text-secondary)] transition-all hover:text-[var(--forum-text-primary)]"
              style={{
                background: "#f5f4f0",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <TrendingUp size={16} />
              Lihat Diskusi
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {["R", "D", "F", "A", "B"].map((char, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold text-white"
                  style={{
                    borderColor: "#0d0d1a",
                    background: ["#7c3aed", "#3b82f6", "#a855f7", "#6366f1", "#8b5cf6"][i],
                    boxShadow: "0 0 10px rgba(124,58,237,0.4)",
                  }}
                >
                  {char}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-[var(--forum-text-muted)]">
              <span className="font-bold text-[var(--forum-text-primary)]">1,000+</span> orang sudah bergabung
            </p>
          </div>

          {/* Hero glass panel mockup */}
          <div className="mt-16 flex justify-center">
            <GlassCard className="w-full max-w-2xl overflow-hidden p-0" style={{ borderRadius: 28 }}>
              {/* Topbar */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400/70" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400/70" />
                  <div className="h-2 w-2 rounded-full bg-green-400/70" />
                </div>
                <div
                  className="rounded-lg px-4 py-1 text-xs text-[var(--forum-text-muted)]"
                  style={{ background: "#faf9f6" }}
                >
                  forum-diskusi.app
                </div>
                <div className="w-12" />
              </div>

              {/* Content mockup */}
              <div className="p-6 text-left">
                {/* Notification items */}
                {[
                  { dot: "#a78bfa", text: "Reza membalas postinganmu di # teknologi" },
                  { dot: "#60a5fa", text: "Dinda menyukai komentar-mu" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="mb-3 flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="h-2 w-2 rounded-full shrink-0" style={{ background: item.dot, boxShadow: `0 0 6px ${item.dot}` }} />
                    <span className="text-sm text-[var(--forum-text-muted)]">{item.text}</span>
                  </div>
                ))}

                {/* Input bar */}
                <div
                  className="mt-4 flex items-center gap-3 rounded-2xl px-5 py-4"
                  style={{
                    background: "#faf9f6",
                    border: "1px solid rgba(167,139,250,0.3)",
                    boxShadow: "0 0 20px rgba(124,58,237,0.1)",
                  }}
                >
                  <span className="flex-1 text-sm text-[var(--forum-text-muted)]">Tulis postingan baru...</span>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
                  >
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <GlassCard key={s.label} className="flex flex-col items-center p-7 text-center">
                <s.icon size={22} className="mb-3 text-violet-400" />
                <span className="text-3xl font-black text-white">{s.value}</span>
                <span className="mt-1 text-xs font-semibold text-[var(--forum-text-muted)]">{s.label}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="fitur" className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex">
              <GlassCard className="flex items-center gap-2 px-4 py-2" style={{ borderRadius: 999 }}>
                <Zap size={13} className="text-violet-400" />
                <span className="text-xs font-semibold text-[var(--forum-text-secondary)]">Fitur-fitur unggulan</span>
              </GlassCard>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-[var(--forum-text-primary)] sm:text-5xl">
              Semua yang kamu{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                butuhkan
              </span>
            </h2>
            <p className="mt-4 text-sm font-medium text-[var(--forum-text-muted)]">
              Dirancang untuk pengalaman diskusi yang nyaman, modern, dan menyenangkan.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <GlassCard
                key={f.title}
                className="group p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  cursor: "default",
                }}
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${f.color}18`,
                    border: `1px solid ${f.color}30`,
                    boxShadow: `0 0 20px ${f.color}20`,
                  }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <h3 className="mb-2 text-base font-bold text-[var(--forum-text-primary)]">{f.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-[var(--forum-text-muted)]">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community Section ── */}
      <section id="komunitas" className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <GlassCard className="overflow-hidden p-0">
            <div className="grid items-center lg:grid-cols-2">
              {/* Left */}
              <div className="p-10 lg:p-14">
                <div className="mb-5 inline-flex">
                  <GlassCard className="flex items-center gap-2 px-4 py-2" style={{ borderRadius: 999 }}>
                    <Globe size={13} className="text-blue-400" />
                    <span className="text-xs font-semibold text-[var(--forum-text-secondary)]">Discord-style Server</span>
                  </GlassCard>
                </div>
                <h2 className="mb-5 text-3xl font-black text-[var(--forum-text-primary)] leading-tight sm:text-4xl">
                  Server & Channel<br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    untuk setiap topik
                  </span>
                </h2>
                <p className="mb-8 text-sm font-medium leading-relaxed text-[var(--forum-text-muted)]">
                  Bergabung ke komunitas dengan channel-channel diskusi terorganisir. Rasakan pengalaman seperti Discord, tapi khusus untuk forum diskusi.
                </p>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                    boxShadow: "0 0 30px rgba(124,58,237,0.4)",
                  }}
                >
                  Gabung Komunitas
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Right — mock UI */}
              <div className="border-t border-white/5 p-10 lg:border-l lg:border-t-0">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">Text Channels</p>
                  {["# general", "# teknologi", "# desain", "# gaming"].map((ch, i) => (
                    <div
                      key={ch}
                      className="mb-1.5 flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors"
                      style={{
                        background: i === 0 ? "rgba(124,58,237,0.2)" : "transparent",
                        color: i === 0 ? "#a78bfa" : "rgba(255,255,255,0.35)",
                        borderLeft: i === 0 ? "2px solid #a78bfa" : "2px solid transparent",
                      }}
                    >
                      {ch}
                    </div>
                  ))}
                  <div
                    className="mt-4 rounded-xl p-3.5"
                    style={{ background: "#faf9f6", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex gap-2.5">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                        style={{ background: "#7c3aed" }}
                      >
                        R
                      </div>
                      <div>
                        <p className="text-xs font-bold text-violet-400">Reza K.</p>
                        <p className="text-xs text-[var(--forum-text-muted)]">Halo! Ada yang mau diskusi soal AI? 🤖</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="tentang" className="relative px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex">
              <GlassCard className="flex items-center gap-2 px-4 py-2" style={{ borderRadius: 999 }}>
                <Star size={13} className="text-yellow-400" />
                <span className="text-xs font-semibold text-[var(--forum-text-secondary)]">Kata mereka</span>
              </GlassCard>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-[var(--forum-text-primary)] sm:text-5xl">
              Dicintai oleh{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f472b6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                komunitas
              </span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {testimonials.map((t) => (
              <GlassCard key={t.name} className="flex flex-col justify-between p-7">
                {/* Stars */}
                <div className="mb-5 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-current text-yellow-400/80" />
                  ))}
                </div>
                <p className="mb-6 flex-1 text-sm font-medium leading-relaxed text-[var(--forum-text-muted)]">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{
                      background: `${t.color}30`,
                      border: `1px solid ${t.color}50`,
                      boxShadow: `0 0 15px ${t.color}30`,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--forum-text-primary)]">{t.name}</p>
                    <p className="text-xs font-medium text-[var(--forum-text-muted)]">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <GlassCard className="relative overflow-hidden px-10 py-16">
            {/* inner orb */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.2) 0%, transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="mb-5 inline-flex">
                <GlassCard className="flex items-center gap-2 px-4 py-2" style={{ borderRadius: 999 }}>
                  <Shield size={13} className="text-green-400" />
                  <span className="text-xs font-semibold text-[var(--forum-text-secondary)]">Gratis selamanya · Tanpa kartu kredit</span>
                </GlassCard>
              </div>
              <h2 className="mb-4 text-4xl font-black text-[var(--forum-text-primary)] sm:text-5xl">
                Siap Bergabung?
              </h2>
              <p className="mb-10 text-sm font-medium text-[var(--forum-text-muted)]">
                Buat akun sekarang dan mulai berdiskusi dalam hitungan detik.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                    boxShadow: "0 0 40px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  Daftar Sekarang — Gratis!
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/post"
                  className="flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-bold text-[var(--forum-text-secondary)] transition-all hover:text-[var(--forum-text-primary)]"
                  style={{
                    background: "#faf9f6",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <TrendingUp size={16} />
                  Jelajahi Dulu
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative px-4 pb-10">
        <div className="mx-auto max-w-6xl">
          <GlassCard className="flex flex-col items-center gap-6 p-7 text-center sm:flex-row sm:justify-between sm:text-left" style={{ borderRadius: 20 }}>
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", boxShadow: "0 0 15px rgba(124,58,237,0.4)" }}
              >
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--forum-text-primary)]">Forum Diskusi Online</p>
                <p className="text-xs text-[var(--forum-text-muted)]">Tempat ngobrol yang bermakna</p>
              </div>
            </div>

            <p className="text-xs font-medium text-[var(--forum-text-muted)]">
              © {new Date().getFullYear()} Forum Diskusi. Dibuat dengan ❤️
            </p>

            <div className="flex gap-2">
              {["Next.js", "TypeScript", "Supabase"].map((t) => (
                <span
                  key={t}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-[var(--forum-text-muted)]"
                  style={{ background: "#f5f4f0", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </footer>
    </div>
  );
}
