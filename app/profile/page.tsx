import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateProfileAction } from "@/lib/actions";
import { SubmitButton } from "@/components/submit-button";
import { Field } from "@/components/auth-card";
import { getCourse } from "@/lib/courses";

export default async function Profile({ searchParams }: { searchParams: Promise<{ saved?: string; error?: string }> }) {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/profile");

  const { saved, error } = await searchParams;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { enrollments: true },
  });
  if (!user) redirect("/login");

  const studentId = `NC-${user.createdAt.getFullYear()}-${user.id.slice(-5).toUpperCase()}`;
  const joined = user.createdAt.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
  const lessonsDone = user.enrollments.reduce((s, e) => s + e.completedLessons, 0);
  const finished = user.enrollments.filter((e) => {
    const c = getCourse(e.courseSlug);
    return c && e.completedLessons >= c.lessons.length;
  }).length;
  const initials = (user.name ?? user.email).split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Student ID card */}
      <section className="relative animate-fade-up overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-indigo-600/40 via-fuchsia-600/25 to-cyan-500/25 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">NextCollege · Student ID</p>
        <div className="mt-4 flex items-center gap-5">
          <div className="relative size-24 shrink-0">
            <div className="absolute inset-0 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#6366f1,#d946ef,#22d3ee,#6366f1)]" />
            <div className="absolute inset-0.75 overflow-hidden rounded-full bg-slate-950">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt="" referrerPolicy="no-referrer" className="size-full object-cover" />
              ) : (
                <div className="grid size-full place-items-center text-2xl font-bold">{initials}</div>
              )}
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold">{user.name}</h1>
            <p className="truncate text-sm text-slate-300">{user.email}</p>
            <p className="mt-2 w-fit rounded-md bg-black/30 px-2 py-1 font-mono text-xs tracking-wider">{studentId}</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          {[
            [String(user.enrollments.length), "Courses started"],
            [String(lessonsDone), "Lessons done"],
            [String(finished), "Finished"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-black/25 p-3">
              <p className="text-xl font-extrabold">{v}</p>
              <p className="text-[11px] text-slate-300">{l}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-300">Student since {joined}</p>
      </section>

      {/* About me */}
      {(user.goal || user.bio) && (
        <section className="animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-6 [animation-delay:100ms]">
          {user.goal && (
            <p className="text-sm"><span className="text-slate-400">🎯 I want to build:</span> <span className="font-medium">{user.goal}</span></p>
          )}
          {user.bio && <p className="mt-3 text-slate-300">{user.bio}</p>}
        </section>
      )}

      {/* Edit */}
      <section className="animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-6 [animation-delay:200ms]">
        <h2 className="text-lg font-bold">Edit my profile</h2>
        {saved && <p className="mt-3 animate-fade-up rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">✅ Profile saved!</p>}
        {error && <p className="mt-3 animate-shake rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-300">{error}</p>}
        <form action={updateProfileAction} className="mt-4 space-y-4">
          <Field label="Name" name="name" defaultValue={user.name ?? ""} required />
          <Field label="What do you want to build?" name="goal" defaultValue={user.goal ?? ""} placeholder="e.g. my own portfolio website" maxLength={80} />
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-300">About me</span>
            <textarea
              name="bio"
              defaultValue={user.bio ?? ""}
              maxLength={200}
              rows={3}
              placeholder="A few words about you..."
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
            />
          </label>
          <SubmitButton>Save changes</SubmitButton>
        </form>
      </section>
    </div>
  );
}
