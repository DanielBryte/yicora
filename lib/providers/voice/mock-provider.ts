import { VoiceProvider, VoiceOption, GenerateVoiceInput, VoiceJobResult } from "./types";

export const AFRICAN_VOICE_PRESETS: VoiceOption[] = [
  {
    id: "ng_dayo",
    name: "Dayo",
    language: "Nigerian English",
    gender: "Male",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
    description: "Warm, confident executive tone for narrations & brand stories.",
  },
  {
    id: "ng_amina",
    name: "Amina",
    language: "Nigerian English",
    gender: "Female",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_female_en.ogg",
    description: "Articulate, expressive voice ideal for audiobooks and educational podcasts.",
  },
  {
    id: "yo_tunde",
    name: "Tunde",
    language: "Yoruba",
    gender: "Male",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
    description: "Resonant native Yoruba speaker with authentic cultural cadence.",
  },
  {
    id: "yo_folake",
    name: "Folake",
    language: "Yoruba",
    gender: "Female",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_female_en.ogg",
    description: "Melodic Yoruba voice perfect for storytelling and commercials.",
  },
  {
    id: "ig_emeka",
    name: "Emeka",
    language: "Igbo",
    gender: "Male",
    avatarUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
    description: "Rich, deep Igbo voice with natural phrasing.",
  },
  {
    id: "ig_chidimma",
    name: "Chidimma",
    language: "Igbo",
    gender: "Female",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_female_en.ogg",
    description: "Smooth, friendly Igbo vocal style for mobile apps and media.",
  },
  {
    id: "ha_usman",
    name: "Usman",
    language: "Hausa",
    gender: "Male",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
    description: "Clear, authoritative Hausa voice suited for broadcasting.",
  },
  {
    id: "pd_kofe",
    name: "Kofe",
    language: "Pidgin English",
    gender: "Male",
    avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
    description: "Energetic West African Pidgin voice for pop culture and radio.",
  },
  {
    id: "sw_juma",
    name: "Juma",
    language: "Swahili",
    gender: "Male",
    avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    previewAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
    description: "Classic East African Swahili voice with balanced speed.",
  }
];

export class MockVoiceProvider implements VoiceProvider {
  name = "MockVoiceProvider (Dev Mode)";

  async getVoices(): Promise<VoiceOption[]> {
    return AFRICAN_VOICE_PRESETS;
  }

  async generateSpeech(input: GenerateVoiceInput): Promise<VoiceJobResult> {
    const jobId = `voice_job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return {
      jobId,
      status: "completed",
      outputAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
      durationSeconds: Math.max(3, Math.round(input.inputText.length / 15)),
    };
  }

  async getJobStatus(jobId: string): Promise<VoiceJobResult> {
    return {
      jobId,
      status: "completed",
      outputAudioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
      durationSeconds: 12,
    };
  }
}
