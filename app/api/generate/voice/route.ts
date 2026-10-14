import { NextResponse } from "next/server";
import { getVoiceProvider } from "@/lib/providers/voice";
import { createClient } from "@/lib/supabase/server";
import { debitCredits, refundCredits } from "@/lib/billing/wallet";

export async function POST(request: Request) {
  let userId: string | null = null;
  let reserved = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ success: false, error: "Sign in to synthesize speech." }, { status: 401 });
    const body = await request.json();
    if (typeof body.inputText !== "string" || !body.inputText.trim() || body.inputText.length > 10000) {
      return NextResponse.json({ success: false, error: "Enter text between 1 and 10,000 characters." }, { status: 400 });
    }
    userId = user.id;
    await debitCredits(userId, 2, "Voice synthesis");
    reserved = true;
    const provider = getVoiceProvider();

    const result = await provider.generateSpeech({
      inputText: body.inputText,
      language: body.language,
      voiceId: body.voiceId,
      voiceName: body.voiceName,
      gender: body.gender,
      tone: body.tone,
      speed: body.speed || 1.0,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to synthesize speech";
    if (userId && reserved) await refundCredits(userId, 2, "Voice synthesis failed");
    if (message === "INSUFFICIENT_CREDITS") return NextResponse.json({ success: false, error: "You need at least 2 credits. Add credits in Billing to continue." }, { status: 402 });
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
