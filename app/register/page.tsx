import { AuthCard, Field } from "@/components/auth-card";
import { SubmitButton } from "@/components/submit-button";
import { registerAction } from "@/lib/actions";

export default async function Register({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <AuthCard
      title="Create your account"
      subtitle="It takes less than a minute."
      error={error}
      googleLabel="Sign up with Google"
      footer={{ text: "Already have an account?", href: "/login", link: "Sign in" }}
    >
      <form action={registerAction} className="space-y-4">
        <Field label="Name" name="name" placeholder="Ada Lovelace" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
        <Field label="Password" name="password" type="password" placeholder="Min. 8 characters" minLength={8} required />
        <SubmitButton>Create account</SubmitButton>
      </form>
    </AuthCard>
  );
}
