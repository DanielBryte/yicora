import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/database.types";

export async function updateSession(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // Fail-safe handler: If OAuth or Email login returns a `code` query parameter
  // to the root URL or any non-callback route (e.g., when Supabase Dashboard Site URL fallback triggers),
  // automatically forward to /auth/callback so the authorization code is exchanged for a session.
  if (code && !requestUrl.pathname.startsWith("/auth/callback")) {
    const callbackUrl = new URL("/auth/callback", request.url);
    callbackUrl.searchParams.set("code", code);
    if (!callbackUrl.searchParams.has("next")) {
      callbackUrl.searchParams.set("next", "/dashboard");
    }
    return NextResponse.redirect(callbackUrl);
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-yicora.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key",
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh auth token if needed
  await supabase.auth.getUser();

  return supabaseResponse;
}
