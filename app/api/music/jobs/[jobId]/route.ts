import { createClient } from "@/lib/supabase/server";
import { getMusicProvider } from "@/lib/providers/music";
import { getPrivateAssetUrl, storePrivateAsset } from "@/lib/storage/r2";
import { randomBytes } from "node:crypto";

export async function GET(_request: Request, context: { params: Promise<{ jobId: string }> }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Sign in to view this generation." }, { status: 401 });
    const { jobId } = await context.params;
    const { data: job, error } = await (supabase as any)
      .from("music_provider_jobs")
      .select("id, provider_job_id, status, title, output_audio_key, error_message, is_public, share_slug, remixed_from")
      .eq("id", jobId)
      .eq("user_id", user.id)
      .maybeSingle();
    if (error || !job) return Response.json({ error: "Generation not found." }, { status: 404 });

    if (job.status !== "completed" && job.status !== "failed") {
      const result = await getMusicProvider().getJobStatus(job.provider_job_id);
      let outputKey = job.output_audio_key as string | null;
      if (result.status === "completed" && !result.outputAudioUrl && !outputKey) {
        throw new Error("The provider finished the song but did not return a downloadable audio file.");
      }
      if (result.status === "completed" && result.outputAudioUrl && !outputKey) {
        const mediaResponse = await fetch(result.outputAudioUrl, { cache: "no-store" });
        if (!mediaResponse.ok) throw new Error("The finished audio could not be copied into your private library.");
        const audioBytes = new Uint8Array(await mediaResponse.arrayBuffer());
        if (audioBytes.byteLength > 100 * 1024 * 1024) throw new Error("The generated audio exceeds the 100 MB storage limit.");
        outputKey = `users/${user.id}/music-outputs/${job.id}.mp3`;
        await storePrivateAsset(outputKey, audioBytes, "audio/mpeg");
      }
      const { error: updateError } = await (supabase as any)
        .from("music_provider_jobs")
        .update({ status: result.status, title: result.title || job.title, output_audio_key: outputKey, error_message: result.errorMessage || null, updated_at: new Date().toISOString() })
        .eq("id", job.id)
        .eq("user_id", user.id);
      if (updateError) throw new Error("Could not update generation status.");
      job.status = result.status;
      job.title = result.title || job.title;
      job.output_audio_key = outputKey;
      job.error_message = result.errorMessage || null;
    }

    const audioUrl = job.output_audio_key ? await getPrivateAssetUrl(job.output_audio_key) : null;
    return Response.json({ jobId: job.id, status: job.status, title: job.title, audioUrl, isPublic: job.is_public, shareSlug: job.share_slug, remixedFrom: job.remixed_from, error: job.error_message });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not load generation status.";
    return Response.json({ error: message }, { status: 502 });
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ jobId: string }> }) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Sign in to manage sharing." }, { status: 401 });
    const { jobId } = await context.params;
    const { isPublic } = await request.json();
    if (typeof isPublic !== "boolean") return Response.json({ error: "Choose whether this song should be public." }, { status: 400 });
    const { data: job } = await (supabase as any).from("music_provider_jobs").select("id, status, share_slug").eq("id", jobId).eq("user_id", user.id).maybeSingle();
    if (!job) return Response.json({ error: "Song not found." }, { status: 404 });
    if (isPublic && job.status !== "completed") return Response.json({ error: "Only finished songs can be shared." }, { status: 409 });
    const slug = job.share_slug || randomShareSlug();
    const { error } = await (supabase as any).from("music_provider_jobs").update({ is_public: isPublic, share_slug: slug, updated_at: new Date().toISOString() }).eq("id", jobId).eq("user_id", user.id);
    if (error) throw new Error("Could not update sharing settings.");
    return Response.json({ isPublic, shareUrl: isPublic ? `/s/${slug}` : null });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not update sharing settings.";
    return Response.json({ error: message }, { status: 502 });
  }
}

function randomShareSlug() {
  return randomBytes(12).toString("hex");
}
