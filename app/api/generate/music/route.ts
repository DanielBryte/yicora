import { NextResponse } from "next/server";
import { getMusicProvider } from "@/lib/providers/music";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const provider = getMusicProvider();

    const result = await provider.generateMusic(body);

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to generate music" },
      { status: 500 }
    );
  }
}
