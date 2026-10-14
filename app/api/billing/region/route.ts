import { headers } from "next/headers";

export async function GET() {
  const requestHeaders = await headers();
  const country = (requestHeaders.get("x-vercel-ip-country") || requestHeaders.get("cf-ipcountry") || "").toUpperCase();
  return Response.json({ currency: country === "NG" ? "NGN" : "USD" }, { headers: { "Cache-Control": "private, max-age=3600" } });
}
