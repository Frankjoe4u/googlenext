"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth, signIn, signOut, unstable_update } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getCourse } from "@/lib/courses";

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

/* ---------- student features ---------- */

export async function enrollAction(slug: string) {
  const session = await auth();
  if (!session) redirect("/login");
  if (!getCourse(slug)) return;

  const userId = session.user.id;
  await prisma.enrollment.upsert({
    where: { userId_courseSlug: { userId, courseSlug: slug } },
    create: { userId, courseSlug: slug },
    update: {},
  });
  revalidatePath("/dashboard");
  revalidatePath(`/courses/${slug}`);
}

export async function completeLessonAction(slug: string) {
  const session = await auth();
  if (!session) redirect("/login");
  const course = getCourse(slug);
  if (!course) return;

  const userId = session.user.id;
  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseSlug: { userId, courseSlug: slug } },
  });
  if (!enrollment || enrollment.completedLessons >= course.lessons.length) return;

  await prisma.enrollment.update({
    where: { id: enrollment.id },
    data: { completedLessons: { increment: 1 } },
  });
  revalidatePath("/dashboard");
  revalidatePath(`/courses/${slug}`);
  revalidatePath("/profile");
}

const profileSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(60),
  goal: z.string().trim().max(80, "Goal is too long (max 80)").optional(),
  bio: z.string().trim().max(200, "Bio is too long (max 200)").optional(),
});

export async function updateProfileAction(formData: FormData) {
  const session = await auth();
  if (!session) redirect("/login");

  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    redirect(`/profile?error=${encodeURIComponent(parsed.error.issues[0].message)}`);
  }
  const { name, goal, bio } = parsed.data;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { name, goal: goal || null, bio: bio || null },
  });

  // re-runs the jwt callback so the session shows the new name straight away
  await unstable_update({ user: { name } });
  revalidatePath("/", "layout");
  redirect("/profile?saved=1");
}
