"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { type LoginInput, loginSchema } from "@/schemas/login-schema";
import { login as loginAction } from "@/app/actions/auth/login";

/* ── Frosted Input ── */
function FrostedInput({
  id,
  type,
  placeholder,
  icon: Icon,
  disabled,
  error,
  registration,
}: {
  id: string;
  type: string;
  placeholder: string;
  icon: React.ElementType;
  disabled?: boolean;
  error?: string;
  registration: object;
}) {
  return (
    <div className="space-y-1.5">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon size={15} style={{ color: "rgba(167,139,250,0.6)" }} />
        </div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...registration}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: error
              ? "1px solid rgba(248,113,113,0.5)"
              : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: "0.75rem 1rem 0.75rem 2.75rem",
            color: "rgba(255,255,255,0.85)",
            fontSize: "0.875rem",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? "rgba(248,113,113,0.5)"
              : "rgba(255,255,255,0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>
      {error && (
        <p className="text-xs font-medium" style={{ color: "rgba(248,113,113,0.9)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────── */
export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const registered = searchParams.get("registered");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      const result = await loginAction(data, redirectTo || undefined);
      if (result?.error) {
        toast.error(result.error);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-black text-white/90">Selamat Datang Kembali</h1>
        <p className="mt-1 text-xs font-medium text-white/40">
          Masukkan akun Anda untuk melanjutkan
        </p>
      </div>

      {/* Success banner */}
      {registered && (
        <div
          className="rounded-xl p-3 text-xs font-semibold"
          style={{
            background: "rgba(52,211,153,0.1)",
            border: "1px solid rgba(52,211,153,0.25)",
            color: "rgba(52,211,153,0.9)",
          }}
        >
          ✓ Akun berhasil dibuat! Silakan masuk.
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-semibold text-white/50 tracking-wide uppercase">
          Email
        </label>
        <FrostedInput
          id="email"
          type="email"
          placeholder="nama@email.com"
          icon={Mail}
          disabled={isLoading}
          error={errors.email?.message}
          registration={register("email")}
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-xs font-semibold text-white/50 tracking-wide uppercase">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-semibold transition-colors"
            style={{ color: "rgba(167,139,250,0.7)" }}
          >
            Lupa password?
          </Link>
        </div>
        <FrostedInput
          id="password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          disabled={isLoading}
          error={errors.password?.message}
          registration={register("password")}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        style={{
          background: isLoading
            ? "rgba(124,58,237,0.5)"
            : "linear-gradient(135deg, #7c3aed, #3b82f6)",
          boxShadow: isLoading
            ? "none"
            : "0 0 30px rgba(124,58,237,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Masuk...
          </>
        ) : (
          <>
            Masuk
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span className="text-xs font-medium text-white/30">atau</span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Register link */}
      <p className="text-center text-xs font-medium text-white/40">
        Belum punya akun?{" "}
        <Link
          href="/register"
          className="font-bold transition-colors hover:text-white"
          style={{ color: "rgba(167,139,250,0.8)" }}
        >
          Daftar sekarang
        </Link>
      </p>
    </form>
  );
}
