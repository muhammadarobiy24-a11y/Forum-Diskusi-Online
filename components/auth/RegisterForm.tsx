"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { registerSchema, type RegisterInput } from "@/schemas/register-schema";
import { register as registerAction } from "@/app/actions/auth/register";

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

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);
    try {
      const result = await registerAction(data);
      if (result?.error) toast.error(result.error);
    } catch { toast.error("Terjadi kesalahan."); }
    finally { setIsLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-6 text-center">
        <h1 className="text-xl font-black text-[var(--forum-text-primary)]">Buat Akun Baru</h1>
        <p className="mt-1 text-xs font-semibold text-[var(--forum-text-muted)]">Bergabunglah dengan komunitas forum kami</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Email</label>
          <AuthInput id="email" type="email" placeholder="nama@email.com" icon={Mail} disabled={isLoading} error={errors.email?.message} registration={register("email")} />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Username</label>
          <AuthInput id="username" type="text" placeholder="johndoe" icon={User} disabled={isLoading} error={errors.username?.message} registration={register("username")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Password</label>
          <AuthInput id="password" type="password" placeholder="••••••••" icon={Lock} disabled={isLoading} error={errors.password?.message} registration={register("password")} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Konfirmasi</label>
          <AuthInput id="confirmPassword" type="password" placeholder="••••••••" icon={Lock} disabled={isLoading} error={errors.confirmPassword?.message} registration={register("confirmPassword")} />
        </div>
      </div>

      <button type="submit" disabled={isLoading}
        className="forum-btn-accent mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm disabled:opacity-60">
        {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Membuat akun...</> : <>Daftar Sekarang <ArrowRight size={16} /></>}
      </button>

      <div className="flex items-center gap-3 pt-2">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-semibold text-[var(--forum-text-muted)]">atau</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <p className="text-center text-xs font-semibold text-[var(--forum-text-muted)]">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-bold text-violet-500 hover:text-violet-600 transition-colors">Masuk di sini</Link>
      </p>
    </form>
  );
}
