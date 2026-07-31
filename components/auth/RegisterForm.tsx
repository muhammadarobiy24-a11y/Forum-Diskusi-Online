"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  registerSchema,
  type RegisterInput,
} from "@/schemas/register-schema";
import { register as registerAction } from "@/app/actions/auth/register";

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
export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);
    try {
      const result = await registerAction(data);
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-black text-white/90">Buat Akun Baru</h1>
        <p className="mt-1 text-xs font-medium text-white/40">
          Bergabunglah dengan komunitas forum kami
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Email */}
        <div className="space-y-1.5 sm:col-span-2">
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

        {/* Username */}
        <div className="space-y-1.5 sm:col-span-2">
          <label htmlFor="username" className="block text-xs font-semibold text-white/50 tracking-wide uppercase">
            Username
          </label>
          <FrostedInput
            id="username"
            type="text"
            placeholder="johndoe"
            icon={User}
            disabled={isLoading}
            error={errors.username?.message}
            registration={register("username")}
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="password" className="block text-xs font-semibold text-white/50 tracking-wide uppercase">
            Password
          </label>
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

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="block text-xs font-semibold text-white/50 tracking-wide uppercase">
            Konfirmasi Password
          </label>
          <FrostedInput
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            disabled={isLoading}
            error={errors.confirmPassword?.message}
            registration={register("confirmPassword")}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
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
            Membuat akun...
          </>
        ) : (
          <>
            Daftar Sekarang
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
        <span className="text-xs font-medium text-white/30">atau</span>
        <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Login link */}
      <p className="text-center text-xs font-medium text-white/40">
        Sudah punya akun?{" "}
        <Link
          href="/login"
          className="font-bold transition-colors hover:text-white"
          style={{ color: "rgba(167,139,250,0.8)" }}
        >
          Masuk di sini
        </Link>
      </p>
    </form>
  );
}
