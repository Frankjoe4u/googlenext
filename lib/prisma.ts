import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const make = () =>
  new PrismaClient({
    adapter: new PrismaLibSql({ url: process.env.DATABASE_URL ?? "file:./dev.db" }),
  });

const g = globalThis as unknown as { prisma?: PrismaClient };
export const prisma = g.prisma ?? make();
if (process.env.NODE_ENV !== "production") g.prisma = prisma;