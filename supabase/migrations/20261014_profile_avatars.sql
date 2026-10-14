-- Public profile photos are stored in Supabase Storage and written by the authenticated server route.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public can view profile avatars" ON storage.objects;
CREATE POLICY "Public can view profile avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
