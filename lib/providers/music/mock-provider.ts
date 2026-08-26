import { MusicProvider, GenerateMusicInput, MusicJobResult, MusicDNAAnalysis } from "./types";

export class MockMusicProvider implements MusicProvider {
  name = "MockMusicProvider (Dev Mode)";

  async generateMusic(input: GenerateMusicInput): Promise<MusicJobResult> {
    const jobId = `music_job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let title = "Afrobeats Rhythms";

    if (input.mode === "describe" && input.prompt) {
      title = input.prompt.split(" ").slice(0, 4).join(" ") || "African Melody";
    } else if (input.mode === "lyrics") {
      title = "Custom Lyric Composition";
    } else if (input.mode === "dna") {
      title = "Original DNA Transformation";
    }

    return {
      jobId,
      status: "completed",
      title,
      outputAudioUrl: "https://actions.google.com/sounds/v1/science_fiction/alien_beam.ogg",
      coverArtUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    };
  }

  async analyzeMusicDNA(audioUrl: string): Promise<MusicDNAAnalysis> {
    return {
      bpm: 112,
      energy: 85,
      mood: "Energetic",
      genre: "Afrobeats / Amapiano",
      instruments: ["Talking Drum", "Acoustic Guitar", "Log Drum", "Synth Pads"],
    };
  }

  async getJobStatus(jobId: string): Promise<MusicJobResult> {
    return {
      jobId,
      status: "completed",
      outputAudioUrl: "https://actions.google.com/sounds/v1/science_fiction/alien_beam.ogg",
      coverArtUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    };
  }
}
