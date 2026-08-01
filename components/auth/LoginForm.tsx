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
          style={{
            background: "#f5f4f0",
            border: error ? "1.5px solid #f87171" : "1.5px solid #e5e3de",
            borderRadius: 14,
            padding: "0.75rem 1rem 0.75rem 2.75rem",
          }}
          onFocus={e => { e.currentTarget.style.borderColor = "#7c3aed"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.12)"; e.currentTarget.style.background = "#fff"; }}
          onBlur={e => { e.currentTarget.style.borderColor = error ? "#f87171" : "#e5e3de"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.background = "#f5f4f0"; }}
        />
      </div>
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}
    </div>
  );
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect");
  const registered = searchParams.get("registered");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginInput) {
    setIsLoading(true);
    try {
      const result = await loginAction(data, redirectTo || undefined);
      if (result?.error) toast.error(result.error);
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "NEXT_REDIRECT") throw err;
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-black text-[var(--forum-text-primary)]">Selamat Datang Kembali</h1>
        <p className="mt-1 text-xs font-semibold text-[var(--forum-text-muted)]">Masukkan akun Anda untuk melanjutkan</p>
      </div>

      {registered && (
        <div className="rounded-[16px] p-3 text-xs font-semibold text-emerald-600"
          style={{ background: "#edfff5", border: "1px solid #b6f5d3" }}>
          ✓ Akun berhasil dibuat! Silakan masuk.
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Email</label>
        <AuthInput id="email" type="email" placeholder="nama@email.com" icon={Mail} disabled={isLoading} error={errors.email?.message} registration={register("email")} />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Password</label>
          <Link href="/forgot-password" className="text-xs font-bold text-violet-500 hover:text-violet-600 transition-colors">Lupa password?</Link>
        </div>
        <AuthInput id="password" type="password" placeholder="••••••••" icon={Lock} disabled={isLoading} error={errors.password?.message} registration={register("password")} />
      </div>

      <button type="submit" disabled={isLoading}
        className="forum-btn-accent mt-2 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm disabled:opacity-60">
        {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Masuk...</> : <>Masuk <ArrowRight size={16} /></>}
      </button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold text-[var(--forum-text-muted)]">atau</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <p className="text-center text-xs font-semibold text-[var(--forum-text-muted)]">
        Belum punya akun?{" "}
        <Link href="/register" className="font-bold text-violet-500 hover:text-violet-600 transition-colors">Daftar sekarang</Link>
      </p>
    </form>
  );
}
