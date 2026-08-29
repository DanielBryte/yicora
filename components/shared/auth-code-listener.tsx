"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function AuthCodeListener() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && typeof window !== "undefined" && !window.location.pathname.startsWith("/auth/callback")) {
      const next = searchParams.get("next") || "/dashboard";
      router.replace(`/auth/callback?code=${encodeURIComponent(code)}&next=${encodeURIComponent(next)}`);
    }
  }, [searchParams, router]);

  return null;
}
