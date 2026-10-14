"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, LoaderCircle, Mail, Send } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/utils/url";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const supabase = createClient();
      const redirectTo = `${getSiteUrl()}/auth/callback?next=${encodeURIComponent("/reset-password")}`;
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (resetError) throw resetError;
      setSent(true);
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : "We couldn’t send a reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-burgundy-radial p-4">
      <section className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-8 shadow-2xl">
        <div className="mb-7 flex justify-center"><Logo /></div>
        <h1 className="text-center text-2xl font-bold tracking-tight text-darktext">Reset your password</h1>
        <p className="mt-2 text-center text-sm leading-6 text-neutral-500">Enter the email for your YiCORA account and we’ll send you a secure reset link.</p>

        {error && <div role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {sent ? (
          <div role="status" className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
            If an account exists for <strong>{email}</strong>, a password reset link is on its way. Check your inbox and spam folder.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label htmlFor="reset-email" className="block text-xs font-semibold uppercase text-neutral-600">Email address</label>
            <div className="relative -mt-2">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
              <input id="reset-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-4 text-sm text-darktext outline-none focus:border-berry focus:ring-2 focus:ring-berry/20" />
            </div>
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-berry py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-berry-hover disabled:opacity-60">
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {loading ? "Sending link…" : "Send reset link"}
            </button>
          </form>
        )}
        <Link href="/login" className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-berry hover:underline"><ArrowLeft className="h-4 w-4" /> Back to sign in</Link>
      </section>
    </main>
  );
}
