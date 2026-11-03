export const tracks = ["Frontend", "Backend", "Database", "Tools"] as const;
export type Track = (typeof tracks)[number];
export type Level = "Starter" | "Getting there" | "Challenge";

export type Course = {
  slug: string;
  name: string;
  emoji: string;
  track: Track;
  level: Level;
  blurb: string;
  project: string;
  lessons: string[];
  gradient: string;
};

export const courses: Course[] = [
  { slug: "html", name: "HTML5", emoji: "🧱", track: "Frontend", level: "Starter", blurb: "Build your very first web page from scratch.", project: "A page all about you", gradient: "from-orange-400 to-rose-400",
    lessons: ["What is HTML?", "Headings, text and links", "Adding images", "Lists and tables", "Put it all together"] },
  { slug: "css", name: "CSS3", emoji: "🎨", track: "Frontend", level: "Starter", blurb: "Add colors, fonts and layout so your page looks great.", project: "Style your About Me page", gradient: "from-sky-400 to-indigo-400",
    lessons: ["Colors and fonts", "The box model", "Flexbox basics", "Grid layouts", "Simple animations"] },
  { slug: "tailwind", name: "Tailwind CSS", emoji: "💨", track: "Frontend", level: "Getting there", blurb: "Style faster using ready-made classes.", project: "A friendly landing page", gradient: "from-cyan-300 to-teal-400",
    lessons: ["Why Tailwind?", "Spacing and colors", "Responsive design", "Hover effects", "Build a landing page"] },
  { slug: "javascript", name: "JavaScript", emoji: "⚡", track: "Frontend", level: "Getting there", blurb: "Make your pages react to clicks and typing.", project: "A tiny to-do list", gradient: "from-yellow-300 to-orange-400",
    lessons: ["Variables and types", "Functions", "Arrays and loops", "The DOM", "Events and clicks"] },
  { slug: "typescript", name: "TypeScript", emoji: "🛡️", track: "Frontend", level: "Getting there", blurb: "JavaScript with safety nets that catch mistakes early.", project: "Add types to your to-do list", gradient: "from-blue-400 to-indigo-500",
    lessons: ["Why types?", "Basic types", "Interfaces", "Functions with types", "Convert a JS project"] },
  { slug: "react", name: "React", emoji: "⚛️", track: "Frontend", level: "Challenge", blurb: "Build pages out of small, reusable pieces.", project: "A mini student profile card", gradient: "from-cyan-300 to-blue-400",
    lessons: ["Components", "Props", "State", "Lists and keys", "Build a small app"] },
  { slug: "nextjs", name: "Next.js", emoji: "🚀", track: "Frontend", level: "Challenge", blurb: "Turn your React ideas into a real website.", project: "A class notice board", gradient: "from-violet-400 to-fuchsia-400",
    lessons: ["Pages and routing", "Server and client", "Fetching data", "Forms and actions", "Put it online"] },
  { slug: "nodejs", name: "Node.js", emoji: "🔧", track: "Backend", level: "Getting there", blurb: "Write code that runs on a server.", project: "A simple quotes API", gradient: "from-lime-300 to-green-400",
    lessons: ["What is Node?", "Modules and npm", "Make a server", "Routes", "Build a small API"] },
  { slug: "mongodb", name: "MongoDB", emoji: "🍃", track: "Database", level: "Getting there", blurb: "Save information as flexible documents.", project: "A reading list saver", gradient: "from-green-300 to-emerald-500",
    lessons: ["Databases 101", "Documents and collections", "Create and read", "Update and delete", "Connect to an app"] },
  { slug: "supabase", name: "Supabase", emoji: "🔋", track: "Database", level: "Getting there", blurb: "A friendly database with login built in.", project: "A class guestbook", gradient: "from-emerald-300 to-teal-400",
    lessons: ["What is Supabase?", "Tables", "Reading data", "Sign up and log in", "Build a guestbook"] },
  { slug: "postgresql", name: "PostgreSQL", emoji: "🐘", track: "Database", level: "Challenge", blurb: "Organize data in tables and ask it questions.", project: "A school library tracker", gradient: "from-indigo-300 to-blue-500",
    lessons: ["Tables and rows", "SELECT basics", "Filtering and sorting", "Joins", "Design a small database"] },
  { slug: "git", name: "Git & GitHub", emoji: "🌿", track: "Tools", level: "Starter", blurb: "Save your work and share it with others.", project: "Upload your first project", gradient: "from-rose-300 to-orange-400",
    lessons: ["What is Git?", "Commit your work", "Branches", "GitHub basics", "Push a project"] },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
