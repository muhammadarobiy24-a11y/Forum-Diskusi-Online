"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, ArrowRight, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/schemas/forgot-password-schema";
import { forgotPassword as forgotPasswordAction } from "@/app/actions/auth/forgot-password";

function AuthInput({ id, type, placeholder, icon: Icon, disabled, error, registration }: {
  id: string; type: string; placeholder: string; icon: React.ElementType;
  disabled?: boolean; error?: string; registration: object;
}) {
  return (
    <div className="space-y-1.5">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Icon size={15} className="text-violet-400" />
        </div>
        <input id={id} type={type} placeholder={placeholder} disabled={disabled} {...registration}
          className="w-full text-sm text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] outline-none transition-all disabled:opacity-50"
          style={{ background: "#f5f4f0", border: error ? "1.5px solid #f87171" : "1.5px solid #e5e3de", borderRadius: 14, padding: "0.75rem 1rem 0.75rem 2.75rem" }}
          onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)"; e.currentTarget.style.background = "#fff"; }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? "#f87171" : "#e5e3de"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#f5f4f0"; }}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
}

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data: ForgotPasswordInput) {
    setIsLoading(true);
    try {
      const result = await forgotPasswordAction(data);
      if (result?.error) toast.error(result.error);
      else if (result?.success) { toast.success(result.success); setIsSubmitted(true); }
    } catch { toast.error("Terjadi kesalahan."); }
    finally { setIsLoading(false); }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[20px]"
          style={{ background: "#edfff5", border: "1px solid #b6f5d3" }}>
          <Send className="h-8 w-8 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xl font-black text-[var(--forum-text-primary)]">Email Terkirim!</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--forum-text-muted)]">
            Kami telah mengirimkan tautan pemulihan ke email Anda. Silakan periksa kotak masuk atau folder spam.
          </p>
        </div>
        <Link href="/login"
          className="flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-[var(--forum-text-secondary)] hover:text-[var(--forum-text-primary)] transition-all"
          style={{ background: "#f5f4f0", border: "1px solid #e5e3de" }}>
          <ArrowLeft size={16} />Kembali ke Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-black text-[var(--forum-text-primary)]">Lupa Kata Sandi?</h1>
        <p className="mt-1 text-xs font-semibold text-[var(--forum-text-muted)]">
          Masukkan email Anda untuk menerima tautan pemulihan
        </p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Email</label>
        <AuthInput id="email" type="email" placeholder="nama@email.com" icon={Mail} disabled={isLoading} error={errors.email?.message} registration={register("email")} />
      </div>

      <button type="submit" disabled={isLoading}
        className="forum-btn-accent mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm disabled:opacity-60">
        {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Mengirim...</> : <>Kirim Tautan Pemulihan <ArrowRight size={16} /></>}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold text-[var(--forum-text-muted)]">atau</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <p className="text-center text-xs font-semibold text-[var(--forum-text-muted)]">
        Ingat kata sandi?{" "}
        <Link href="/login" className="font-bold text-violet-500 hover:text-violet-600 transition-colors">Masuk di sini</Link>
      </p>
    </form>
  );
}
