"use client";

import Link from "next/link";
import { useState } from "react";
import { courses, tracks, type Level } from "@/lib/courses";

const levelStyle: Record<Level, string> = {
  Starter: "bg-emerald-400/15 text-emerald-300",
  "Getting there": "bg-amber-400/15 text-amber-300",
  Challenge: "bg-rose-400/15 text-rose-300",
};

/** progress: courseSlug -> lessons completed (only for enrolled courses) */
export function CourseGrid({ progress }: { progress: Record<string, number> }) {
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? courses : courses.filter((c) => c.track === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {["All", ...tracks].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition duration-300 active:scale-95 ${
              filter === t
                ? "bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div key={filter} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => {
          const done = progress[c.slug];
          const enrolled = done !== undefined;
          return (
            <Link
              key={c.slug}
              href={`/courses/${c.slug}`}
              style={{ animationDelay: `${i * 60}ms` }}
              className="group relative animate-fade-up overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 transition duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg] hover:border-white/25 hover:bg-white/10"
            >
              <div className={`absolute -right-8 -top-8 size-28 rounded-full bg-linear-to-br ${c.gradient} opacity-25 blur-2xl transition duration-500 group-hover:scale-150 group-hover:opacity-50`} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className={`grid size-14 place-items-center rounded-2xl bg-linear-to-br ${c.gradient} text-2xl shadow-md transition duration-300 group-hover:-rotate-6 group-hover:scale-110`}>
                    {c.emoji}
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${levelStyle[c.level]}`}>{c.level}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.blurb}</p>
                <p className="mt-3 text-xs text-slate-500">✏️ Mini project: {c.project}</p>

                <div className="mt-4 border-t border-white/10 pt-3 text-xs">
                  {enrolled ? (
                    <div>
                      <div className="mb-1.5 flex justify-between text-slate-300">
                        <span>{done >= c.lessons.length ? "🎉 Finished!" : "In progress"}</span>
                        <span>{done}/{c.lessons.length}</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-linear-to-r from-indigo-400 to-fuchsia-400 transition-all duration-700" style={{ width: `${(done / c.lessons.length) * 100}%` }} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between text-slate-400">
                      <span>{c.lessons.length} short lessons</span>
                      <span className="text-indigo-300 transition duration-300 group-hover:translate-x-1">Take a look →</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
