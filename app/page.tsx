import Link from "next/link";
import { auth } from "@/auth";
import { APP_NAME } from "@/lib/config";
import { courses } from "@/lib/courses";

const journey = [
  { n: "1", icon: "🌱", title: "Start simple", text: "Learn the basics and make your first web page.", stack: ["HTML", "CSS", "Git"] },
  { n: "2", icon: "✨", title: "Make it move", text: "Add buttons, clicks and fun little interactions.", stack: ["JavaScript", "Tailwind"] },
  { n: "3", icon: "🧠", title: "Level up", text: "Build with React and Next.js, with TypeScript to help.", stack: ["TypeScript", "React", "Next.js"] },
  { n: "4", icon: "💾", title: "Save your stuff", text: "Store your data and show your work to the world.", stack: ["MongoDB", "Supabase", "PostgreSQL"] },
];

const checklist = [
  { text: "Sketched my pages on paper", done: true },
  { text: "Wrote the HTML for my page", done: true },
  { text: "Added colors and fonts with CSS", done: true },
  { text: "Make the contact form work", done: false },
  { text: "Show it to my class!", done: false },
];

export default async function Home() {
  const session = await auth();
  const loop = [...courses, ...courses];

  return (
    <div className="space-y-24">
      {/* Hero */}
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

        {/* Student project notebook */}
        <div className="relative animate-fade-up [animation-delay:250ms]">
          <div className="motion-safe:animate-bob rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-500/10 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">📓 My first project</p>
            <h2 className="mt-1 text-xl font-bold">My Class Portfolio Site</h2>

            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-xs text-slate-400">
                <span>Progress</span><span>3 of 5 done</span>
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

          <div style={{ animationDelay: "1900ms" }} className="absolute -bottom-6 -right-2 w-48 rotate-3 animate-fade-up rounded-md bg-yellow-200 p-3 text-sm font-medium text-slate-800 shadow-xl sm:-right-6">
            Small steps every day. You&apos;ve got this! ✏️
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section aria-label="Courses" className="animate-fade-in [animation-delay:500ms]">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-slate-500">What you can learn</p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max gap-3 motion-safe:animate-marquee hover:[animation-play-state:paused]">
            {loop.map((c, i) => (
              <span key={i} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                <span className="text-base">{c.emoji}</span>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your learning journey</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">Four friendly steps. Go at your own speed and build something at every stage.</p>
        </div>
        <div className="relative mt-12">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 origin-left bg-linear-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 motion-safe:animate-grow-x lg:block" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((s, i) => (
              <div
                key={s.n}
                style={{ animationDelay: `${i * 150}ms` }}
                className="group relative animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-5 pt-9 transition duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:bg-white/10"
              >
                <div className="absolute -top-5 left-5 grid size-14 place-items-center rounded-2xl border border-white/10 bg-slate-950 text-2xl shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {s.icon}
                </div>
                <p className="text-xs font-bold tracking-widest text-indigo-300">STEP {s.n}</p>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{s.text}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.stack.map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-slate-300">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!session && (
        <section className="rounded-3xl border border-white/10 bg-linear-to-r from-indigo-600/40 via-fuchsia-600/30 to-cyan-500/30 bg-size-[200%_200%] p-10 text-center motion-safe:animate-gradient">
          <h2 className="text-3xl font-bold">Ready to start your first project?</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-200">Join {APP_NAME} for free and pick your first course today.</p>
          <Link href="/register" className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-indigo-100 active:scale-95">
            Join NextCollege
          </Link>
        </section>
      )}
    </div>
  );
}
