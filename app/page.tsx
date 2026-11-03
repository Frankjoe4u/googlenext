import Link from "next/link";
import { auth } from "@/auth";
import { APP_NAME } from "@/lib/config";

const checklist = [
  { text: "Sketched my pages on paper", done: true },
  { text: "Wrote the HTML for my page", done: true },
  { text: "Added colors and fonts with CSS", done: true },
  { text: "Make the contact form work", done: false },
  { text: "Show it to my class!", done: false },
];

export default async function Home() {
  const session = await auth();

  return (
    <section className="grid items-center gap-12 py-6 md:grid-cols-2">
      <div>
        <h1 className="animate-fade-up text-5xl font-extrabold tracking-tight sm:text-6xl">
          Welcome to{" "}
          <span className="bg-linear-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-size-[200%_200%] bg-clip-text text-transparent motion-safe:animate-gradient">
            {APP_NAME}
          </span>
        </h1>
        <p className="mt-5 max-w-md animate-fade-up text-lg text-slate-300 [animation-delay:150ms]">
          Learn to build websites by making small projects. No pressure, no experience needed. Just a little progress every day.
        </p>
        <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
          {session ? (
            <Link href="/dashboard" className="rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 active:scale-95">
              Go to my dashboard →
            </Link>
          ) : (
            <>
              <Link href="/register" className="rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 active:scale-95">
                Start learning
              </Link>
              <Link href="/login" className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-95">
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="animate-fade-up [animation-delay:250ms]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">📓 My first project</p>
          <h2 className="mt-1 text-xl font-bold">My Class Portfolio Site</h2>

          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-slate-400">
              <span>Progress</span>
              <span>3 of 5 done</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/5 origin-left rounded-full bg-linear-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 motion-safe:animate-grow-x" />
            </div>
          </div>

          <ul className="mt-5 space-y-2.5">
            {checklist.map((item, i) => (
              <li key={item.text} style={{ animationDelay: `${600 + i * 250}ms` }} className="flex animate-fade-up items-center gap-3 text-sm">
                <span className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold ${item.done ? "bg-emerald-400 text-slate-900" : "border border-dashed border-white/30 text-transparent"}`}>✓</span>
                <span className={item.done ? "text-slate-400 line-through" : "text-slate-100"}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
