import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "Judul harus diisi")
    .min(5, "Judul minimal 5 karakter")
    .max(150, "Judul maksimal 150 karakter"),
  categoryId: z.string().uuid("Kategori tidak valid"),
  content: z
    .string()
    .min(1, "Isi postingan harus diisi")
    .min(20, "Isi postingan minimal 20 karakter")
    .max(10000, "Isi postingan terlalu panjang"),
});

export type PostFormValues = z.infer<typeof postSchema>;
