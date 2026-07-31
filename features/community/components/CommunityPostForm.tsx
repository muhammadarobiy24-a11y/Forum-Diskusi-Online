"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ImagePlus, X, PenSquare } from "lucide-react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { addPost } from "@/services/post.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { useSession } from "@/components/providers/SessionProvider";
import type { Community } from "../types/community";
import type { Category } from "@/types";

const communityPostSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter").max(200, "Judul maksimal 200 karakter"),
  categoryId: z.string().min(1, "Pilih kategori"),
  content: z.string().min(1, "Isi postingan tidak boleh kosong"),
});

type FormValues = z.infer<typeof communityPostSchema>;

interface CommunityPostFormProps {
  community: Community;
  onSuccess?: () => void;
}

export default function CommunityPostForm({
  community,
  onSuccess,
}: CommunityPostFormProps) {
  const { user } = useSession();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      return data as Category[];
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(communityPostSchema),
    defaultValues: {
      title: "",
      categoryId: community.category_id ?? "",
      content: "",
    },
  });

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: (values: FormValues) =>
      addPost({
        title: values.title,
        categoryId: values.categoryId,
        content: values.content,
        communityId: community.id,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
      reset();
      toast.success("Postingan berhasil dibuat!");
      onSuccess?.();
    },
    onError: (err: Error) => {
      toast.error(err.message || "Gagal membuat postingan.");
    },
  });

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) {
      toast.error("Hanya file gambar dan video yang diperbolehkan");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 20MB");
      return;
    }

    setIsUploadingMedia(true);
    toast.loading("Mengunggah media...", { id: "upload" });

    try {
      const ext = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("post-images")
        .upload(fileName, file, { upsert: true });

      if (error) throw new Error(error.message);

      const { data: { publicUrl } } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      const tag = isVideo
        ? `\n\n[video](${publicUrl})\n`
        : `\n\n![Gambar](${publicUrl})\n`;

      setValue("content", getValues("content") + tag, { shouldValidate: true });
      toast.success("Media dilampirkan!", { id: "upload" });
    } catch (err: any) {
      toast.error(err.message || "Gagal mengunggah media", { id: "upload" });
    } finally {
      setIsUploadingMedia(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  if (!user) return null;

  return (
    <form
      onSubmit={handleSubmit((v) => submitPost(v))}
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Form header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-8 w-8 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #7c3aed, #3b82f6)" }}
        >
          <PenSquare className="h-4 w-4 text-white" />
        </div>
        <p className="font-bold text-white/90 text-sm">Buat Postingan Baru</p>
      </div>

      <div className="p-5 space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Judul
          </label>
          <input
            placeholder="Judul postingan..."
            disabled={isPending}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white/90 placeholder:text-white/30 outline-none transition-all focus:ring-2 focus:ring-violet-500/40"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            {...register("title")}
          />
          {errors.title && (
            <p className="text-xs text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Kategori
          </label>
          <select
            disabled={isPending}
            className="w-full rounded-xl px-4 py-2.5 text-sm font-medium text-white/90 outline-none"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            {...register("categoryId")}
          >
            <option value="">Pilih kategori</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-red-400">Kategori wajib dipilih</p>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/40">
            Isi Postingan
          </label>
          <textarea
            rows={4}
            disabled={isPending}
            placeholder="Tulis postinganmu di sini..."
            className="w-full rounded-xl px-4 py-3 text-sm font-medium text-white/90 placeholder:text-white/30 outline-none resize-none transition-all focus:ring-2 focus:ring-violet-500/40"
            style={{
              background: "rgba(0,0,0,0.25)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            {...register("content")}
          />
          {errors.content && (
            <p className="text-xs text-red-400">{errors.content.message}</p>
          )}
        </div>

        {/* Actions row */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Media upload */}
          <button
            type="button"
            disabled={isUploadingMedia || isPending}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-white/50 hover:text-white transition-colors disabled:opacity-40"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {isUploadingMedia ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImagePlus className="h-3.5 w-3.5" />
            )}
            Foto / Video
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleMediaUpload}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending || isUploadingMedia}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-50 transition-all"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              boxShadow: "0 0 16px rgba(124,58,237,0.35)",
            }}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {isPending ? "Memposting..." : "Terbitkan"}
          </button>
        </div>
      </div>
    </form>
  );
}
