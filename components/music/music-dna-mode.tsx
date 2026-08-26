"use client";

import { useState } from "react";
import { Upload, Dna, ShieldAlert, Sparkles, Sliders } from "lucide-react";

interface MusicDnaModeProps {
  onGenerate: (data: any) => void;
}

export function MusicDnaMode({ onGenerate }: MusicDnaModeProps) {
  const [fileUploaded, setFileUploaded] = useState(true); // Sample pre-analyzed audio
  const [dna, setDna] = useState({
    bpm: 112,
    energy: 85,
    mood: "Energetic & Groovy",
    genre: "Afrobeats / Amapiano",
    instruments: ["Talking Drum", "Acoustic Guitar", "Log Drum", "Brass Synth"],
  });

  const [modifiedEnergy, setModifiedEnergy] = useState(85);
  const [modifiedTempo, setModifiedTempo] = useState(112);
  const [modifiedMood, setModifiedMood] = useState("Energetic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      mode: "dna",
      dnaCharacteristics: dna,
      modifiedEnergy,
      modifiedTempo,
      modifiedMood,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Safety Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-800 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-sm mb-0.5">Important Safety & Permission Notice</span>
          Only upload audio you own or have explicit permission to analyze. Music DNA extracts high-level acoustic characteristics to inspire new, original compositions.
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-6 bg-neutral-50 text-center hover:border-berry/50 transition-colors cursor-pointer group">
        <div className="w-10 h-10 rounded-xl bg-pink-50 text-berry flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
          <Upload className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-darktext text-sm">Upload Reference Track</h4>
        <p className="text-xs text-neutral-400 mt-0.5">MP3, WAV, or AAC (up to 50MB)</p>
      </div>

      {/* Visual MUSIC DNA Extractor */}
      {fileUploaded && (
        <div className="p-6 bg-burgundy rounded-3xl text-white space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Dna className="w-5 h-5 text-pink-300" />
              <h3 className="font-bold text-base tracking-tight">Extracted Music DNA</h3>
            </div>
            <span className="text-xs font-bold text-pink-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
              Analysis Complete
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-xs text-neutral-400 block">Tempo / BPM</span>
              <span className="text-lg font-bold text-white">{dna.bpm} BPM</span>
            </div>

            <div>
              <span className="text-xs text-neutral-400 block">Energy Score</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-berry rounded-full" style={{ width: `${dna.energy}%` }} />
                </div>
                <span className="text-xs font-bold text-pink-200">{dna.energy}%</span>
              </div>
            </div>

            <div>
              <span className="text-xs text-neutral-400 block">Detected Genre</span>
              <span className="text-sm font-semibold text-white">{dna.genre}</span>
            </div>

            <div>
              <span className="text-xs text-neutral-400 block">Dominant Mood</span>
              <span className="text-sm font-semibold text-white">{dna.mood}</span>
            </div>
          </div>

          <div>
            <span className="text-xs text-neutral-400 block mb-2">Extracted Instrumentation</span>
            <div className="flex flex-wrap gap-2">
              {dna.instruments.map((inst, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-white/10 text-pink-200 text-xs font-medium border border-white/10">
                  {inst}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* DNA Modifiers */}
      <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-berry" />
          <span>Customize Original Song Parameters</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-neutral-600 mb-1">
              <span>Modified Energy</span>
              <span className="text-berry font-bold">{modifiedEnergy}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={modifiedEnergy}
              onChange={(e) => setModifiedEnergy(parseInt(e.target.value))}
              className="w-full accent-berry cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-neutral-600 mb-1">
              <span>Modified Tempo</span>
              <span className="text-berry font-bold">{modifiedTempo} BPM</span>
            </div>
            <input
              type="range"
              min="80"
              max="140"
              value={modifiedTempo}
              onChange={(e) => setModifiedTempo(parseInt(e.target.value))}
              className="w-full accent-berry cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-neutral-500">Deducts <strong className="text-berry">10 credits</strong></span>
        <button
          type="submit"
          className="px-8 py-3.5 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Create Original Song</span>
        </button>
      </div>
    </form>
  );
}
