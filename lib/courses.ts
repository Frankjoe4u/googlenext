export const tracks = ["Frontend", "Backend", "Database", "Tools"] as const;
export type Track = (typeof tracks)[number];
export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Course = {
  name: string;
  tag: string;
  track: Track;
  level: Level;
  lessons: number;
  hours: number;
  blurb: string;
  gradient: string;
};

export const courses: Course[] = [
  { name: "HTML5", tag: "HTML", track: "Frontend", level: "Beginner", lessons: 18, hours: 6, blurb: "Structure real web pages with semantic, accessible markup.", gradient: "from-orange-500 to-red-500" },
  { name: "CSS3", tag: "CSS", track: "Frontend", level: "Beginner", lessons: 22, hours: 8, blurb: "Layouts, flexbox, grid and animations that feel alive.", gradient: "from-sky-500 to-blue-600" },
  { name: "Tailwind CSS", tag: "TW", track: "Frontend", level: "Beginner", lessons: 16, hours: 5, blurb: "Style at lightning speed with utility-first design.", gradient: "from-cyan-400 to-teal-500" },
  { name: "JavaScript", tag: "JS", track: "Frontend", level: "Intermediate", lessons: 34, hours: 14, blurb: "The language of the web: logic, DOM, async and more.", gradient: "from-amber-400 to-orange-500" },
  { name: "TypeScript", tag: "TS", track: "Frontend", level: "Intermediate", lessons: 24, hours: 9, blurb: "Catch bugs before they ship with type-safe JavaScript.", gradient: "from-blue-500 to-indigo-600" },
  { name: "React", tag: "React", track: "Frontend", level: "Intermediate", lessons: 30, hours: 12, blurb: "Build interactive UIs from small, reusable components.", gradient: "from-cyan-400 to-blue-500" },
  { name: "Next.js", tag: "Next", track: "Frontend", level: "Advanced", lessons: 28, hours: 12, blurb: "Full-stack React apps with routing, server components and auth.", gradient: "from-slate-500 to-zinc-800" },
  { name: "Node.js", tag: "Node", track: "Backend", level: "Intermediate", lessons: 26, hours: 10, blurb: "Run JavaScript on the server and build fast APIs.", gradient: "from-lime-500 to-green-600" },
  { name: "MongoDB", tag: "Mongo", track: "Database", level: "Intermediate", lessons: 20, hours: 7, blurb: "Store flexible documents in a modern NoSQL database.", gradient: "from-green-500 to-emerald-700" },
  { name: "Supabase", tag: "Supa", track: "Database", level: "Intermediate", lessons: 18, hours: 7, blurb: "Postgres, auth and storage without running a server.", gradient: "from-emerald-400 to-green-600" },
  { name: "PostgreSQL", tag: "SQL", track: "Database", level: "Advanced", lessons: 24, hours: 10, blurb: "Model relational data and write powerful queries.", gradient: "from-indigo-500 to-blue-700" },
  { name: "Git & GitHub", tag: "Git", track: "Tools", level: "Beginner", lessons: 12, hours: 4, blurb: "Version your code, collaborate and deploy with confidence.", gradient: "from-rose-500 to-orange-600" },
];
