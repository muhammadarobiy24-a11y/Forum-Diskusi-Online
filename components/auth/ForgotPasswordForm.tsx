"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, ArrowRight, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/schemas/forgot-password-schema";
import { forgotPassword as forgotPasswordAction } from "@/app/actions/auth/forgot-password";

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
export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true);
    try {
      const result = await forgotPasswordAction(data);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(result.success);
        setIsSubmitted(true);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: "rgba(52,211,153,0.1)",
            border: "1px solid rgba(52,211,153,0.2)",
            boxShadow: "0 0 20px rgba(52,211,153,0.1)",
          }}
        >
          <Send className="h-8 w-8" style={{ color: "rgba(52,211,153,0.9)" }} />
        </div>
        
        <div>
          <h2 className="text-xl font-black text-white/90">Email Terkirim!</h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-white/50">
            Kami telah mengirimkan tautan pemulihan kata sandi ke email Anda. Silakan periksa kotak masuk (atau folder spam).
          </p>
        </div>

        <Link
          href="/login"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          <ArrowLeft size={16} />
          Kembali ke Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-black text-white/90">Lupa Kata Sandi?</h1>
        <p className="mt-1 text-xs font-medium text-white/40">
          Masukkan email Anda untuk menerima tautan pemulihan
        </p>
      </div>

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
            Mengirim tautan...
          </>
        ) : (
          <>
            Kirim Tautan Pemulihan
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

      {/* Login link */}
      <p className="text-center text-xs font-medium text-white/40">
        Ingat kata sandi Anda?{" "}
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
