"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MessageSquare,
  Hash,
  ThumbsUp,
  Bookmark,
  Bell,
  User,
  Menu,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const features = [
  {
    icon: MessageSquare,
    title: "Diskusi",
    description:
      "Buat dan ikuti diskusi menarik dengan komunitas. Bagikan pendapat, pengalaman, dan ide Anda.",
  },
  {
    icon: Hash,
    title: "Kategori",
    description:
      "Temukan topik yang Anda minati dari berbagai kategori yang tersedia.",
  },
  {
    icon: ThumbsUp,
    title: "Like",
    description:
      "Tunjukkan apresiasi Anda terhadap postingan yang bermanfaat dan inspiratif.",
  },
  {
    icon: Bookmark,
    title: "Bookmark",
    description:
      "Simpan postingan favorit Anda untuk dibaca kembali kapan saja.",
  },
  {
    icon: Bell,
    title: "Notifikasi",
    description:
      "Dapatkan pemberitahuan real-time saat ada aktivitas baru yang melibatkan Anda.",
  },
  {
    icon: User,
    title: "Profil",
    description:
      "Personalisasi profil Anda dengan avatar, bio, dan informasi lainnya.",
  },
];

const navLinks = [
  { label: "Beranda", href: "#" },
  { label: "Fitur", href: "#features" },
  { label: "Tentang", href: "#about" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            <MessageSquare className="size-6" />
            <span>Online Forum</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost" })}
              >
                Masuk
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Daftar
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="border-t px-4 pb-4 pt-2 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="py-2 text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <Link
                  href="/login"
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full",
                  })}
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className={buttonVariants({ className: "w-full" })}
                >
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex min-h-[calc(100vh-4rem)] items-center px-4 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="size-4" />
            Platform Diskusi Online
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Tempat Diskusi
            <br />
            <span className="text-primary">Yang Bermakna</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
            Bergabunglah dengan komunitas diskusi yang aktif. Bagikan ide,
            temukan inspirasi, dan terhubung dengan orang-orang yang memiliki
            minat yang sama.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className={buttonVariants({ size: "lg" })}
            >
              Mulai Berdiskusi
              <ArrowRight className="size-4" />
            </Link>
            <button
              onClick={() => scrollTo("#features")}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Lihat Fitur
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold sm:text-4xl">
              Fitur Unggulan
            </h2>
            <p className="text-muted-foreground">
              Semua yang Anda butuhkan untuk diskusi yang produktif dan
              menyenangkan.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="border-t px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Tentang Online Forum
              </h2>
              <p className="mb-6 text-muted-foreground">
                Online Forum adalah platform diskusi online yang dibangun dengan
                teknologi modern untuk memberikan pengalaman terbaik bagi
                penggunanya.
              </p>
              <p className="mb-6 text-muted-foreground">
                Dengan antarmuka yang intuitif dan responsif, Anda dapat dengan
                mudah membuat postingan, memberikan komentar, dan berinteraksi
                dengan anggota komunitas lainnya.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Tailwind CSS", "Supabase"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="rounded-full border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "Gratis", label: "Selamanya" },
                { value: "Real-time", label: "Notifikasi" },
                { value: "Responsive", label: "Mobile-first" },
                { value: "Dark", label: "Mode Support" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-xl border bg-card p-6 text-center"
                >
                  <span className="text-2xl font-bold">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Siap Bergabung?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Buat akun sekarang dan mulai berdiskusi dengan komunitas kami.
            Gratis dan tidak perlu kartu kredit.
          </p>
          <Link
            href="/register"
            className={buttonVariants({ size: "lg" })}
          >
            Daftar Sekarang
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-4 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <MessageSquare className="size-4" />
            Online Forum
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Online Forum. All rights reserved.
          </p>
          <div className="flex gap-2">
            {["Next.js", "TypeScript", "Tailwind CSS", "Supabase"].map(
              (tech) => (
                <span
                  key={tech}
                  className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                >
                  {tech}
                </span>
              )
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
