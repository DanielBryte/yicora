import { createAdminClient } from "@/lib/supabase/admin";
import { getPrivateAssetUrl } from "@/lib/storage/r2";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const supabase = createAdminClient();
    const { data: job, error } = await (supabase as any).from("music_provider_jobs")
      .select("id, title, output_audio_key, remixed_from")
      .eq("share_slug", slug)
      .eq("is_public", true)
      .eq("status", "completed")
      .maybeSingle();
    if (error || !job || !job.output_audio_key) return Response.json({ error: "This shared song is unavailable." }, { status: 404 });
    return Response.json({ title: job.title || "A song made with YiCORA", audioUrl: await getPrivateAssetUrl(job.output_audio_key), inspiredBy: job.remixed_from ? "another YiCORA creator" : null });
  } catch {
    return Response.json({ error: "Could not open this shared song." }, { status: 500 });
  }
}
