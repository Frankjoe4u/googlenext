import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { completeLessonAction, enrollAction } from "@/lib/actions";
import { getCourse } from "@/lib/courses";
import { SubmitButton } from "@/components/submit-button";

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const session = await auth();
  if (!session) redirect(`/login?callbackUrl=/courses/${slug}`);

  const enrollment = await prisma.enrollment.findUnique({
    where: { userId_courseSlug: { userId: session.user.id, courseSlug: slug } },
  });
  const enrolled = !!enrollment;
  const done = enrollment?.completedLessons ?? 0;
  const total = course.lessons.length;
  const complete = done >= total;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Link href="/dashboard" className="inline-block text-sm text-slate-400 transition hover:-translate-x-1 hover:text-white">← Back to dashboard</Link>

      <section className="relative animate-fade-up overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8">
        <div className={`absolute -right-10 -top-10 size-48 rounded-full bg-linear-to-br ${course.gradient} opacity-30 blur-3xl`} />
        <div className="relative">
          <div className={`grid size-16 place-items-center rounded-2xl bg-linear-to-br ${course.gradient} text-3xl shadow-lg motion-safe:animate-bob`}>{course.emoji}</div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">{course.name}</h1>
          <p className="mt-1 text-slate-300">{course.blurb}</p>
          <p className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">✏️ Mini project: {course.project}</p>

          {enrolled ? (
            <div className="mt-6">
              <div className="mb-1.5 flex justify-between text-sm text-slate-300">
                <span>Your progress</span>
                <span>{done} of {total} lessons</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-linear-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 transition-all duration-700" style={{ width: `${(done / total) * 100}%` }} />
              </div>
            </div>
          ) : (
            <form action={enrollAction.bind(null, slug)} className="mt-6 max-w-xs">
              <SubmitButton>Start this course 🚀</SubmitButton>
            </form>
          )}
        </div>
      </section>

      {complete && (
        <div className="animate-fade-up rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6 text-center">
          <div className="text-5xl motion-safe:animate-bob">🎉</div>
          <p className="mt-2 text-xl font-bold">You finished {course.name}!</p>
          <p className="text-sm text-slate-300">Now go build your mini project: {course.project}.</p>
        </div>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-bold">Lessons</h2>
        {course.lessons.map((title, i) => {
          const isDone = i < done;
          const isNext = enrolled && i === done;
          return (
            <div
              key={title}
              style={{ animationDelay: `${i * 80}ms` }}
              className={`flex animate-fade-up items-center gap-4 rounded-2xl border p-4 transition duration-300 ${
                isDone ? "border-emerald-400/30 bg-emerald-400/10" : isNext ? "border-indigo-400/50 bg-indigo-400/10" : "border-white/10 bg-white/5"
              }`}
            >
              <div className={`grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold ${isDone ? "bg-emerald-400 text-slate-900" : isNext ? "bg-indigo-400 text-slate-900" : "bg-white/10 text-slate-400"}`}>
                {isDone ? "✓" : i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{title}</p>
                {isNext && <p className="text-xs text-indigo-300">Up next</p>}
              </div>
              {isNext && (
                <form action={completeLessonAction.bind(null, slug)}>
                  <button className="rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 hover:bg-indigo-400 active:scale-95">Mark done ✓</button>
                </form>
              )}
            </div>
          );
        })}
        {!enrolled && <p className="text-sm text-slate-400">Start the course to begin ticking off lessons.</p>}
      </section>
    </div>
  );
}
