export interface DubVideoInput {
  sourceVideoUrl?: string;
  fileUrl?: string;
  sourceLanguage: string;
  targetLanguage: string;
  subtitlesEnabled: boolean;
  translatedSubtitlesEnabled: boolean;
  dubbedAudioEnabled: boolean;
}

export interface VideoJobResult {
  jobId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  originalTranscript?: string;
  translatedTranscript?: string;
  outputVideoUrl?: string;
  errorMessage?: string;
}

export interface VideoProvider {
  name: string;
  dubVideo(input: DubVideoInput): Promise<VideoJobResult>;
  getJobStatus(jobId: string): Promise<VideoJobResult>;
}
