"use client";

import { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, Loader2, Music } from "lucide-react";

interface ProcessingScreenProps {
  onComplete: () => void;
  onError: (message: string) => void;
  jobId: string | null;
}

const STEPS = [
  "Understanding your idea",
  "Writing / preparing composition",
  "Creating instrumentation",
  "Generating vocals",
  "Finalizing your song",
];

export function MusicProcessingScreen({ onComplete, onError, jobId }: ProcessingScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let polls = 0;
    const poll = async () => {
      if (!jobId) {
        timer = setTimeout(poll, 400);
        return;
      }
      try {
        const response = await fetch(`/api/music/jobs/${jobId}`, { cache: "no-store" });
        const job = await response.json();
        if (!response.ok) throw new Error(job.error || "Could not check song status.");
        if (cancelled) return;
        if (job.status === "completed") {
          setProgress(100);
          setCurrentStepIndex(STEPS.length - 1);
          timer = setTimeout(onComplete, 500);
          return;
        }
        if (job.status === "failed") throw new Error(job.error || "Song generation failed. Please try again.");
        polls += 1;
        setCurrentStepIndex(Math.min(STEPS.length - 1, Math.floor(polls / 3)));
        setProgress(Math.min(90, 15 + polls * 3));
        timer = setTimeout(poll, 3000);
      } catch (error) {
        if (!cancelled) onError(error instanceof Error ? error.message : "Could not check song status.");
      }
    };
    poll();
    return () => { cancelled = true; clearTimeout(timer); };
  }, [jobId, onComplete, onError]);

  return (
    <div className="bg-burgundy rounded-3xl p-8 sm:p-12 text-white max-w-2xl mx-auto text-center space-y-8 shadow-2xl border border-white/20 animate-in fade-in duration-300">
      <div className="w-16 h-16 rounded-3xl bg-berry text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
        <Music className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Creating your song...</h2>
        <p className="text-pink-200 text-xs sm:text-sm mt-1">YiCORA AI is orchestrating stems and vocal tracks</p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 max-w-md mx-auto">
        <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
          <div
            className="h-full bg-[#a864ff] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-neutral-300 font-mono">
          <span>{progress}% Completed</span>
          <span>Studio AI Active</span>
        </div>
      </div>

      {/* Animated Steps */}
      <div className="space-y-3 text-left max-w-md mx-auto bg-white/5 p-6 rounded-2xl border border-white/10">
        {STEPS.map((step, index) => {
          const isDone = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div key={index} className="flex items-center gap-3 text-xs sm:text-sm font-medium">
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-pink-300 animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-white/20 shrink-0" />
              )}

              <span
                className={
                  isDone
                    ? "text-neutral-300 line-through opacity-70"
                    : isCurrent
                    ? "text-white font-bold"
                    : "text-neutral-500"
                }
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
