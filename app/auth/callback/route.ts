import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams, origin } = requestUrl;
  const code = searchParams.get("code");
  const providerError = searchParams.get("error_description") || searchParams.get("error");
  const requestedNext = searchParams.get("next") ?? "/dashboard";
  const next = requestedNext.startsWith("/") && !requestedNext.startsWith("//") ? requestedNext : "/dashboard";

  if (providerError) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(providerError)}`);
  }

  if (!code) {
    console.error("[auth/callback] No code param found in URL:", request.url);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("This sign-in link is incomplete or has expired. Please try again.")}`);
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] exchangeCodeForSession error:", error.message);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
    }

    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";

    if (isLocalEnv || !forwardedHost) {
      return NextResponse.redirect(`${origin}${next}`);
    }

    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } catch (error) {
    console.error("[auth/callback] Session exchange failed:", error);
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent("We couldn’t complete sign-in. Please try again.")}`);
  }
}
