"use client";

import { useState } from "react";
import { courses, tracks, type Level } from "@/lib/courses";

const levelStyle: Record<Level, string> = {
  Beginner: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Intermediate: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  Advanced: "border-rose-400/30 bg-rose-400/10 text-rose-300",
};

export function CourseGrid() {
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? courses : courses.filter((c) => c.track === filter);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {["All", ...tracks].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition duration-300 active:scale-95 ${
              filter === t
                ? "border-transparent bg-linear-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30"
                : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* key replays the entrance animation whenever the filter changes */}
      <div key={filter} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => (
          <article
            key={c.name}
            style={{ animationDelay: `${i * 70}ms` }}
            className="group relative animate-fade-up overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:bg-white/10"
          >
            <div className={`absolute -right-10 -top-10 size-32 rounded-full bg-linear-to-br ${c.gradient} opacity-20 blur-2xl transition duration-500 group-hover:scale-150 group-hover:opacity-50`} />
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className={`grid size-12 place-items-center rounded-xl bg-linear-to-br ${c.gradient} text-xs font-extrabold text-white shadow-lg transition duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                  {c.tag}
                </div>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${levelStyle[c.level]}`}>{c.level}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{c.blurb}</p>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-slate-400">
                <span>{c.lessons} lessons · {c.hours}h</span>
                <span className="text-indigo-300 transition duration-300 group-hover:translate-x-1">{c.track} →</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
