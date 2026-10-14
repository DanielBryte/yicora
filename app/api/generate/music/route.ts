import { getMusicProvider } from "@/lib/providers/music";
import { createClient } from "@/lib/supabase/server";
import { debitCredits, refundCredits } from "@/lib/billing/wallet";

export async function POST(request: Request) {
  let userId: string | null = null;
  let creditsReserved = false;
  let providerStarted = false;
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ success: false, error: "Sign in to create music." }, { status: 401 });
    userId = user.id;

    const body = await request.json();
    if (!body || !["describe", "lyrics", "dna"].includes(body.mode)) {
      return Response.json({ success: false, error: "Choose a valid creation mode." }, { status: 400 });
    }
    if (body.mode === "describe" && (typeof body.prompt !== "string" || !body.prompt.trim())) {
      return Response.json({ success: false, error: "Describe the song you want to make." }, { status: 400 });
    }
    if (body.mode === "lyrics" && (typeof body.lyrics !== "string" || !body.lyrics.trim())) {
      return Response.json({ success: false, error: "Add lyrics before generating." }, { status: 400 });
    }
    if (body.mode === "dna" && !body.referenceAssetId) {
      return Response.json({ success: false, error: "Upload a reference track before creating from Music DNA." }, { status: 400 });
    }
    let referenceFileId: string | undefined;
    let voiceFileId: string | undefined;
    if (body.voiceAssetId) {
      const { data: voice, error } = await (supabase as any)
        .from("music_assets")
        .select("provider_file_id, purpose, consent_confirmed")
        .eq("id", body.voiceAssetId)
        .eq("user_id", user.id)
        .maybeSingle();
      if (error || !voice || voice.purpose !== "voice_reference" || !voice.consent_confirmed) {
        return Response.json({ success: false, error: "That consented voice reference is unavailable." }, { status: 400 });
      }
      voiceFileId = voice.provider_file_id;
    }
    if (body.referenceAssetId) {
      const { data: asset, error } = await (supabase as any)
        .from("music_assets")
        .select("provider_file_id, purpose")
        .eq("id", body.referenceAssetId)
        .eq("user_id", user.id)
        .maybeSingle();
      if (error || !asset || asset.purpose !== "song_reference") {
        return Response.json({ success: false, error: "That reference audio is unavailable." }, { status: 400 });
      }
      referenceFileId = asset.provider_file_id;
    }
    if (voiceFileId && referenceFileId) return Response.json({ success: false, error: "Choose either a singer’s voice sample or a separate music reference for this song." }, { status: 400 });
    let remixedFrom: string | null = null;
    if (body.inspiredBy) {
      const { data: original } = await (supabase as any).from("music_provider_jobs")
        .select("id")
        .eq("share_slug", body.inspiredBy)
        .eq("is_public", true)
        .maybeSingle();
      if (!original) return Response.json({ success: false, error: "That shared song is no longer available." }, { status: 404 });
      remixedFrom = original.id;
    }
    await debitCredits(user.id, 10, "Music generation");
    creditsReserved = true;
    const provider = getMusicProvider();
    const result = await provider.generateMusic({ ...body, ...(referenceFileId ? { referenceFileId } : {}), ...(voiceFileId ? { voiceFileId } : {}) });
    providerStarted = true;
    const { data: job, error: jobError } = await (supabase as any)
      .from("music_provider_jobs")
      .insert({ user_id: user.id, provider: "soundverse", provider_job_id: result.jobId, status: result.status, title: result.title, remixed_from: remixedFrom })
      .select("id")
      .single();
    if (jobError || !job) throw new Error("Could not save your job. Apply the Music Box database migration and try again.");
    return Response.json({ success: true, jobId: job.id, status: result.status });
  } catch (error) {
    if (userId && creditsReserved && !providerStarted) await refundCredits(userId, 10, "Music generation failed");
    const message = error instanceof Error ? error.message : "Failed to generate music";
    if (message === "INSUFFICIENT_CREDITS") return Response.json({ success: false, error: "You need at least 10 credits. Add credits in Billing to continue." }, { status: 402 });
    return Response.json({ success: false, error: message }, { status: 502 });
  }
}
