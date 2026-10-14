"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/utils/url";
import { Lock, Mail, ArrowRight, LoaderCircle } from "lucide-react";
import { GoogleIcon } from "@/components/shared/google-icon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const callbackError = new URLSearchParams(window.location.search).get("error");
    if (callbackError) {
      const timer = window.setTimeout(() => setError(callbackError), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const requestedNext = new URLSearchParams(window.location.search).get("next");
      const next = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/dashboard";
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (authError) throw authError;
      router.replace(next);
      router.refresh();
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "We couldn’t sign you in. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const supabase = createClient();
      const siteUrl = getSiteUrl();
      const requestedNext = new URLSearchParams(window.location.search).get("next");
      const next = requestedNext?.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/dashboard";
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}` },
      });
      if (authError) throw authError;
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Google sign-in isn’t available right now.");
    }
  };

  return (
    <div className="min-h-screen bg-burgundy-radial flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-darktext tracking-tight">Welcome back</h1>
          <p className="text-sm text-neutral-500 mt-1">Sign in to your YiCORA workspace</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-3 px-4 rounded-xl border border-neutral-200 hover:bg-neutral-50 font-medium text-sm text-darktext flex items-center justify-center gap-3 transition-colors mb-5 shadow-sm"
        >
          <GoogleIcon className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center mb-6">
          <div className="border-t border-neutral-200 w-full" />
          <span className="bg-white px-3 text-xs text-neutral-400 font-medium absolute">OR</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@yicora.com"
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-6 active:scale-95 disabled:opacity-50"
          >
            <span>{loading ? "Signing in..." : "Sign In"}</span>
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-sm font-medium text-berry hover:underline">Forgot password?</Link>
        </div>

        <p className="text-center text-xs text-neutral-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-berry hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
