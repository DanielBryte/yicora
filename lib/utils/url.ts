/**
 * Dynamically resolves the base URL of the application.
 * Priority:
 * 1. NEXT_PUBLIC_SITE_URL (Explicit production URL set in env vars, e.g., https://yicora.com)
 * 2. NEXT_PUBLIC_VERCEL_URL (Automatic Vercel deployment domain, e.g., yicora.vercel.app)
 * 3. SITE_URL (Server-side environment fallback)
 * 4. window.location.origin (Browser client context)
 * 5. http://localhost:3000 (Local development fallback)
 */
export function getSiteUrl(): string {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_URL ||
    process.env.SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

  // Ensure protocol is included
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Remove trailing slash if present
  return url.replace(/\/$/, "");
}
