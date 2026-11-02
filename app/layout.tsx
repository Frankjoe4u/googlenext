import "./globals.css";
import { Navbar } from "@/components/navbar";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";

export const metadata = { title: APP_NAME, description: APP_TAGLINE };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 size-120 rounded-full bg-indigo-600/30 blur-3xl motion-safe:animate-float" />
          <div className="absolute -right-32 top-1/3 size-112 rounded-full bg-fuchsia-600/20 blur-3xl motion-safe:animate-float-slow" />
          <div className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-cyan-500/15 blur-3xl motion-safe:animate-float" />
        </div>
        <Navbar />
        <main className="mx-auto max-w-5xl px-6 py-14">{children}</main>
      </body>
    </html>
  );
}
