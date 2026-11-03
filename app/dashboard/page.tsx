import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { CourseGrid } from "@/components/course-grid";
import { courses, tracks } from "@/lib/courses";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/dashboard");

  const u = session.user;
  const firstName = u.name?.split(" ")[0] ?? "Student";
  const initials = (u.name ?? u.email ?? "?").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  const joined = u.createdAt
    ? new Date(u.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : null;
  const totalHours = courses.reduce((sum, c) => sum + c.hours, 0);

  const stats = [
    [String(courses.length), "Courses to explore"],
    [String(tracks.length), "Learning tracks"],
    [`${totalHours}h`, "Of hands-on content"],
  ];

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <section className="flex animate-fade-up flex-wrap items-center gap-5">
        <div className="relative size-20 shrink-0">
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#6366f1,#d946ef,#22d3ee,#6366f1)]" />
          <div className="absolute inset-0.75 overflow-hidden rounded-full bg-slate-950">
            {u.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={u.image} alt="" referrerPolicy="no-referrer" className="size-full object-cover" />
            ) : (
              <div className="grid size-full place-items-center text-xl font-bold">{initials}</div>
            )}
          </div>
        </div>
        <div>
          <p className="w-fit rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-300">
            🎓 NextCollege Student{joined ? ` · Joined ${joined}` : ""}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, <span className="bg-linear-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">{firstName}</span> 👋
          </h1>
        </div>
      </section>

      {/* Banner */}
      <section className="relative animate-fade-up overflow-hidden rounded-3xl border border-white/10 bg-linear-to-r from-indigo-600/40 via-fuchsia-600/30 to-cyan-500/30 bg-size-[200%_200%] p-8 [animation-delay:100ms] motion-safe:animate-gradient">
        <div className="absolute -right-6 -top-4 text-8xl opacity-20 motion-safe:animate-bob">🚀</div>
        <h2 className="text-2xl font-bold">Ready to build something today?</h2>
        <p className="mt-1 max-w-lg text-slate-300">Pick a course below, learn by building, and level up one lesson at a time.</p>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:max-w-md">
          {stats.map(([value, label], i) => (
            <div key={label} style={{ animationDelay: `${300 + i * 120}ms` }} className="animate-fade-up rounded-2xl border border-white/10 bg-slate-950/40 p-3 backdrop-blur">
              <p className="text-2xl font-extrabold">{value}</p>
              <p className="text-[11px] leading-tight text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses */}
      <section>
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Courses at NextCollege</h2>
            <p className="text-sm text-slate-400">Filter by track and find your next skill.</p>
          </div>
        </div>
        <CourseGrid />
      </section>

      {/* Demo: session data from the jwt/session callbacks */}
      <details className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm">
        <summary className="cursor-pointer text-slate-400 transition hover:text-slate-200">Developer view: session data</summary>
        <pre className="mt-3 overflow-auto text-xs leading-relaxed text-emerald-300">{JSON.stringify(session, null, 2)}</pre>
      </details>
    </div>
  );
}
