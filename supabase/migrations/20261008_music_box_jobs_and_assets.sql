CREATE TABLE IF NOT EXISTS public.music_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  object_key TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  purpose TEXT NOT NULL CHECK (purpose IN ('song_reference', 'voice_reference', 'video_reference')),
  provider_file_id TEXT,
  consent_confirmed BOOLEAN NOT NULL DEFAULT false,
  consent_attestation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.music_provider_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'soundverse',
  provider_job_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  title TEXT,
  output_audio_key TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  share_slug TEXT UNIQUE,
  remixed_from UUID REFERENCES public.music_provider_jobs(id) ON DELETE SET NULL,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.music_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_provider_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users access own music assets" ON public.music_assets FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users access own music jobs" ON public.music_provider_jobs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
