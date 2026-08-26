export interface GenerateMusicDescribeInput {
  mode: 'describe';
  prompt: string;
  genre: string;
  mood: string;
  language: string;
  vocalType: 'Male' | 'Female' | 'Instrumental';
  duration: string;
  energy: number;
  tempo: number;
}

export interface GenerateMusicLyricsInput {
  mode: 'lyrics';
  lyrics: string;
  genre: string;
  mood: string;
  vocalType: string;
  language: string;
  duration: string;
}

export interface MusicDNAAnalysis {
  bpm: number;
  energy: number;
  mood: string;
  genre: string;
  instruments: string[];
}

export interface GenerateMusicDNAInput {
  mode: 'dna';
  referenceUploadId?: string;
  referenceFileUrl?: string;
  modifiedEnergy: number;
  modifiedTempo: number;
  modifiedMood: string;
  modifiedInstrumentation: string[];
}

export type GenerateMusicInput =
  | GenerateMusicDescribeInput
  | GenerateMusicLyricsInput
  | GenerateMusicDNAInput;

export interface MusicJobResult {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  title?: string;
  outputAudioUrl?: string;
  coverArtUrl?: string;
  errorMessage?: string;
}

export interface MusicProvider {
  name: string;
  generateMusic(input: GenerateMusicInput): Promise<MusicJobResult>;
  analyzeMusicDNA(audioUrl: string): Promise<MusicDNAAnalysis>;
  getJobStatus(jobId: string): Promise<MusicJobResult>;
}
