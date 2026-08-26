import { NextResponse } from "next/server";
import { getVoiceProvider } from "@/lib/providers/voice";

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to synthesize speech" },
      { status: 500 }
    );
  }
}
