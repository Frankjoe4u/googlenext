import { AuthCard, Field } from "@/components/auth-card";
import { SubmitButton } from "@/components/submit-button";
import { loginAction } from "@/lib/actions";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl = "/dashboard" } = await searchParams;
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to your dashboard."
      error={error}
      callbackUrl={callbackUrl}
      googleLabel="Continue with Google"
      footer={{ text: "New here?", href: "/register", link: "Create an account" }}
    >
      <form action={loginAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
        <Field label="Password" name="password" type="password" placeholder="••••••••" required />
        <SubmitButton>Sign in</SubmitButton>
      </form>
    </AuthCard>
  );
}
