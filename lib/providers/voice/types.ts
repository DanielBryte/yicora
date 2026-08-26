export interface VoiceOption {
  id: string;
  name: string;
  language: string;
  gender: 'Male' | 'Female';
  avatarUrl: string;
  previewAudioUrl: string;
  description: string;
}

export interface GenerateVoiceInput {
  inputText: string;
  language: string;
  voiceId: string;
  voiceName: string;
  gender: string;
  tone?: string;
  speed: number;
}

export interface VoiceJobResult {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  outputAudioUrl?: string;
  durationSeconds?: number;
  errorMessage?: string;
}

export interface VoiceProvider {
  name: string;
  getVoices(): Promise<VoiceOption[]>;
  generateSpeech(input: GenerateVoiceInput): Promise<VoiceJobResult>;
  getJobStatus(jobId: string): Promise<VoiceJobResult>;
}
