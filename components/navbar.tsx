import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions";
import { APP_NAME } from "@/lib/config";

const link = "whitespace-nowrap rounded-lg px-2.5 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-3";

export async function Navbar() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-20 animate-fade-in border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-5xl items-center gap-1 px-4 py-3 sm:px-6">
        <Link href="/" className="mr-auto flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-linear-to-br from-indigo-500 to-fuchsia-500 text-sm">🎓</span>
          {/* on phones the name is hidden once logged in, so the links fit on one line */}
          <span className={session ? "hidden sm:inline" : ""}>{APP_NAME}</span>
        </Link>
        {session ? (
          <>
            <Link href="/dashboard" className={link}>Dashboard</Link>
            <Link href="/profile" className={link}>Profile</Link>
            <form action={logoutAction}>
              <button className={`${link} cursor-pointer`}>Sign out</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className={link}>Login</Link>
            <Link href="/register" className="whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-indigo-100 active:scale-95">
              Join us
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
