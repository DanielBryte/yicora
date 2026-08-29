import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { Database } from "@/types/database.types";

export async function updateSession(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  // Fail-safe: If Supabase falls back to the Site URL (e.g. /?code=...) instead of /auth/callback,
  // intercept the code here and forward it to the proper exchange route.
  if (code && !requestUrl.pathname.startsWith("/auth/callback")) {
    const callbackUrl = new URL("/auth/callback", request.url);
    callbackUrl.searchParams.set("code", code);
    callbackUrl.searchParams.set("next", requestUrl.searchParams.get("next") || "/dashboard");
    return NextResponse.redirect(callbackUrl);
  }

  let supabaseResponse = NextResponse.next({ request });

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
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return supabaseResponse;
}
