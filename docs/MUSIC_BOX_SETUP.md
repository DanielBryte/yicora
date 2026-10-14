# Music Box account and environment setup

The Music Box integration needs Supabase, Cloudflare R2, and a Soundverse Enterprise API account. Never put provider or R2 secrets in a `NEXT_PUBLIC_` variable or browser code.

## 1. Supabase

Use the existing YiCORA Supabase project. Apply `supabase/migrations/20261008_music_box_jobs_and_assets.sql` in the Supabase SQL editor or through the project's migration workflow. The app uses Supabase Auth for signed-in ownership checks and Postgres RLS for music uploads and jobs. The service role key is used only by the server to resolve opt-in public song shares; never expose it to browser code or commit it.

Set the existing server environment values:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=your-server-only-service-role-key
```

## 2. Cloudflare R2

In Cloudflare, create a private R2 bucket for YiCORA media. Create an R2 API token scoped to this bucket with Object Read & Write permissions. Copy the S3 access key and secret when Cloudflare shows them; the secret is only shown once. Do not enable public bucket access.

Set these server-only variables in local `.env.local` and the deployment platform's secret settings:

```env
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-s3-access-key
R2_SECRET_ACCESS_KEY=your-r2-s3-secret-key
R2_BUCKET_NAME=your-private-bucket-name
```

The web app stores uploads and generated audio in R2 and creates short-lived signed playback URLs after checking the user's ownership in Supabase.

## 3. Soundverse

Create or use a Soundverse Enterprise API account, generate an API key, and make sure the account has access/balance for song generation, file uploads, and the `similar_song` tool. Set:

```env
SOUNDVERSE_API_KEY=your-server-side-soundverse-key
```

The key is used only by Next.js server routes. Provider generation is asynchronous; YiCORA stores the provider job ID and polls it from the server. The voice-reference path uses Soundverse's one-shot song workflow, so there is no separate reusable-clone setup fee. Song generation is still provider-billed; check the account balance and current per-step pricing before generating.

## 4. Local run

Add the values above to `.env.local` (not committed), apply the migration, then start YiCORA with `npm run dev`. Sign in before uploading audio or creating a song. Reference audio is limited to 15 MB and should only be audio the uploader owns or has permission to use.

## Not connected yet

The first slice supports idea/lyrics generation, a style reference, one-shot songs using a consented singer recording, opt-in public sharing, and remix attribution. Replacing speech in an existing audio/video and video lip-sync still need implementation. Those later integrations will need ElevenLabs and Sync Labs accounts/API keys; no key is required for the current slice.
