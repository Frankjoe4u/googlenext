import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions";
import { APP_NAME } from "@/lib/config";

const link = "rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl animate-fade-in">
      <nav className="mx-auto flex max-w-5xl items-center gap-2 px-6 py-3">
        <Link href="/" className="mr-auto flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-indigo-500 to-fuchsia-500 text-sm">🎓</span>
          {APP_NAME}
        </Link>
        {session ? (
          <>
            <Link href="/dashboard" className={link}>Dashboard</Link>
            <form action={logoutAction}>
              <button className="rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10 active:scale-95">Sign out</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className={link}>Login</Link>
            <Link href="/register" className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-indigo-100 active:scale-95">
              Get started
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
