import type { GenerateMusicInput, MusicDNAAnalysis, MusicJobResult, MusicProvider } from "./types";
import { randomUUID } from "node:crypto";

const API_BASE = "https://apiv2.soundverse.ai";

type SoundverseResponse = {
  job_id?: string;
  task_id?: string;
  id?: string;
  status?: string;
  output?: { audio_url?: string; title?: string; assets?: Array<{ file_id?: string; type?: string }>; metadata_json?: string };
  audio_url?: string;
  title?: string;
  error?: string;
  file_id?: string;
  download_url?: string;
  signed_url?: string;
  url?: string;
};

function mapStatus(status?: string): MusicJobResult["status"] {
  if (status === "completed" || status === "success") return "completed";
  if (status === "failed" || status === "error") return "failed";
  if (status === "processing" || status === "running") return "processing";
  return "queued";
}

async function providerRequest(path: string, init?: RequestInit): Promise<SoundverseResponse> {
  const apiKey = process.env.SOUNDVERSE_API_KEY;
  if (!apiKey) throw new Error("Music generation is not configured yet. Add SOUNDVERSE_API_KEY to the server environment.");

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as SoundverseResponse;
  if (!response.ok) throw new Error(payload.error || `Music provider returned ${response.status}`);
  return payload;
}

export async function uploadSoundverseReference(file: File): Promise<string> {
  const apiKey = process.env.SOUNDVERSE_API_KEY;
  if (!apiKey) throw new Error("Music generation is not configured yet. Add SOUNDVERSE_API_KEY to the server environment.");
  const formData = new FormData();
  formData.append("file", file, file.name);
  const response = await fetch(`${API_BASE}/v1/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}` },
    body: formData,
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => ({}))) as SoundverseResponse;
  if (!response.ok) throw new Error(payload.error || `Reference upload failed (${response.status}).`);
  const fileId = payload.file_id || payload.id;
  if (!fileId) throw new Error("Music provider did not return a reference file ID.");
  return fileId;
}

export class SoundverseMusicProvider implements MusicProvider {
  name = "Soundverse";

  async generateMusic(input: GenerateMusicInput): Promise<MusicJobResult> {
    const referenceFileId = "referenceFileId" in input ? input.referenceFileId : undefined;
    const voiceFileId = "voiceFileId" in input ? input.voiceFileId : undefined;
    const lyrics = input.mode === "lyrics" ? input.lyrics : undefined;
    const prompt = input.mode === "describe"
      ? `${input.prompt}. Genre: ${input.genre}. Mood: ${input.mood}. Language: ${input.language}. Tempo: ${input.tempo} BPM. Energy: ${input.energy}%.`
      : input.mode === "lyrics"
        ? `${input.genre}, ${input.mood}, ${input.language}, ${input.duration}`
        : `Original song inspired by the uploaded reference. Energy ${input.modifiedEnergy}%, tempo ${input.modifiedTempo} BPM, mood ${input.modifiedMood}.`;
    if (voiceFileId && referenceFileId) throw new Error("For now, choose either a singer voice sample or a separate music reference. The singer sample will guide the song style from your genre and mood settings.");
    const path = voiceFileId ? "/v1/voice-songs" : referenceFileId ? "/v1/generations" : "/v7/generate/song";
    const voiceSongGenre = input.mode === "describe"
      ? `${input.genre}, ${input.mood}, ${input.prompt}`
      : input.mode === "lyrics"
        ? `${input.genre}, ${input.mood}, ${input.language}, ${input.duration}`
        : `${input.modifiedMood}, ${input.modifiedTempo} BPM`;
    const body = voiceFileId
      ? { voice_file_id: voiceFileId, genre: voiceSongGenre.slice(0, 1024), ...(lyrics ? { lyrics: lyrics.slice(0, 3000) } : {}) }
      : referenceFileId
      ? { tool_id: "similar_song", payload_json: JSON.stringify({ song_reference: { file_id: referenceFileId }, ...(lyrics ? { lyrics: lyrics.slice(0, 3000) } : {}), versions: 1 }) }
      : {
          prompt: prompt.slice(0, 1024),
          ...(lyrics ? { lyrics: lyrics.slice(0, 3000) } : {}),
          ...(input.mode !== "dna" && (input.vocalType.toLowerCase() === "male" || input.vocalType.toLowerCase() === "female")
            ? { gender: input.vocalType.toLowerCase() }
            : {}),
          parameters: { versions: 1 },
        };
    const response = await providerRequest(path, {
      method: "POST",
      headers: { "Idempotency-Key": randomUUID() },
      body: JSON.stringify(body),
    });

    const jobId = response.job_id || response.task_id || response.id;
    if (!jobId) throw new Error("Music provider did not return a job ID.");
    return { jobId, status: mapStatus(response.status), title: response.title };
  }

  async getJobStatus(jobId: string): Promise<MusicJobResult> {
    const response = await providerRequest(`/v1/generations/${encodeURIComponent(jobId)}`);
    const fileId = response.output?.assets?.find((asset) => asset.type === "audio")?.file_id || response.output?.assets?.[0]?.file_id;
    let outputAudioUrl = response.audio_url || response.output?.audio_url;
    if (mapStatus(response.status) === "completed" && fileId) {
      const download = await providerRequest(`/v1/files/${encodeURIComponent(fileId)}/download`);
      outputAudioUrl = download.download_url || download.signed_url || download.url;
    }
    return {
      jobId,
      status: mapStatus(response.status),
      title: response.title || response.output?.title,
      outputAudioUrl,
      errorMessage: response.status === "failed" ? response.error : undefined,
    };
  }

  async analyzeMusicDNA(_audioUrl: string): Promise<MusicDNAAnalysis> {
    throw new Error("Reference analysis is not available yet.");
  }
}
