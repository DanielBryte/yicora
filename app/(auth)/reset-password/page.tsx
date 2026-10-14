"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, LoaderCircle, Lock } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    if (password !== confirmPassword) return setError("Those passwords don’t match.");
    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setUpdated(true);
      window.setTimeout(() => {
        router.replace("/dashboard");
        router.refresh();
      }, 1600);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "We couldn’t update your password. Request a new reset link and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-burgundy-radial p-4">
      <section className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-8 shadow-2xl">
        <div className="mb-7 flex justify-center"><Logo /></div>
        <h1 className="text-center text-2xl font-bold tracking-tight text-darktext">Choose a new password</h1>
        <p className="mt-2 text-center text-sm leading-6 text-neutral-500">Use at least 8 characters to secure your account.</p>

        {error && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {updated ? (
          <div role="status" className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />Password updated. Taking you to your workspace…</div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="new-password" className="mb-1.5 block text-xs font-semibold uppercase text-neutral-600">New password</label>
              <div className="relative"><Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" /><input id="new-password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-darktext outline-none focus:border-berry focus:ring-2 focus:ring-berry/20" /></div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-semibold uppercase text-neutral-600">Confirm new password</label>
              <div className="relative"><Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" /><input id="confirm-password" type="password" autoComplete="new-password" minLength={8} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-darktext outline-none focus:border-berry focus:ring-2 focus:ring-berry/20" /></div>
            </div>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-berry py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-berry-hover disabled:opacity-60">
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {loading ? "Updating password…" : "Update password"}
            </button>
          </form>
        )}
        <Link href="/login" className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-berry hover:underline"><ArrowLeft className="h-4 w-4" /> Back to sign in</Link>
      </section>
    </main>
  );
}
