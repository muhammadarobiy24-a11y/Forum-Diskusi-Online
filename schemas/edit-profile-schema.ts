import { z } from "zod";

export const editProfileSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  full_name: z.string().max(100, "Full name must be at most 100 characters").optional(),
  bio: z.string().max(300, "Bio must be at most 300 characters").optional(),
});

export type EditProfileInput = z.infer<typeof editProfileSchema>;
