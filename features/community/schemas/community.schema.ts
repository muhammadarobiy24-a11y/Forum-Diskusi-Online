import { z } from "zod";

export const createCommunitySchema = z.object({
  name: z
    .string()
    .min(3, "Nama community minimal 3 karakter.")
    .max(50, "Nama community maksimal 50 karakter."),

  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh huruf kecil, angka, dan tanda -"
    ),

  description: z
    .string()
    .max(500)
    .optional(),

  category_id: z.string().uuid(),

  visibility: z.enum([
    "public",
    "restricted",
    "private",
  ]),
});

export type CreateCommunitySchema =
  z.infer<typeof createCommunitySchema>;