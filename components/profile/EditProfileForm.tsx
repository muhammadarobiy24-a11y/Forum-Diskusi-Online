"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import {
  editProfileSchema,
  type EditProfileInput,
} from "@/schemas/edit-profile-schema";
import type { Profile } from "@/types";

interface EditProfileFormProps {
  profile: Profile;
  onSuccess: () => void;
}

export default function EditProfileForm({
  profile,
  onSuccess,
}: EditProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileInput>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: profile.username,
      full_name: profile.full_name || "",
      bio: profile.bio || "",
    },
  });

  async function onSubmit(data: EditProfileInput) {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          username: data.username,
          full_name: data.full_name || null,
          bio: data.bio || null,
        })
        .eq("id", profile.id || profile.user_id);

      if (error) throw error;

      toast.success("Profil berhasil diperbarui!");
      onSuccess();
    } catch (err: any) {
      console.error("Profile update error:", err);
      toast.error(`Gagal memperbarui profil: ${err.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Username */}
      <div className="space-y-2">
        <label htmlFor="username" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
          Username <span className="text-red-400">*</span>
        </label>
        <input
          id="username"
          placeholder="johndoe"
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none rounded-2xl h-12 px-4 shadow-inner transition-colors disabled:opacity-50"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-xs font-semibold text-red-400 ml-1">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="full_name" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
          Nama Lengkap
        </label>
        <input
          id="full_name"
          placeholder="John Doe"
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none rounded-2xl h-12 px-4 shadow-inner transition-colors disabled:opacity-50"
          {...register("full_name")}
        />
        {errors.full_name && (
          <p className="text-xs font-semibold text-red-400 ml-1">
            {errors.full_name.message}
          </p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <label htmlFor="bio" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
          Bio
        </label>
        <textarea
          id="bio"
          placeholder="Ceritakan sesuatu tentang dirimu..."
          rows={4}
          disabled={isLoading}
          className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-violet-500/50 focus:outline-none rounded-2xl p-4 shadow-inner resize-none transition-colors disabled:opacity-50"
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-xs font-semibold text-red-400 ml-1">
            {errors.bio.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex items-center justify-center w-full gap-2.5 h-13 py-3.5 rounded-2xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
          boxShadow: "0 8px 25px rgba(124,58,237,0.3)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Menyimpan...</span>
          </>
        ) : (
          <>
            <Save className="h-5 w-5" />
            <span>Simpan Perubahan</span>
          </>
        )}
      </button>
    </form>
  );
}
