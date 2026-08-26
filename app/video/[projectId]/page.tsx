"use client";

import { use, useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { StatusBadge } from "@/components/shared/status-badge";
import { Download, RefreshCw, Trash2, ArrowLeft, Languages, FileText } from "lucide-react";
import Link from "next/link";

export default function VideoProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const resolvedParams = use(params);
  const projectId = resolvedParams.projectId;

  const [activeTranscriptTab, setActiveTranscriptTab] = useState<"translated" | "original">("translated");

  // Sample data for rendering
  const project = {
    id: projectId,
    title: "Nollywood Short Film Localization",
    sourceLang: "English",
    targetLang: "Yoruba 🇳🇬",
    status: "completed" as const,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    originalTranscript:
      "Welcome to this special broadcast. Today we explore the vibrant cinema industry in West Africa, detailing how storytellers bring rich cultural narratives to life for global audiences.",
    translatedTranscript:
      "Ẹkạbọ si eto pataki yii. Loni a n tẹnu bọ ile-iṣẹ aworan ti a n pe ni Nollywood ni Iwo-Oorun Africa, n ṣalaye bi awọn onibara aladun ti n fi aṣa alailẹgbẹ wa han gbogbo agbaye.",
    createdAt: "August 26, 2026",
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href="/video"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-darktext"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Video Studio</span>
          </Link>

          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} />
            <button className="p-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Language Meta */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-darktext tracking-tight">{project.title}</h1>
            <p className="text-xs text-neutral-500 mt-1">Project ID: {project.id} • Created {project.createdAt}</p>
          </div>

          <div className="flex items-center gap-3 bg-neutral-50 p-3 rounded-2xl border border-neutral-200">
            <Languages className="w-4 h-4 text-berry" />
            <span className="text-xs font-semibold text-neutral-600">{project.sourceLang}</span>
            <span className="text-xs text-neutral-400">→</span>
            <span className="text-xs font-bold text-darktext">{project.targetLang}</span>
          </div>
        </div>

        {/* Main Grid: Video Player + Transcript */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Video Player */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-4 border border-neutral-200/80 shadow-sm space-y-4">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-inner">
              <video src={project.videoUrl} controls className="w-full h-full object-contain" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-neutral-500 font-medium">Rendered Output: 1080p MP4</span>
              <a
                href={project.videoUrl}
                download
                className="px-5 py-2.5 rounded-full bg-berry hover:bg-berry-hover text-white text-xs font-semibold flex items-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Dubbed Video</span>
              </a>
            </div>
          </div>

          {/* Transcript Viewer */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-berry" />
                  <h3 className="font-bold text-darktext text-sm">Transcript & Subtitles</h3>
                </div>

                <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTranscriptTab("translated")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTranscriptTab === "translated"
                        ? "bg-white text-darktext shadow-sm"
                        : "text-neutral-500 hover:text-darktext"
                    }`}
                  >
                    Localized
                  </button>
                  <button
                    onClick={() => setActiveTranscriptTab("original")}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      activeTranscriptTab === "original"
                        ? "bg-white text-darktext shadow-sm"
                        : "text-neutral-500 hover:text-darktext"
                    }`}
                  >
                    Original
                  </button>
                </div>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-sm leading-relaxed text-neutral-700 min-h-[200px]">
                {activeTranscriptTab === "translated"
                  ? project.translatedTranscript
                  : project.originalTranscript}
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 text-xs text-neutral-400">
              Voice sync precision: <span className="text-emerald-600 font-semibold">98.4% Frame Aligned</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
