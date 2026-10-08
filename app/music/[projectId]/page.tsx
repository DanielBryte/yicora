"use client";

import { use, useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { StatusBadge } from "@/components/shared/status-badge";
import { VariationModal } from "@/components/music/variation-modal";
import { Play, Pause, Download, Sparkles, RefreshCw, Trash2, ArrowLeft, Disc, Music, FileText } from "lucide-react";
import Link from "next/link";

export default function MusicProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const [isPlaying, setIsPlaying] = useState(false);
  const [showVariationModal, setShowVariationModal] = useState(false);

  const song = {
    id: projectId,
    title: "Lagos Dreams & Golden Sun",
    genre: "Afrobeats / Amapiano",
    mood: "Energetic & Uplifting",
    language: "Yoruba / English",
    duration: "2:45",
    coverArtUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    audioUrl: "https://actions.google.com/sounds/v1/science_fiction/alien_beam.ogg",
    status: "completed" as const,
    prompt: "Create an energetic Afrobeats song about a young person leaving home to chase their dreams. Warm guitars, African percussion, catchy chorus and uplifting energy.",
    lyrics: `[Verse 1]\nWaking up in Lagos city with the morning sun\nGot my dreams packed in my bag, my journey has begun\n\n[Chorus]\nOya dance, make we celebrate life\nNo matter the hustle, we go reach the light`,
    bpm: 112,
    energy: 85,
    createdAt: "August 26, 2026",
  };

  const handleCreateVariation = (variationType: string) => {
    alert(`Generating ${variationType} variation for song "${song.title}"!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-darktext"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to YiCORA Music Box</span>
          </Link>

          <div className="flex items-center gap-2">
            <StatusBadge status={song.status} />
            <button className="p-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Music Player Card */}
        <div className="space-y-6 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-7">
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            {/* Artwork */}
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-neutral-200 sm:h-44 sm:w-44">
              <img src={song.coverArtUrl} alt={song.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Disc className="w-10 h-10 text-white animate-spin" />
              </div>
            </div>

            {/* Song Meta & Controls */}
            <div className="flex-1 text-center md:text-left space-y-3 w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full bg-berry text-white font-bold text-xs uppercase tracking-wider">
                  {song.genre}
                </span>
                <span className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700">
                  {song.mood}
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-darktext sm:text-4xl">{song.title}</h1>
              <p className="text-xs text-neutral-500">
                Language: {song.language} • {song.bpm} BPM • Duration: {song.duration}
              </p>

              {/* Player Progress */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 rounded-full bg-berry hover:bg-berry-hover text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 shrink-0"
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                </button>

                <div className="flex-1 space-y-1.5">
                  <div className="relative h-2 cursor-pointer overflow-hidden rounded-full bg-neutral-100">
                    <div className="h-full w-2/5 rounded-full bg-berry" />
                  </div>
                  <div className="flex justify-between font-mono text-xs text-neutral-500">
                    <span>1:06</span>
                    <span>{song.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-5 sm:flex-row">
            <button
              onClick={() => setShowVariationModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 sm:w-auto"
            >
              <Sparkles className="h-4 w-4 text-berry" />
              <span>Create Variation</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={song.audioUrl}
                download
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-berry px-5 py-2.5 text-sm font-semibold text-white hover:bg-berry-hover sm:w-auto"
              >
                <Download className="w-4 h-4" />
                <span>Download Master Audio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
            <h3 className="font-bold text-darktext text-sm flex items-center gap-2">
              <Music className="w-4 h-4 text-berry" />
              <span>Composition Prompt</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed p-4 bg-neutral-50 rounded-2xl border border-neutral-200 font-medium">
              {song.prompt}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-3">
            <h3 className="font-bold text-darktext text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-berry" />
              <span>Song Lyrics</span>
            </h3>
            <pre className="text-xs text-neutral-700 leading-relaxed p-4 bg-neutral-50 rounded-2xl border border-neutral-200 font-mono whitespace-pre-wrap">
              {song.lyrics}
            </pre>
          </div>
        </div>

        {/* Variation Modal */}
        <VariationModal
          isOpen={showVariationModal}
          onClose={() => setShowVariationModal(false)}
          onSelectVariation={handleCreateVariation}
        />
      </div>
    </DashboardLayout>
  );
}
