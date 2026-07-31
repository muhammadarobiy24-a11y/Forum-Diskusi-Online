import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative min-h-screen overflow-hidden flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #0f0a1e 40%, #0a1020 100%)",
        fontFamily: "var(--font-nunito), Nunito, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Ambient glow orbs */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "-15%",
          left: "-10%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          opacity: 0.2,
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "-15%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          opacity: 0.18,
          filter: "blur(60px)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)",
          opacity: 0.08,
          filter: "blur(80px)",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Link href="/" className="group flex items-center gap-2.5">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl transition-transform group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                boxShadow: "0 0 30px rgba(124,58,237,0.5)",
              }}
            >
              <MessageCircle className="h-6 w-6 text-white" strokeWidth={2} />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              Forum Diskusi
            </span>
          </Link>
          <p className="text-xs font-medium text-white/40">
            Bergabunglah dengan percakapan komunitas
          </p>
        </div>

        {/* Frosted glass card */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            borderRadius: 24,
            padding: "2rem",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
