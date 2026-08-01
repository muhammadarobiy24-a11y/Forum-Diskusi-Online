"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, ImagePlus, PenSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { addPost } from "@/services/post.service";
import { QUERY_KEYS } from "@/lib/constants/query-keys";
import { useSession } from "@/components/providers/SessionProvider";
import type { Community } from "../types/community";
import type { Category } from "@/types";

const communityPostSchema = z.object({
  title:      z.string().min(5, "Judul minimal 5 karakter").max(200, "Judul maksimal 200 karakter"),
  categoryId: z.string().min(1, "Pilih kategori"),
  content:    z.string().min(1, "Isi postingan tidak boleh kosong"),
});
type FormValues = z.infer<typeof communityPostSchema>;

const inputCls =
  "w-full rounded-[14px] px-4 py-2.5 text-sm font-semibold text-[var(--forum-text-primary)] " +
  "placeholder:text-[var(--forum-text-muted)] outline-none transition-all disabled:opacity-50 " +
  "bg-[#f5f4f0] border border-[#e5e3de] " +
  "focus:bg-white focus:border-[#6c5ce7] focus:ring-2 focus:ring-[#6c5ce7]/15";

export default function CommunityPostForm({
  community,
  onSuccess,
}: {
  community: Community;
  onSuccess?: () => void;
}) {
  const { user } = useSession();
  const supabase = createClient();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories").select("*").order("name", { ascending: true });
      if (error) throw error;
      return data as Category[];
    },
  });

  const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } =
    useForm<FormValues>({
      resolver: zodResolver(communityPostSchema),
      defaultValues: { title: "", categoryId: community.category_id ?? "", content: "" },
    });

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: (values: FormValues) =>
      addPost({ title: values.title, categoryId: values.categoryId, content: values.content, communityId: community.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.posts });
      reset();
      toast.success("Postingan berhasil dibuat!");
      onSuccess?.();
    },
    onError: (err: Error) => toast.error(err.message || "Gagal membuat postingan."),
  });

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isVideo && !isImage) { toast.error("Hanya file gambar dan video yang diperbolehkan"); return; }
    if (file.size > 20 * 1024 * 1024) { toast.error("Ukuran file maksimal 20MB"); return; }
    setIsUploadingMedia(true);
    toast.loading("Mengunggah media...", { id: "upload" });
    try {
      const ext = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("post-images").upload(fileName, file, { upsert: true });
      if (error) throw new Error(error.message);
      const { data: { publicUrl } } = supabase.storage.from("post-images").getPublicUrl(fileName);
      const tag = isVideo ? `\n\n[video](${publicUrl})\n` : `\n\n![Gambar](${publicUrl})\n`;
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
    <form onSubmit={handleSubmit((v) => submitPost(v))}
      className="rounded-[24px] overflow-hidden"
      style={{ background: "#ffffff", border: "1px solid #e8e6f0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e8e6f0]">
        <div className="h-9 w-9 rounded-[14px] flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #6c5ce7, #a29bfe)" }}>
          <PenSquare className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="font-black text-[var(--forum-text-primary)] text-sm">Buat Postingan Baru</p>
          <p className="text-xs text-[var(--forum-text-muted)]">di {community.name}</p>
        </div>
      </div>

      <div className="p-5 space-y-4">

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
            Judul <span className="text-red-400">*</span>
          </label>
          <input placeholder="Tulis judul yang menarik..." disabled={isPending}
            className={inputCls} {...register("title")} />
          {errors.title && <p className="text-xs font-semibold text-red-500">{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
            Kategori <span className="text-red-400">*</span>
          </label>
          <select disabled={isPending}
            className={inputCls}
            {...register("categoryId")}>
            <option value="">Pilih kategori</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs font-semibold text-red-500">Kategori wajib dipilih</p>}
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-widest text-[var(--forum-text-muted)]">
            Isi Postingan <span className="text-red-400">*</span>
          </label>
          <textarea rows={5} disabled={isPending}
            placeholder="Bagikan idemu di sini..."
            className={`${inputCls} resize-none`}
            {...register("content")} />
          {errors.content && <p className="text-xs font-semibold text-red-500">{errors.content.message}</p>}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-[#f0eee8]">
          <button type="button" disabled={isUploadingMedia || isPending}
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold text-[var(--forum-text-secondary)] hover:text-[#6c5ce7] hover:bg-[#ede9fe] transition-all disabled:opacity-40"
            style={{ border: "1.5px solid #e5e3de" }}>
            {isUploadingMedia
              ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
              : <ImagePlus className="h-3.5 w-3.5" />}
            Foto / Video
          </button>
          <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleMediaUpload} />

          <button type="submit" disabled={isPending || isUploadingMedia}
            className="forum-btn-accent flex items-center gap-2 px-5 py-2 rounded-full text-sm disabled:opacity-50">
            {isPending
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Send className="h-4 w-4" />}
            {isPending ? "Memposting..." : "Terbitkan"}
          </button>
        </div>
      </div>
    </form>
  );
}
