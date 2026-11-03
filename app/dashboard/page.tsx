import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CourseGrid } from "@/components/course-grid";
import { courses, getCourse } from "@/lib/courses";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/dashboard");

  const u = session.user;
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: u.id },
    orderBy: { updatedAt: "desc" },
  });

  const progress: Record<string, number> = {};
  for (const e of enrollments) progress[e.courseSlug] = e.completedLessons;

  const mine = enrollments.flatMap((e) => {
    const course = getCourse(e.courseSlug);
    return course ? [{ course, done: e.completedLessons }] : [];
  });
  const lessonsDone = mine.reduce((s, m) => s + m.done, 0);
  const finished = mine.filter((m) => m.done >= m.course.lessons.length).length;

  const firstName = u.name?.split(" ")[0] ?? "Student";
  const initials = (u.name ?? u.email ?? "?").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  const stats = [
    ["📚", String(mine.length), "Courses started"],
    ["✅", String(lessonsDone), "Lessons done"],
    ["🏆", String(finished), "Courses finished"],
  ];

  return (
    <div className="space-y-10">
      {/* Welcome */}
      <section className="flex animate-fade-up flex-wrap items-center gap-5">
        <Link href="/profile" className="relative size-20 shrink-0 transition hover:scale-105" aria-label="Open my profile">
          <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#6366f1,#d946ef,#22d3ee,#6366f1)]" />
          <div className="absolute inset-0.75 overflow-hidden rounded-full bg-slate-950">
            {u.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={u.image} alt="" referrerPolicy="no-referrer" className="size-full object-cover" />
            ) : (
              <div className="grid size-full place-items-center text-xl font-bold">{initials}</div>
            )}
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <p className="w-fit rounded-full bg-indigo-400/15 px-3 py-1 text-xs font-medium text-indigo-300">🎓 NextCollege Student</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Hi {firstName}! <span className="inline-block origin-[70%_70%] motion-safe:animate-bob">👋</span>
          </h1>
          <p className="text-slate-400">Ready to learn something new today?</p>
        </div>
        <Link href="/profile" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-white/10 active:scale-95">
          My profile
        </Link>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-3">
        {stats.map(([icon, value, label], i) => (
          <div key={label} style={{ animationDelay: `${100 + i * 100}ms` }} className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-4 text-center transition duration-300 hover:-translate-y-1">
            <div className="text-2xl">{icon}</div>
            <p className="mt-1 text-2xl font-extrabold">{value}</p>
            <p className="text-xs text-slate-400">{label}</p>
          </div>
        ))}
      </section>

      {/* My courses */}
      <section className="animate-fade-up [animation-delay:300ms]">
        <h2 className="mb-4 text-2xl font-bold tracking-tight">Pick up where you left off</h2>
        {mine.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
            <div className="text-4xl motion-safe:animate-bob">🌱</div>
            <p className="mt-2 font-semibold">You haven&apos;t started a course yet</p>
            <p className="text-sm text-slate-400">Pick one below. Everyone starts somewhere!</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {mine.map(({ course, done }) => {
              const total = course.lessons.length;
              const complete = done >= total;
              return (
                <Link key={course.slug} href={`/courses/${course.slug}`} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/10">
                  <div className={`grid size-12 shrink-0 place-items-center rounded-xl bg-linear-to-br ${course.gradient} text-xl transition group-hover:rotate-6`}>{course.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{course.name}</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-linear-to-r from-indigo-400 to-fuchsia-400 transition-all duration-700" style={{ width: `${(done / total) * 100}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{complete ? "🎉 Finished!" : `Lesson ${done + 1} of ${total} is next`}</p>
                  </div>
                  <span className="text-sm text-indigo-300 transition group-hover:translate-x-1">{complete ? "Review" : "Continue"} →</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Explore */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight">Explore {courses.length} courses</h2>
        <p className="mb-5 text-sm text-slate-400">Tap any course to see the lessons and start learning.</p>
        <CourseGrid progress={progress} />
      </section>
    </div>
  );
}
