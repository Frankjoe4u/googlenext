import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login?callbackUrl=/dashboard");

  const u = session.user;
  const initials = (u.name ?? u.email ?? "?").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
  const stats = [
    ["Role", u.role],
    ["Signed in with", u.provider],
    ["Member since", u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"],
  ];

  return (
    <div className="space-y-8">
      <div className="flex animate-fade-up items-center gap-5">
        {u.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u.image} alt="" referrerPolicy="no-referrer" className="size-16 rounded-full ring-2 ring-indigo-400/50" />
        ) : (
          <div className="grid size-16 place-items-center rounded-full bg-linear-to-br from-indigo-500 to-fuchsia-500 text-xl font-bold">{initials}</div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {u.name}</h1>
          <p className="text-slate-400">{u.email}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([label, value], i) => (
          <div
            key={label}
            style={{ animationDelay: `${120 + i * 100}ms` }}
            className="animate-fade-up rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-indigo-400/40"
          >
            <p className="text-xs uppercase tracking-widest text-slate-400">{label}</p>
            <p className="mt-2 text-xl font-semibold capitalize">{value}</p>
          </div>
        ))}
      </div>

      <div className="animate-fade-up rounded-2xl border border-white/10 bg-slate-900/70 p-5 [animation-delay:450ms]">
        <h2 className="mb-3 text-sm font-semibold text-slate-300">Session (populated by the jwt &amp; session callbacks)</h2>
        <pre className="overflow-auto text-xs leading-relaxed text-emerald-300">{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
