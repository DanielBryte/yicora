"use client";

import { useRouter } from "next/navigation";
import { DescribeMode } from "./describe-mode";
import { LyricsMode } from "./lyrics-mode";
import { MusicDnaMode } from "./music-dna-mode";
import { MusicProcessingScreen } from "./processing-screen";
import { Music, FileText, Dna } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function MusicBoxStudio() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"describe" | "lyrics" | "dna">("describe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [referenceAssetId, setReferenceAssetId] = useState<string | null>(null);
  const [voiceAssetId, setVoiceAssetId] = useState<string | null>(null);
  const [voiceConsent, setVoiceConsent] = useState(false);
  const [voiceUploadMessage, setVoiceUploadMessage] = useState<string | null>(null);
  const [inspiredBy, setInspiredBy] = useState<string | null>(null);
  const [isUploadingReference, setIsUploadingReference] = useState(false);

  useEffect(() => {
    setInspiredBy(new URLSearchParams(window.location.search).get("inspiredBy"));
  }, []);

  const handleAudioUpload = async (file: File | undefined, purpose: "song_reference" | "voice_reference") => {
    if (!file) return;
    setIsUploadingReference(true);
    setGenerationError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("purpose", purpose);
      form.append("consent", purpose === "voice_reference" && voiceConsent ? "true" : "false");
      const response = await fetch("/api/music/uploads", { method: "POST", body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Reference upload failed.");
      if (purpose === "song_reference") setReferenceAssetId(result.assetId);
      else { setVoiceAssetId(result.assetId); setVoiceUploadMessage("Voice sample ready. It will be used for this song only; no reusable clone is created."); }
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : "Reference upload failed.");
    } finally {
      setIsUploadingReference(false);
    }
  };

  const handleGenerate = async (formData: any) => {
    setIsProcessing(true);
    setGenerationError(null);
    try {
      const response = await fetch("/api/generate/music", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, ...(referenceAssetId ? { referenceAssetId } : {}), ...(voiceAssetId ? { voiceAssetId } : {}), ...(inspiredBy ? { inspiredBy } : {}) }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Could not start song generation.");
      setCurrentJobId(result.jobId);
    } catch (err) {
      setGenerationError(err instanceof Error ? err.message : "Could not start song generation.");
      setIsProcessing(false);
    }
  };

  const handleProcessingComplete = useCallback(() => {
    setIsProcessing(false);
    if (currentJobId) {
      router.push(`/music/jobs/${currentJobId}`);
    }
  }, [currentJobId, router]);

  const handleProcessingError = useCallback((message: string) => {
    setGenerationError(message);
    setIsProcessing(false);
  }, []);

  if (isProcessing) {
    return <MusicProcessingScreen jobId={currentJobId} onComplete={handleProcessingComplete} onError={handleProcessingError} />;
  }

  return (
    <div className="w-full space-y-6 rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <h1 className="text-2xl font-bold text-darktext tracking-tight">Turn your ideas into original music</h1>
        {inspiredBy && <p className="mt-2 rounded-xl bg-pink-50 px-3 py-2 text-xs font-medium text-berry">Inspired by a shared YiCORA song. Your new track will credit its source.</p>}
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Create original Afrobeats, Amapiano, Highlife, and Afro-fusion tracks from an idea, lyrics, or an audio reference.
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
          disabled={Boolean(voiceAssetId)}
          className={`py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
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
        {generationError && (
          <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{generationError}</p>
        )}
        <div className="mb-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <label htmlFor="song-reference" className="block text-sm font-semibold text-darktext">Music reference <span className="font-normal text-neutral-500">(optional)</span></label>
            <p className="mt-1 text-xs text-neutral-500">Use a track to guide the new song’s style. MP3, M4A, WAV, AAC, FLAC, or OGG · up to 15 MB.</p>
            <input id="song-reference" type="file" accept="audio/*" disabled={isUploadingReference || Boolean(voiceAssetId)}
              onChange={(event) => handleAudioUpload(event.target.files?.[0], "song_reference")}
              className="mt-3 block w-full text-xs text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-berry file:px-4 file:py-2 file:font-semibold file:text-white" />
            {referenceAssetId && <p className="mt-2 text-xs font-medium text-emerald-700">Style reference ready.</p>}
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <label htmlFor="voice-reference" className="block text-sm font-semibold text-darktext">Singer’s voice sample <span className="font-normal text-neutral-500">(optional)</span></label>
            <p className="mt-1 text-xs text-neutral-500">Clean solo voice, at least 30 seconds. MP3 or M4A · up to 15 MB. Used for this song only.</p>
            <input id="voice-reference" type="file" accept="audio/mpeg,audio/mp4,.mp3,.m4a" disabled={isUploadingReference || !voiceConsent || Boolean(referenceAssetId)}
              onChange={(event) => handleAudioUpload(event.target.files?.[0], "voice_reference")}
              className="mt-3 block w-full text-xs text-neutral-600 file:mr-3 file:rounded-full file:border-0 file:bg-berry file:px-4 file:py-2 file:font-semibold file:text-white" />
            <label className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-neutral-600">
              <input type="checkbox" checked={voiceConsent} onChange={(event) => setVoiceConsent(event.target.checked)} className="mt-0.5 accent-berry" />
              <span>I am the speaker or have their explicit permission, and I have the rights to use this recording for AI song generation.</span>
            </label>
            {isUploadingReference && <p className="mt-2 text-xs text-neutral-500">Uploading securely…</p>}
            {voiceUploadMessage && <p role="status" className="mt-2 text-xs font-medium text-emerald-700">{voiceUploadMessage}</p>}
            {voiceAssetId && <p className="mt-2 text-[11px] text-neutral-500">No separate $12 clone setup. The song generation itself is still provider-billed.</p>}
            {(voiceAssetId || referenceAssetId) && <p className="mt-2 text-[11px] text-neutral-500">For now, use one reference type per song: singer sample or style track.</p>}
          </div>
        </div>
        {activeTab === "describe" && <DescribeMode onGenerate={handleGenerate} />}
        {activeTab === "lyrics" && <LyricsMode onGenerate={handleGenerate} />}
        {activeTab === "dna" && voiceAssetId && <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">Music DNA uses a separate style reference. Remove the singer sample to create with Music DNA, or switch to Describe or Lyrics to use the singer’s voice.</p>}
        {activeTab === "dna" && !voiceAssetId && <MusicDnaMode referenceReady={Boolean(referenceAssetId)} onGenerate={handleGenerate} />}
      </div>
    </div>
  );
}
