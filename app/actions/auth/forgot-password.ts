"use server";

import { createClient } from "@/lib/supabase/server";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/schemas/forgot-password-schema";

export async function forgotPassword(formData: ForgotPasswordInput) {
  const supabase = await createClient();

  const validatedFields = forgotPasswordSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } = validatedFields.data;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password`,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  return {
    success: "Password reset email sent. Please check your inbox.",
  };
}
