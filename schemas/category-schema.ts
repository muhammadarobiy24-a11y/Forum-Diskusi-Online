import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase kebab-case only"
    ),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
});

export type CategoryInput = z.infer<typeof categorySchema>;
