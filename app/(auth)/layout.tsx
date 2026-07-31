import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #faf9f6 0%, #f0edff 50%, #edf6ff 100%)",
        fontFamily: "var(--font-nunito), Nunito, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Pastel orbs */}
      <div className="pointer-events-none absolute" style={{ top: "-10%", left: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #ede9fe 0%, transparent 70%)", opacity: 0.7, filter: "blur(60px)" }} />
      <div className="pointer-events-none absolute" style={{ bottom: "-10%", right: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)", opacity: 0.6, filter: "blur(60px)" }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-[16px] transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)", boxShadow: "0 4px 20px rgba(124,58,237,0.35)" }}>
              <MessageCircle className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-black tracking-tight text-[var(--forum-text-primary)]">
              Forum Diskusi
            </span>
          </Link>
          <p className="text-xs font-semibold text-[var(--forum-text-muted)]">
            Bergabunglah dengan percakapan komunitas
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "#ffffff",
          border: "1px solid #e8e6f0",
          boxShadow: "0 8px 32px rgba(124,58,237,0.08), 0 2px 8px rgba(0,0,0,0.05)",
          borderRadius: 28,
          padding: "2rem",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
