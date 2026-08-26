"use client";

import { use } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { StatusBadge } from "@/components/shared/status-badge";
import { ArrowLeft, Download, RefreshCw, Trash2, Mic, Play, Pause } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VoiceProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;
  const [isPlaying, setIsPlaying] = useState(false);

  const voiceProject = {
    id: projectId,
    title: "Igbo App Voice Narration",
    language: "Igbo 🇳🇬",
    voiceName: "Emeka",
    gender: "Male",
    tone: "Warm & Expressive",
    speed: 1.0,
    status: "completed" as const,
    audioUrl: "https://actions.google.com/sounds/v1/speech/greeting_male_en.ogg",
    inputText:
      "Nnọọ na YiCORA. A bụ m olu kọmputa nke na-asụ asụsụ Africa n'ụzọ dị mfe ma doo anya. Anyị na-enyere gị aka ime ihe nkiri na egwu gị pụta ìhè.",
    durationSeconds: 14,
    createdAt: "August 26, 2026",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/voice"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-darktext"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Voice Studio</span>
          </Link>

          <div className="flex items-center gap-2">
            <StatusBadge status={voiceProject.status} />
            <button className="p-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Header card */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-darktext tracking-tight">{voiceProject.title}</h1>
            <p className="text-xs text-neutral-500 mt-1">Project ID: {voiceProject.id} • Synthesized {voiceProject.createdAt}</p>
          </div>

          <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200 text-xs">
            <Mic className="w-4 h-4 text-berry" />
            <span className="font-bold text-darktext">{voiceProject.voiceName} ({voiceProject.language})</span>
            <span className="text-neutral-400">•</span>
            <span className="text-neutral-600">{voiceProject.tone}</span>
          </div>
        </div>

        {/* Professional Audio Player Container */}
        <div className="bg-burgundy rounded-3xl p-8 text-white shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-300">Audio Preview</span>
            <span className="text-xs text-neutral-300 font-mono">{voiceProject.durationSeconds} Seconds</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-berry hover:bg-berry-hover text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 shrink-0"
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
            </button>

            <div className="flex-1 space-y-2">
              <div className="h-3 bg-white/10 rounded-full overflow-hidden relative cursor-pointer">
                <div className="h-full bg-berry w-1/3 rounded-full" />
              </div>
              <div className="flex justify-between text-xs text-neutral-400 font-mono">
                <span>0:04</span>
                <span>0:14</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-neutral-300">Format: Studio Lossless 48kHz WAV</span>
            <a
              href={voiceProject.audioUrl}
              download
              className="px-6 py-2.5 rounded-full bg-white text-darktext hover:bg-neutral-100 text-xs font-bold flex items-center gap-2 shadow-md transition-colors"
            >
              <Download className="w-4 h-4 text-berry" />
              <span>Download Audio WAV</span>
            </a>
          </div>
        </div>

        {/* Synthesized Script */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
          <h3 className="font-bold text-darktext text-sm">Synthesized Text Script</h3>
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-sm leading-relaxed text-neutral-700">
            {voiceProject.inputText}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
