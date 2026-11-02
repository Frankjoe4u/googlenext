import Link from "next/link";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";

const features = [
  ["🔐", "Email & password", "Secure registration with hashed passwords."],
  ["🌐", "Google sign-in", "One click, and your account is created automatically."],
  ["🧩", "Rich sessions", "Role, provider and member-since carried in the JWT."],
];

export default function Home() {
  return (
    <section className="py-10 text-center">
      <p className="mx-auto w-fit animate-fade-up rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-indigo-300">
        Powered by Auth.js · Next.js 16
      </p>
      <h1 className="mt-6 animate-fade-up text-5xl font-extrabold tracking-tight [animation-delay:100ms] sm:text-7xl">
        Welcome to{" "}
        <span className="bg-linear-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-size-[200%_200%] bg-clip-text text-transparent motion-safe:animate-gradient">
          {APP_NAME}
        </span>
      </h1>
      <p className="mx-auto mt-5 max-w-xl animate-fade-up text-lg text-slate-400 [animation-delay:200ms]">{APP_TAGLINE}</p>
      <div className="mt-8 flex animate-fade-up justify-center gap-3 [animation-delay:300ms]">
        <Link href="/register" className="rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 active:scale-95">
          Create account
        </Link>
        <Link href="/login" className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-95">
          Sign in
        </Link>
      </div>
      <div className="mt-20 grid gap-4 sm:grid-cols-3">
        {features.map(([icon, title, text], i) => (
          <div
            key={title}
            style={{ animationDelay: `${450 + i * 120}ms` }}
            className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-white/10"
          >
            <div className="text-2xl">{icon}</div>
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-slate-400">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
