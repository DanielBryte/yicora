import { NextResponse } from "next/server";
import { JobManager } from "@/lib/jobs/manager";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;
  const jobManager = JobManager.getInstance();
  const job = jobManager.getJob(jobId);

  if (!job) {
    return NextResponse.json(
      { success: true, jobId, status: "completed", progress: 100 },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true, job });
}
