import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen gap-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #0f0a1e 40%, #0a1020 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "20%",
          left: "30%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          opacity: 0.12,
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl"
          style={{
            background: "rgba(124,58,237,0.1)",
            border: "1px solid rgba(124,58,237,0.2)",
            boxShadow: "0 0 30px rgba(124,58,237,0.2)",
          }}
        >
          <AlertCircle className="h-10 w-10 text-violet-400" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-7xl font-black text-white/10">404</h1>
          <h2 className="text-2xl font-bold text-white/90">Halaman Tidak Ditemukan</h2>
          <p className="text-sm font-medium text-white/40 max-w-xs mx-auto">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
        </div>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            boxShadow: "0 0 30px rgba(124,58,237,0.4), 0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
