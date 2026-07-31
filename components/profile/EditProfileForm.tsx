"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { editProfileSchema, type EditProfileInput } from "@/schemas/edit-profile-schema";
import type { Profile } from "@/types";

const inputCls = "w-full bg-[#f5f4f0] border border-[#e5e3de] text-[var(--forum-text-primary)] placeholder:text-[var(--forum-text-muted)] focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-100 rounded-[16px] h-11 px-4 transition-all disabled:opacity-50";

export default function EditProfileForm({ profile, onSuccess }: { profile: Profile; onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: { username: profile.username, full_name: profile.full_name || "", bio: profile.bio || "" },
  });

  async function onSubmit(data: EditProfileInput) {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("profiles")
        .update({ username: data.username, full_name: data.full_name || null, bio: data.bio || null })
        .eq("id", profile.id || profile.user_id);
      if (error) throw error;
      toast.success("Profil berhasil diperbarui!");
      onSuccess();
    } catch (err: any) {
      toast.error(`Gagal memperbarui profil: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">
          Username <span className="text-red-500">*</span>
        </label>
        <input placeholder="johndoe" disabled={isLoading} className={inputCls} {...register("username")} />
        {errors.username && <p className="text-xs font-semibold text-red-500">{errors.username.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Nama Lengkap</label>
        <input placeholder="John Doe" disabled={isLoading} className={inputCls} {...register("full_name")} />
        {errors.full_name && <p className="text-xs font-semibold text-red-500">{errors.full_name.message}</p>}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[var(--forum-text-muted)] uppercase tracking-widest">Bio</label>
        <textarea placeholder="Ceritakan sesuatu tentang dirimu..." rows={4} disabled={isLoading}
          className={`${inputCls} h-auto py-3 resize-none`} {...register("bio")} />
        {errors.bio && <p className="text-xs font-semibold text-red-500">{errors.bio.message}</p>}
      </div>

      <button type="submit" disabled={isLoading}
        className="forum-btn-accent w-full flex items-center justify-center gap-2.5 py-3 rounded-full text-sm font-bold disabled:opacity-50">
        {isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Menyimpan...</> : <><Save className="h-4 w-4" />Simpan Perubahan</>}
      </button>
    </form>
  );
}
