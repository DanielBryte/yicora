import { randomUUID } from "node:crypto";
import { createClient } from "@/lib/supabase/server";
import { storePrivateAsset } from "@/lib/storage/r2";
import { uploadSoundverseReference } from "@/lib/providers/music/soundverse-provider";

const MAX_AUDIO_BYTES = 15 * 1024 * 1024;
const AUDIO_TYPES = new Set(["audio/mpeg", "audio/mp4", "audio/aac", "audio/wav", "audio/x-wav", "audio/flac", "audio/ogg"]);

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Sign in to upload audio." }, { status: 401 });

    const form = await request.formData();
    const file = form.get("file");
    const purpose = form.get("purpose");
    const consent = form.get("consent") === "true";
    if (!(file instanceof File)) return Response.json({ error: "Choose an audio file." }, { status: 400 });
    if (purpose !== "song_reference" && purpose !== "voice_reference") return Response.json({ error: "Choose a valid audio purpose." }, { status: 400 });
    if (!AUDIO_TYPES.has(file.type)) return Response.json({ error: "Upload MP3, M4A, AAC, WAV, FLAC, or OGG audio." }, { status: 415 });
    if (file.size > MAX_AUDIO_BYTES) return Response.json({ error: "Audio files must be 15 MB or smaller." }, { status: 413 });
    if (purpose === "voice_reference" && !consent) return Response.json({ error: "Confirm you own this voice or have permission to use it." }, { status: 400 });
    if (purpose === "voice_reference" && !["audio/mpeg", "audio/mp4"].includes(file.type)) return Response.json({ error: "Voice references must be MP3 or M4A audio." }, { status: 415 });

    const assetId = randomUUID();
    const objectKey = `users/${user.id}/music-inputs/${assetId}`;
    const bytes = new Uint8Array(await file.arrayBuffer());
    await storePrivateAsset(objectKey, bytes, file.type);
    const providerFileId = await uploadSoundverseReference(file);
    const { error } = await (supabase as any).from("music_assets").insert({
      id: assetId,
      user_id: user.id,
      object_key: objectKey,
      file_name: file.name.slice(0, 255),
      content_type: file.type,
      size_bytes: file.size,
      purpose,
      provider_file_id: providerFileId,
      consent_confirmed: consent,
      consent_attestation: consent ? "Uploader confirms they are the speaker or have explicit permission from the speaker, and have rights to use this recording for AI song generation." : null,
    });
    if (error) throw new Error("Could not save upload metadata. Apply the Music Box database migration and try again.");
    return Response.json({ assetId, purpose }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    const status = message.includes("not configured") ? 503 : 502;
    return Response.json({ error: message }, { status });
  }
}
