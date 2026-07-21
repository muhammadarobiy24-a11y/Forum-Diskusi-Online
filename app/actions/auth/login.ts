"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, type LoginInput } from "@/schemas/login-schema";

export async function login(formData: LoginInput, redirectTo?: string) {
  const supabase = await createClient();

  const validatedFields = loginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Email not confirmed")) {
      return {
        error: "Please confirm your email address before signing in. Check your inbox for the confirmation link.",
      };
    }
    return {
      error: "Invalid email or password. Please try again.",
    };
  }

  revalidatePath("/", "layout");
  redirect(redirectTo || "/");
}
