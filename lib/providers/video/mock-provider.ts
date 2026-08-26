import { VideoProvider, DubVideoInput, VideoJobResult } from "./types";

export class MockVideoProvider implements VideoProvider {
  name = "MockVideoProvider (Dev Mode)";

  async dubVideo(input: DubVideoInput): Promise<VideoJobResult> {
    const jobId = `video_job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    console.log(`[VideoProvider] Queuing job ${jobId} for target language ${input.targetLanguage}`);

    return {
      jobId,
      status: "processing",
      originalTranscript: `[Original Audio - ${input.sourceLanguage}] Welcome to YiCORA localization test video. This content highlights modern creative expression across Africa.`,
      translatedTranscript: `[Localized Audio - ${input.targetLanguage}] Nnọọ na YiCORA localization ule video. Ọdịnaya a na-egosipụta okike nke oge a n'ofe kọntinent Africa.`,
      outputVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    };
  }

  async getJobStatus(jobId: string): Promise<VideoJobResult> {
    return {
      jobId,
      status: "completed",
      outputVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    };
  }
}
