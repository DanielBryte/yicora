"use client";

import { useEffect } from "react";

/**
 * AuthCodeListener - Last-resort client-side guard.
 *
 * Supabase sometimes falls back to the Site URL (/?code=...) instead of
 * /auth/callback when its Redirect URL allowlist doesn't match the redirectTo param.
 *
 * The proxy.ts should catch this server-side first. This component is a
 * belt-and-suspenders fallback in case the proxy doesn't run (e.g. CDN cache hit).
 *
 * Uses window.location.replace (not Next.js router) for an immediate hard redirect,
 * ensuring the code isn't lost during React hydration.
 */
export function AuthCodeListener() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code && !window.location.pathname.startsWith("/auth/callback")) {
      const next = params.get("next") || "/dashboard";
      const target = `/auth/callback?code=${encodeURIComponent(code)}&next=${encodeURIComponent(next)}`;
      console.log("[AuthCodeListener] Intercepted auth code, redirecting to:", target);
      // Hard redirect - bypasses Next.js router to ensure the code is not lost
      window.location.replace(target);
    }
  }, []);

  return null;
}
