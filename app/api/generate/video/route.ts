import { NextResponse } from "next/server";
import { getVideoProvider } from "@/lib/providers/video";
import { createClient } from "@/lib/supabase/server";
import { debitCredits, hasPaidAccess, refundCredits } from "@/lib/billing/wallet";

export async function POST(request: Request) {
  let userId: string | null = null;
  let reserved = false;
  let providerSucceeded = false;
  let cost = 0;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: "Sign in to process video." }, { status: 401 });
    userId = user.id;
    if (!await hasPaidAccess(user.id)) return NextResponse.json({ success: false, error: "Video studios require a paid plan. Upgrade in Billing to continue." }, { status: 403 });
    const body = await request.json();
    const durationMinutes = Number(body.durationMinutes);
    if (!Number.isFinite(durationMinutes) || durationMinutes < 1 || durationMinutes > 60) {
      return NextResponse.json({ success: false, error: "Choose a video duration from 1 to 60 minutes." }, { status: 400 });
    }
    cost = Math.ceil(durationMinutes) * 5;
    await debitCredits(user.id, cost, `Video dubbing (${Math.ceil(durationMinutes)} min)`);
    reserved = true;
    const provider = getVideoProvider();

    const result = await provider.dubVideo({
      sourceVideoUrl: body.sourceVideoUrl,
      sourceLanguage: body.sourceLanguage || "en",
      targetLanguage: body.targetLanguage || "yo",
      subtitlesEnabled: body.subtitlesEnabled ?? true,
      translatedSubtitlesEnabled: body.translatedSubtitlesEnabled ?? true,
      dubbedAudioEnabled: body.dubbedAudioEnabled ?? true,
    });
    providerSucceeded = true;

    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process video dubbing";
    if (userId && reserved && !providerSucceeded) await refundCredits(userId, cost, "Video dubbing failed");
    if (message === "INSUFFICIENT_CREDITS") return NextResponse.json({ success: false, error: `You need ${cost} credits for this video. Add credits in Billing to continue.` }, { status: 402 });
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
