import { NextResponse } from "next/server";
import { getVideoProvider } from "@/lib/providers/video";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const provider = getVideoProvider();

    const result = await provider.dubVideo({
      sourceVideoUrl: body.sourceVideoUrl,
      sourceLanguage: body.sourceLanguage || "en",
      targetLanguage: body.targetLanguage || "yo",
      subtitlesEnabled: body.subtitlesEnabled ?? true,
      translatedSubtitlesEnabled: body.translatedSubtitlesEnabled ?? true,
      dubbedAudioEnabled: body.dubbedAudioEnabled ?? true,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process video dubbing" },
      { status: 500 }
    );
  }
}
