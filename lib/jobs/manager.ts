export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface AsyncJobState {
  id: string;
  projectId: string;
  type: 'video' | 'voice' | 'music';
  status: JobStatus;
  progress: number;
  currentStep: string;
  steps: string[];
  outputUrl?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export class JobManager {
  private static instance: JobManager;
  private jobs: Map<string, AsyncJobState> = new Map();

  private constructor() {}

  public static getInstance(): JobManager {
    if (!JobManager.instance) {
      JobManager.instance = new JobManager();
    }
    return JobManager.instance;
  }

  public createJob(projectId: string, type: 'video' | 'voice' | 'music', steps: string[]): AsyncJobState {
    const job: AsyncJobState = {
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      projectId,
      type,
      status: 'queued',
      progress: 0,
      currentStep: steps[0] || 'Initiating job...',
      steps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.jobs.set(job.id, job);
    return job;
  }

  public updateJob(jobId: string, updates: Partial<AsyncJobState>): AsyncJobState | null {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    const updated = {
      ...job,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.jobs.set(jobId, updated);
    return updated;
  }

  public getJob(jobId: string): AsyncJobState | undefined {
    return this.jobs.get(jobId);
  }
}
