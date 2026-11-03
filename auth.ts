import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 },
  pages: { signIn: "/login" },

  providers: [
    // reads AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET automatically
    Google,
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(raw) {
        const parsed = credentialsSchema.safeParse(raw);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
        });
        // Google-only accounts have no password
        if (!user?.password) return null;
        if (!(await bcrypt.compare(parsed.data.password, user.password))) return null;

        return { id: user.id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],

  callbacks: {
    // Runs on every sign-in. For Google this registers the user in our DB.
    async signIn({ user, account, profile }) {
      const email = user.email?.toLowerCase();
      if (!email) return false;

      if (account?.provider === "google") {
        if (!profile?.email_verified) return false;
        await prisma.user.upsert({
          where: { email },
          create: { email, name: user.name, image: user.image, provider: "google" },
          update: { name: user.name, image: user.image, lastLogin: new Date() },
        });
      } else {
        await prisma.user.update({ where: { email }, data: { lastLogin: new Date() } });
      }
      return true;
    },

    // `user` is only defined at sign-in, so DB fields are loaded into the token once.
    async jwt({ token, user, trigger, session }) {
      if (user || trigger === "update") {
        const email = (user?.email ?? token.email)?.toLowerCase();
        const db = email ? await prisma.user.findUnique({ where: { email } }) : null;
        if (db) {
          token.id = db.id;
          token.role = db.role;
          token.provider = db.provider;
          token.createdAt = db.createdAt.toISOString();
          token.name = db.name;
          token.picture = db.image;
        }
      }
      if (trigger === "update" && session?.name) token.name = session.name;
      return token;
    },

    // Shapes what auth() / useSession() return.
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.provider = token.provider as string;
      session.user.createdAt = token.createdAt as string | undefined;
      return session;
    },
  },
});
