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

export default function AvatarUpload({ userId, currentAvatarUrl, username, onAvatarUpdate }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();
  const initials = (username || "U").slice(0, 2).toUpperCase();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("Hanya file JPG, JPEG, dan PNG yang diizinkan"); return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran file harus kurang dari 2MB"); return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(fileName);
      const { error: updateError } = await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", userId);
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
      <div className="relative group">
        <div className="h-28 w-28 rounded-full flex items-center justify-center text-2xl font-black border-4 border-white overflow-hidden shadow-md"
          style={{
            background: previewUrl ? `url(${previewUrl}) center/cover` : "linear-gradient(135deg, #7c3aed, #3b82f6)",
            color: "white",
          }}>
          {!previewUrl && initials}
        </div>

        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}
          className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer">
          {isUploading ? <Loader2 className="h-7 w-7 text-white animate-spin" /> : <Camera className="h-7 w-7 text-white" />}
        </button>

        {isUploading && (
          <div className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
            style={{ borderTopColor: "#7c3aed" }} />
        )}
      </div>

      <div className="text-center space-y-1">
        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}
          className="text-sm font-bold text-violet-500 hover:text-violet-600 transition-colors disabled:opacity-50">
          {isUploading ? "Mengupload..." : "Ganti Foto Profil"}
        </button>
        <p className="text-xs text-[var(--forum-text-muted)]">JPG, JPEG, atau PNG · Maks. 2MB</p>
      </div>

      <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg,image/png" className="hidden" onChange={handleFileChange} />
    </div>
  );
}
