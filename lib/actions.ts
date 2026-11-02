"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function registerAction(formData: FormData) {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(`/register?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }
  const { name, password } = parsed.data;
  const email = parsed.data.email.toLowerCase();

  if (await prisma.user.findUnique({ where: { email } })) {
    redirect(`/register?error=${encodeURIComponent("Email already registered")}`);
  }

  await prisma.user.create({
    data: { name, email, password: await bcrypt.hash(password, 12), provider: "credentials" },
  });

  // auto-login after registering (throws a redirect on success)
  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
}

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: (formData.get("callbackUrl") as string) || "/dashboard",
    });
  } catch (e) {
    if (e instanceof AuthError) redirect("/login?error=Invalid%20email%20or%20password");
    throw e; // rethrow NEXT_REDIRECT
  }
}

export async function googleAction(formData: FormData) {
  await signIn("google", { redirectTo: (formData.get("callbackUrl") as string) || "/dashboard" });
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
