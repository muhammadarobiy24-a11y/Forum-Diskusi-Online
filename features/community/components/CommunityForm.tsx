"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import {
  createCommunitySchema,
  type CreateCommunitySchema,
} from "../schemas/community.schema";
import { useCreateCommunity } from "../hooks/useCreateCommunity";
import { useCategories } from "@/hooks/useCategories";
import { slugify } from "@/lib/utils/slug";

const VISIBILITY_OPTIONS = [
  {
    value: "public",
    label: "Public",
    description: "Siapa saja bisa melihat dan bergabung.",
  },
  {
    value: "restricted",
    label: "Restricted",
    description: "Siapa saja bisa melihat, tapi perlu persetujuan untuk join.",
  },
  {
    value: "private",
    label: "Private",
    description: "Hanya member yang dapat melihat konten.",
  },
] as const;

export default function CommunityForm() {
  const router = useRouter();
  const [autoSlug, setAutoSlug] = useState(true);

  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const { mutate: createCommunity, isPending } = useCreateCommunity();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCommunitySchema>({
    resolver: zodResolver(createCommunitySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category_id: "",
      visibility: "public",
    },
  });

  const watchName = watch("name");
  const watchVisibility = watch("visibility");

  useEffect(() => {
    if (autoSlug && watchName) {
      setValue("slug", slugify(watchName), { shouldValidate: true });
    }
  }, [watchName, autoSlug, setValue]);

  function onSubmit(data: CreateCommunitySchema) {
    createCommunity(data, {
      onSuccess: (community) => {
        toast.success(`Community r/${community.slug} berhasil dibuat!`);
        router.push(`/communities/${community.slug}`);
      },
      onError: (error) => {
        toast.error(error.message || "Gagal membuat community.");
      },
    });
  }

  return (
    <div 
      className="rounded-[32px] overflow-hidden shadow-2xl relative max-w-2xl mx-auto"
      style={{
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />
      
      <div className="p-8 relative z-10">
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Plus className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Buat Komunitas</h2>
            <p className="text-sm font-medium text-white/50 mt-1">Bangun tempat berkumpul untuk topik favoritmu.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
              Nama Komunitas <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              placeholder="Contoh: Programming Indonesia"
              disabled={isPending}
              className="w-full bg-white/5 border border-white/10 text-white focus:border-blue-500/50 rounded-2xl h-12 px-4 shadow-inner outline-none transition-colors disabled:opacity-50"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs font-semibold text-red-400 ml-1">{errors.name.message}</p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
              Slug (URL) <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center h-12 px-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white/50 select-none">
                r/
              </span>
              <input
                id="slug"
                placeholder="programming-indonesia"
                disabled={isPending}
                className="flex-1 bg-white/5 border border-white/10 text-white focus:border-blue-500/50 rounded-2xl h-12 px-4 shadow-inner outline-none transition-colors disabled:opacity-50"
                {...register("slug", {
                  onChange: () => setAutoSlug(false),
                })}
              />
            </div>
            {errors.slug && (
              <p className="text-xs font-semibold text-red-400 ml-1">{errors.slug.message}</p>
            )}
            <p className="text-[11px] font-medium text-white/40 ml-1">
              Otomatis dari nama. Hanya huruf kecil, angka, dan tanda strip (-).
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
              Deskripsi
            </label>
            <textarea
              id="description"
              placeholder="Jelaskan tujuan dan aturan komunitas ini..."
              rows={4}
              disabled={isPending}
              className="w-full bg-white/5 border border-white/10 text-white focus:border-blue-500/50 rounded-2xl p-4 shadow-inner outline-none transition-colors resize-none disabled:opacity-50"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs font-semibold text-red-400 ml-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category_id" className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
              Kategori <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <select
                id="category_id"
                disabled={isPending || categoriesLoading}
                className="w-full bg-white/5 border border-white/10 text-white focus:border-blue-500/50 rounded-2xl h-12 px-4 shadow-inner outline-none transition-colors appearance-none disabled:opacity-50 cursor-pointer"
                {...register("category_id")}
              >
                <option value="" className="bg-[#0f0a1e] text-white/50">
                  {categoriesLoading ? "Memuat kategori..." : "Pilih kategori"}
                </option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#0f0a1e] text-white">
                    {cat.name}
                  </option>
                ))}
              </select>
              {/* Custom arrow for select */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            {errors.category_id && (
              <p className="text-xs font-semibold text-red-400 ml-1">
                Kategori wajib dipilih.
              </p>
            )}
          </div>

          {/* Visibility */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest ml-1">
              Visibilitas <span className="text-red-400">*</span>
            </p>
            <div className="space-y-3">
              {VISIBILITY_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    watchVisibility === opt.value
                      ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                      : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10"
                  }`}
                >
                  <div className="relative flex items-center justify-center h-5 w-5 mt-0.5 shrink-0">
                    <input
                      type="radio"
                      value={opt.value}
                      disabled={isPending}
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                      {...register("visibility")}
                    />
                    <div className="h-5 w-5 rounded-full border-2 border-white/20 peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-colors" />
                    <div className="absolute h-2 w-2 rounded-full bg-white scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${watchVisibility === opt.value ? "text-white" : "text-white/80"}`}>{opt.label}</p>
                    <p className="text-xs font-medium text-white/50 mt-0.5">
                      {opt.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {errors.visibility && (
              <p className="text-xs font-semibold text-red-400 ml-1">
                {errors.visibility.message}
              </p>
            )}
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center justify-center w-full gap-2 h-14 rounded-2xl text-base font-bold text-white transition-all shadow-[0_8px_25px_rgba(59,130,246,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                border: "1px solid rgba(255,255,255,0.2)"
              }}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Membuat Komunitas...</span>
                </>
              ) : (
                "Buat Komunitas Sekarang"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
