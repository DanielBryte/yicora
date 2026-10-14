"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/app/dashboard/layout";
import { ArrowLeft, Check, Copy, Download, Loader2, Music, Share2 } from "lucide-react";

type JobView = { status: string; title?: string; audioUrl?: string | null; error?: string | null; isPublic?: boolean; shareSlug?: string | null };

export default function MusicJobPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const [job, setJob] = useState<JobView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [shareBusy, setShareBusy] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`/api/music/jobs/${jobId}`, { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Could not open this song.");
        if (active) setJob(payload);
      })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "Could not open this song."); });
    return () => { active = false; };
  }, [jobId]);

  const toggleShare = async () => {
    if (!job) return;
    setShareBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/music/jobs/${jobId}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isPublic: !job.isPublic }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update sharing.");
      setJob({ ...job, isPublic: result.isPublic, shareSlug: result.shareUrl?.split("/").pop() || job.shareSlug });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update sharing.");
    } finally {
      setShareBusy(false);
    }
  };

  const copyShareLink = async () => {
    if (!job?.shareSlug) return;
    await navigator.clipboard.writeText(`${window.location.origin}/s/${job.shareSlug}`);
    setShareCopied(true);
    window.setTimeout(() => setShareCopied(false), 1800);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Link href="/music" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-darktext">
          <ArrowLeft className="h-4 w-4" /> Back to Music Box
        </Link>
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-berry text-white"><Music className="h-7 w-7" /></div>
            <div>
              <h1 className="text-2xl font-bold text-darktext">{job?.title || "Your new song"}</h1>
              <p className="mt-2 text-sm text-neutral-500">{error || job?.error || "Your track is saved in your private library."}</p>
            </div>
            {job?.audioUrl ? <audio controls className="w-full" src={job.audioUrl} /> : !error && job?.status !== "failed" ? <Loader2 className="h-5 w-5 animate-spin text-berry" /> : null}
            {job?.audioUrl && <a href={job.audioUrl} download className="inline-flex items-center gap-2 rounded-full bg-berry px-5 py-3 text-sm font-semibold text-white"><Download className="h-4 w-4" />Download song</a>}
            {job?.audioUrl && (
              <div className="w-full max-w-lg rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-left">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div><h2 className="text-sm font-semibold text-darktext">Share your song</h2><p className="mt-1 text-xs text-neutral-500">Public pages include the audio and a link to make a remix.</p></div>
                  <button type="button" onClick={toggleShare} disabled={shareBusy} className="inline-flex items-center gap-2 rounded-full bg-berry px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50">
                    <Share2 className="h-3.5 w-3.5" />{shareBusy ? "Updating…" : job.isPublic ? "Turn sharing off" : "Make song public"}
                  </button>
                </div>
                {job.isPublic && <button type="button" onClick={copyShareLink} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-berry">{shareCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{shareCopied ? "Link copied" : "Copy public link"}</button>}
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
