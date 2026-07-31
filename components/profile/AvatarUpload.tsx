"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl: string | null;
  username: string;
  onAvatarUpdate: (url: string) => void;
}

export default function AvatarUpload({
  userId,
  currentAvatarUrl,
  username,
  onAvatarUpdate,
}: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const initials = (username || "U").slice(0, 2).toUpperCase();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Hanya file JPG, JPEG, dan PNG yang diizinkan");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file harus kurang dari 2MB");
      return;
    }

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      setPreviewUrl(publicUrl);
      onAvatarUpdate(publicUrl);
      toast.success("Foto profil berhasil diperbarui!");
    } catch {
      setPreviewUrl(currentAvatarUrl);
      toast.error("Gagal mengupload foto profil.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Avatar circle */}
      <div className="relative group">
        <div
          className="h-28 w-28 rounded-full flex items-center justify-center text-3xl font-black border-4 border-[#0a1020] shadow-2xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(124,58,237,0.3)]"
          style={{
            background: previewUrl
              ? `url(${previewUrl}) center/cover`
              : "linear-gradient(135deg, #7c3aed, #3b82f6)",
            color: "white",
          }}
        >
          {!previewUrl && initials}
        </div>

        {/* Overlay on hover */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="absolute inset-0 rounded-full flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <Loader2 className="h-7 w-7 text-white animate-spin" />
          ) : (
            <Camera className="h-7 w-7 text-white" />
          )}
        </button>

        {/* Upload indicator ring */}
        {isUploading && (
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
            style={{
              borderTopColor: "#a78bfa",
              boxShadow: "0 0 15px rgba(167,139,250,0.5)",
            }}
          />
        )}
      </div>

      <div className="text-center space-y-1">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Mengupload..." : "Ganti Foto Profil"}
        </button>
        <p className="text-xs font-medium text-white/40">
          JPG, JPEG, atau PNG · Maks. 2MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
