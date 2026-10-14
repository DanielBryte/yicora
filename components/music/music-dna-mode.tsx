"use client";

import { useState } from "react";
import { Dna, ShieldAlert, Sparkles, Sliders } from "lucide-react";

interface MusicDnaModeProps {
  onGenerate: (data: any) => void;
  referenceReady: boolean;
}

export function MusicDnaMode({ onGenerate, referenceReady }: MusicDnaModeProps) {
  const [modifiedEnergy, setModifiedEnergy] = useState(85);
  const [modifiedTempo, setModifiedTempo] = useState(112);
  const [modifiedMood, setModifiedMood] = useState("Energetic");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!referenceReady) return;
    onGenerate({ mode: "dna", modifiedEnergy, modifiedTempo, modifiedMood });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!referenceReady ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
          <span className="mb-1 block font-semibold">Add an audio reference above to use Music DNA.</span>
          Only upload music you own or have permission to use. The reference guides the style of a new composition.
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs leading-relaxed text-emerald-800">
          <Dna className="mt-0.5 h-4 w-4 shrink-0" />
          <span>Your reference will guide the style of a new composition. The new song won’t copy the original recording.</span>
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-600">
          <Sliders className="h-4 w-4 text-berry" /> Customize the new song
        </h4>
        <div>
          <div className="mb-1 flex justify-between text-xs font-semibold text-neutral-600"><span>Energy</span><span className="text-berry">{modifiedEnergy}%</span></div>
          <input aria-label="Energy" type="range" min="20" max="100" value={modifiedEnergy} onChange={(event) => setModifiedEnergy(Number(event.target.value))} className="w-full accent-berry" />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs font-semibold text-neutral-600"><span>Tempo</span><span className="text-berry">{modifiedTempo} BPM</span></div>
          <input aria-label="Tempo" type="range" min="80" max="140" value={modifiedTempo} onChange={(event) => setModifiedTempo(Number(event.target.value))} className="w-full accent-berry" />
        </div>
        <label className="block text-[11px] font-semibold uppercase text-neutral-600">Mood
          <select value={modifiedMood} onChange={(event) => setModifiedMood(event.target.value)} className="mt-1 w-full rounded-xl border border-neutral-200 bg-white p-2.5 text-xs font-semibold normal-case text-darktext">
            {["Energetic", "Uplifting", "Emotional", "Chill", "Romantic", "Dark"].map((mood) => <option key={mood}>{mood}</option>)}
          </select>
        </label>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="flex items-center gap-1.5 text-xs text-neutral-500"><ShieldAlert className="h-3.5 w-3.5" /> Reference audio needs your permission to use.</span>
        <button type="submit" disabled={!referenceReady} className="flex items-center gap-2 rounded-full bg-berry px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-berry-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-50">
          <Sparkles className="h-4 w-4" /><span>Create from Reference</span>
        </button>
      </div>
    </form>
  );
}
