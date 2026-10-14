import { createDecartClient } from "@decartai/sdk";
import { createClient } from "@/lib/supabase/server";
import { debitCredits, hasPaidAccess, refundCredits } from "@/lib/billing/wallet";

const REALTIME_MODELS = ["lucy-vton-latest", "lucy-2.5"] as const;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return Response.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return Response.json({ error: "Sign in to start a live session." }, { status: 401 });
  }
  if (!await hasPaidAccess(user.id)) {
    return Response.json({ error: "Live studios require a paid plan. Upgrade in Billing to continue." }, { status: 403 });
  }
  const sessionCredits = 25;
  try {
    await debitCredits(user.id, sessionCredits, "Live studio session (5 min)");
  } catch (error) {
    if (error instanceof Error && error.message === "INSUFFICIENT_CREDITS") {
      return Response.json({ error: `You need ${sessionCredits} credits for a live session. Add credits in Billing to continue.` }, { status: 402 });
    }
    return Response.json({ error: "Could not reserve credits for the live session." }, { status: 500 });
  }

  const apiKey = process.env.DECART_API_KEY;
  if (!apiKey) {
    await refundCredits(user.id, sessionCredits, "Live studio is not configured");
    return Response.json({ error: "The live studio is not configured yet. Contact support." }, { status: 503 });
  }

  try {
    const decart = createDecartClient({ apiKey });
    const token = await decart.tokens.create({
      expiresIn: 300,
      allowedModels: [...REALTIME_MODELS],
      allowedOrigins: [origin],
      constraints: { realtime: { maxSessionDuration: 5 * 60 } },
      metadata: { app: "yicora", userId: user.id },
    });

    return Response.json({ apiKey: token.apiKey, expiresAt: token.expiresAt }, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    await refundCredits(user.id, sessionCredits, "Live studio could not start");
    console.error("Live studio token creation failed:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Could not start a live session. Please try again." }, { status: 502 });
  }
}
