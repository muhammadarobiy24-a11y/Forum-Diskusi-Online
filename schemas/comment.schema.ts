import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Komentar harus diisi")
    .min(2, "Komentar minimal 2 karakter")
    .max(1000, "Komentar terlalu panjang"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
