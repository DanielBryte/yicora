-- YiCORA Initial Migration Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  credits INTEGER DEFAULT 50 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('video', 'voice', 'music')),
  status TEXT NOT NULL CHECK (status IN ('draft', 'queued', 'processing', 'completed', 'failed')) DEFAULT 'queued',
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. VIDEO GENERATIONS TABLE
CREATE TABLE IF NOT EXISTS public.video_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  source_video_url TEXT,
  source_language TEXT NOT NULL,
  target_language TEXT NOT NULL,
  subtitles_enabled BOOLEAN DEFAULT true,
  translated_subtitles_enabled BOOLEAN DEFAULT true,
  dubbed_audio_enabled BOOLEAN DEFAULT true,
  original_transcript TEXT,
  translated_transcript TEXT,
  output_video_url TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 4. VOICE GENERATIONS TABLE
CREATE TABLE IF NOT EXISTS public.voice_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  input_text TEXT NOT NULL,
  language TEXT NOT NULL,
  voice_id TEXT NOT NULL,
  voice_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  tone TEXT,
  speed NUMERIC DEFAULT 1.0,
  output_audio_url TEXT,
  duration_seconds NUMERIC,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 5. MUSIC GENERATIONS TABLE
CREATE TABLE IF NOT EXISTS public.music_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('describe', 'lyrics', 'dna')),
  prompt TEXT,
  lyrics TEXT,
  genre TEXT,
  mood TEXT,
  language TEXT,
  vocal_type TEXT,
  duration TEXT,
  energy INTEGER DEFAULT 50,
  tempo INTEGER DEFAULT 110,
  dna_characteristics JSONB,
  output_audio_url TEXT,
  cover_art_url TEXT,
  parent_generation_id UUID REFERENCES public.music_generations(id),
  variation_prompt TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 6. CREDIT TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('credit', 'debit', 'refund')),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 7. REFERENCE UPLOADS TABLE
CREATE TABLE IF NOT EXISTS public.reference_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  analysis_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.music_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reference_uploads ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users access own projects" ON public.projects FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users access own video gens" ON public.video_generations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = video_generations.project_id AND projects.user_id = auth.uid())
);

CREATE POLICY "Users access own voice gens" ON public.voice_generations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = voice_generations.project_id AND projects.user_id = auth.uid())
);

CREATE POLICY "Users access own music gens" ON public.music_generations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.projects WHERE projects.id = music_generations.project_id AND projects.user_id = auth.uid())
);

CREATE POLICY "Users read own credit transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users access own reference uploads" ON public.reference_uploads FOR ALL USING (auth.uid() = user_id);

-- TRIGGER FOR NEW USER CREATION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, credits)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    50
  );
  
  -- Record initial free bonus credits
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (NEW.id, 50, 'credit', 'Welcome bonus credits');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- DROP IF EXISTS BEFORE RE-CREATING TRIGGER
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
