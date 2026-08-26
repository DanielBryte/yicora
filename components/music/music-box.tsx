"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DescribeMode } from "./describe-mode";
import { LyricsMode } from "./lyrics-mode";
import { MusicDnaMode } from "./music-dna-mode";
import { MusicProcessingScreen } from "./processing-screen";
import { Music, Sparkles, FileText, Dna } from "lucide-react";
import { getMusicProvider } from "@/lib/providers/music";

export function MusicBoxStudio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"describe" | "lyrics" | "dna">("describe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);

  const handleGenerate = async (formData: any) => {
    setIsProcessing(true);
    try {
      const provider = getMusicProvider();
      const result = await provider.generateMusic(formData);
      setCurrentJobId(result.jobId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    if (currentJobId) {
      router.push(`/music/${currentJobId}`);
    } else {
      router.push(`/music/sample_music_123`);
    }
  };

  if (isProcessing) {
    return <MusicProcessingScreen onComplete={handleProcessingComplete} />;
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80 space-y-6 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-berry font-bold text-xs mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>YiCORA Music Box</span>
        </div>
        <h1 className="text-2xl font-bold text-darktext tracking-tight">Turn your ideas into original music</h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Compose Afrobeats, Amapiano, Highlife, and Afro-fusion tracks with full vocal and instrumental control.
        </p>
      </div>

      {/* Creation Mode Tabs */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-neutral-100 rounded-2xl">
        <button
          type="button"
          onClick={() => setActiveTab("describe")}
          className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === "describe"
              ? "bg-burgundy text-white shadow-md"
              : "text-neutral-600 hover:text-darktext"
          }`}
        >
          <Music className="w-4 h-4" />
          <span>1. DESCRIBE</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("lyrics")}
          className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === "lyrics"
              ? "bg-burgundy text-white shadow-md"
              : "text-neutral-600 hover:text-darktext"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>2. LYRICS</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("dna")}
          className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
            activeTab === "dna"
              ? "bg-burgundy text-white shadow-md"
              : "text-neutral-600 hover:text-darktext"
          }`}
        >
          <Dna className="w-4 h-4" />
          <span>3. MUSIC DNA</span>
        </button>
      </div>

      {/* Active Tab Component */}
      <div className="pt-2">
        {activeTab === "describe" && <DescribeMode onGenerate={handleGenerate} />}
        {activeTab === "lyrics" && <LyricsMode onGenerate={handleGenerate} />}
        {activeTab === "dna" && <MusicDnaMode onGenerate={handleGenerate} />}
      </div>
    </div>
  );
}
