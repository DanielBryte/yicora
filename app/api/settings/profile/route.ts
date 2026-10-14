import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const AVATAR_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return Response.json({ error: "Sign in to manage your profile." }, { status: 401 });

    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin.from("profiles").select("full_name, avatar_url").eq("id", user.id).maybeSingle();
    if (profileError) throw profileError;
    return Response.json({
      profile: {
        full_name: profile?.full_name || String(user.user_metadata?.full_name || ""),
        avatar_url: profile?.avatar_url || (typeof user.user_metadata?.avatar_url === "string" ? user.user_metadata.avatar_url : null),
        email: user.email || "",
      },
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Profile load failed:", error);
    return Response.json({ error: "Could not load your profile right now." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return Response.json({ error: "Sign in to update your profile." }, { status: 401 });

    const formData = await request.formData();
    const fullName = String(formData.get("fullName") || "").trim();
    if (!fullName || fullName.length > 80) {
      return Response.json({ error: "Enter a name up to 80 characters long." }, { status: 400 });
    }

    const avatarEntry = formData.get("avatar");
    if (avatarEntry && !(avatarEntry instanceof File)) {
      return Response.json({ error: "Choose a valid image file." }, { status: 400 });
    }
    if (avatarEntry instanceof File && avatarEntry.size > MAX_AVATAR_BYTES) {
      return Response.json({ error: "Your profile photo must be 5 MB or smaller." }, { status: 413 });
    }
    if (avatarEntry instanceof File && !(avatarEntry.type in AVATAR_TYPES)) {
      return Response.json({ error: "Choose a JPG, PNG, or WebP image." }, { status: 415 });
    }

    const admin = createAdminClient();
    const { data: currentProfile } = await admin.from("profiles").select("id, avatar_url").eq("id", user.id).maybeSingle();
    let avatarUrl = currentProfile?.avatar_url || null;
    let uploadedPath: string | null = null;

    if (avatarEntry instanceof File) {
      const extension = AVATAR_TYPES[avatarEntry.type];
      const objectPath = `${user.id}/${crypto.randomUUID()}.${extension}`;
      const { error: uploadError } = await admin.storage.from("avatars").upload(
        objectPath,
        new Uint8Array(await avatarEntry.arrayBuffer()),
        { contentType: avatarEntry.type, cacheControl: "3600", upsert: false },
      );
      if (uploadError) {
        console.error("Profile photo upload failed:", uploadError.message);
        return Response.json({ error: "Could not upload your photo. Please try again." }, { status: 500 });
      }
      uploadedPath = objectPath;
      avatarUrl = admin.storage.from("avatars").getPublicUrl(objectPath).data.publicUrl;
    }

    const profileChanges = { full_name: fullName, avatar_url: avatarUrl, updated_at: new Date().toISOString() };
    const { error: updateError } = currentProfile
      ? await admin.from("profiles").update(profileChanges).eq("id", user.id)
      : await admin.from("profiles").insert({ id: user.id, ...profileChanges });
    if (updateError && uploadedPath) await admin.storage.from("avatars").remove([uploadedPath]);
    if (updateError) throw updateError;

    return Response.json({ profile: { full_name: fullName, avatar_url: avatarUrl, email: user.email || "" } });
  } catch (error) {
    console.error("Profile update failed:", error);
    return Response.json({ error: "Could not save your profile right now." }, { status: 500 });
  }
}
