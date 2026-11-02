import Link from "next/link";
import { googleAction } from "@/lib/actions";
import { GoogleIcon } from "./google-icon";

type Props = {
  title: string;
  subtitle: string;
  error?: string;
  callbackUrl?: string;
  googleLabel: string;
  footer: { text: string; href: string; link: string };
  children: React.ReactNode;
};

export function AuthCard({ title, subtitle, error, callbackUrl = "/dashboard", googleLabel, footer, children }: Props) {
  return (
    <div className="mx-auto w-full max-w-md animate-fade-up rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>

      {error && (
        <p role="alert" className="mt-5 animate-shake rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">{children}</div>

      <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-slate-500">
        <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
      </div>

      <form action={googleAction}>
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]">
          <GoogleIcon /> {googleLabel}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        {footer.text}{" "}
        <Link href={footer.href} className="font-medium text-indigo-400 underline-offset-4 transition hover:text-indigo-300 hover:underline">
          {footer.link}
        </Link>
      </p>
    </div>
  );
}

export function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <input
        {...rest}
        className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-slate-500 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20"
      />
    </label>
  );
}
