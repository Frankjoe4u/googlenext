import Link from "next/link";
import { auth } from "@/auth";
import { APP_NAME } from "@/lib/config";
import { courses } from "@/lib/courses";

const path = [
  { n: "01", icon: "🎨", title: "Build the face", text: "Structure and style real pages people enjoy using.", stack: ["HTML", "CSS", "Tailwind", "JavaScript"] },
  { n: "02", icon: "⚡", title: "Level up", text: "Add types and components, then ship full apps.", stack: ["TypeScript", "React", "Next.js"] },
  { n: "03", icon: "🗄️", title: "Own the data", text: "Store, query and protect what your app knows.", stack: ["MongoDB", "Supabase", "PostgreSQL", "Node.js"] },
  { n: "04", icon: "🚀", title: "Ship it", text: "Version, collaborate and put it live on the internet.", stack: ["Git & GitHub", "Deploy"] },
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
          <p className="mt-5 max-w-md animate-fade-up text-lg text-slate-400 [animation-delay:150ms]">
            Learn the modern web stack, one real project at a time. From your first line of HTML to a live full-stack app.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3 [animation-delay:300ms]">
            {session ? (
              <Link href="/dashboard" className="rounded-xl bg-linear-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 font-semibold shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 active:scale-95">
                Go to your dashboard →
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

        {/* Animated code window */}
        <div className="animate-fade-up [animation-delay:250ms]">
          <div className="motion-safe:animate-bob overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-indigo-500/10 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-3 rounded-full bg-rose-400" />
              <span className="size-3 rounded-full bg-amber-400" />
              <span className="size-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-slate-500">student.ts</span>
            </div>
            <pre className="p-5 font-mono text-sm leading-7">
              <code>
                <span style={{ animationDelay: "600ms" }} className="block animate-fade-up"><span className="text-fuchsia-400">const</span> <span className="text-cyan-300">student</span> = <span className="text-amber-300">&quot;you&quot;</span>;</span>
                <span style={{ animationDelay: "1100ms" }} className="block animate-fade-up"><span className="text-cyan-300">student</span>.<span className="text-indigo-300">learn</span>([<span className="text-amber-300">&quot;HTML&quot;</span>, <span className="text-amber-300">&quot;TS&quot;</span>, <span className="text-amber-300">&quot;React&quot;</span>]);</span>
                <span style={{ animationDelay: "1600ms" }} className="block animate-fade-up"><span className="text-cyan-300">student</span>.<span className="text-indigo-300">build</span>(<span className="text-amber-300">&quot;something real&quot;</span>);</span>
                <span style={{ animationDelay: "2100ms" }} className="block animate-fade-up text-slate-500">{"// "}🎓 graduate from {APP_NAME}<span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-indigo-400 motion-safe:animate-blink" /></span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section aria-label="Courses" className="animate-fade-in [animation-delay:500ms]">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.3em] text-slate-500">What you will learn</p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="flex w-max gap-3 motion-safe:animate-marquee hover:[animation-play-state:paused]">
            {loop.map((c, i) => (
              <span key={i} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur">
                <span className={`grid size-6 place-items-center rounded-md bg-linear-to-br ${c.gradient} text-[9px] font-bold text-white`}>{c.tag.slice(0, 3)}</span>
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section>
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your path from zero to shipped</h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-400">Four stages, each building on the last, so you always know what to learn next.</p>
        </div>
        <div className="relative mt-12">
          <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 origin-left bg-linear-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 motion-safe:animate-grow-x lg:block" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {path.map((s, i) => (
              <div
                key={s.n}
                style={{ animationDelay: `${i * 150}ms` }}
                className="group relative animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 pt-9 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-indigo-400/40 hover:bg-white/10"
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
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-r from-indigo-600/40 via-fuchsia-600/30 to-cyan-500/30 bg-size-[200%_200%] p-10 text-center motion-safe:animate-gradient">
          <h2 className="text-3xl font-bold">Your seat at {APP_NAME} is waiting</h2>
          <p className="mx-auto mt-2 max-w-md text-slate-300">Create a free account in under a minute and start with your first course today.</p>
          <Link href="/register" className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-indigo-100 active:scale-95">
            Create your account
          </Link>
        </section>
      )}
    </div>
  );
}
