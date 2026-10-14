"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VoiceCard } from "./voice-card";
import { AFRICAN_VOICE_PRESETS } from "@/lib/providers/voice/mock-provider";
import { VoiceOption } from "@/lib/providers/voice/types";
import { Mic, Sparkles, Sliders } from "lucide-react";

export function TTSForm() {
  const router = useRouter();
  const [inputText, setInputText] = useState(
    "Nnọọ na YiCORA. A bụ m olu kọmputa nke na-asụ asụsụ Africa n'ụzọ dị mfe ma doo anya."
  );
  const [selectedVoice, setSelectedVoice] = useState<VoiceOption>(AFRICAN_VOICE_PRESETS[0]);
  const [tone, setTone] = useState("Warm & Expressive");
  const [speed, setSpeed] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate/voice", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputText, language: selectedVoice.language, voiceId: selectedVoice.id,
          voiceName: selectedVoice.name, gender: selectedVoice.gender, tone, speed }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not synthesize speech.");
      router.push(`/voice/${result.jobId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not synthesize speech.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="space-y-8 max-w-5xl mx-auto">
      {/* Script input */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-darktext tracking-tight flex items-center gap-2">
            <Mic className="w-5 h-5 text-berry" />
            <span>AI Text to Speech Studio</span>
          </h2>
          <span className="text-xs text-neutral-400 font-medium">
            {inputText.length} characters
          </span>
        </div>

        <textarea
          rows={5}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text script to synthesize into audio..."
          className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext leading-relaxed"
        />
      </div>

      {/* Voice Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
            Select African Voice Model
          </h3>
          <span className="text-xs font-semibold text-berry">
            {AFRICAN_VOICE_PRESETS.length} Voices Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {AFRICAN_VOICE_PRESETS.map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              selected={selectedVoice.id === voice.id}
              onSelect={setSelectedVoice}
            />
          ))}
        </div>
        {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      </div>

      {/* Controls: Tone & Speed */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-neutral-200/80 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-berry" />
          <span>Vocal Controls & Modulation</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-neutral-600 uppercase mb-2">
              Vocal Tone & Emotion
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
            >
              <option value="Warm & Expressive">Warm & Expressive</option>
              <option value="Authoritative Executive">Authoritative Executive</option>
              <option value="Conversational Podcast">Conversational Podcast</option>
              <option value="Dramatic Storyteller">Dramatic Storyteller</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-neutral-600 uppercase">
                Speech Speed
              </label>
              <span className="text-xs font-bold text-berry">{speed}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-berry cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
              <span>0.5x Slow</span>
              <span>1.0x Normal</span>
              <span>2.0x Fast</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-medium">
            Deducts <span className="font-bold text-berry">2 credits</span> per synthesis
          </span>

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3.5 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{loading ? "Synthesizing Speech..." : "Generate Voice Audio"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
