"use client";

import { useState } from "react";
import { Sparkles, Sliders, X } from "lucide-react";

interface VariationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVariation: (variationType: string) => void;
}

const VARIATION_OPTIONS = [
  { id: "more_energetic", label: "More energetic", icon: "⚡", description: "Boost percussion, log drums and synth energy" },
  { id: "more_emotional", label: "More emotional", icon: "❤️", description: "Enhance acoustic guitars, warm keys & vocal depth" },
  { id: "different_instruments", label: "Different instrumentation", icon: "🎷", description: "Swap horns, Talking Drums, and string textures" },
  { id: "faster_tempo", label: "Faster tempo (+10 BPM)", icon: "🔥", description: "Accelerate beat for club & dancefloor energy" },
  { id: "slower_tempo", label: "Slower tempo (-10 BPM)", icon: "🌙", description: "Laidback chill lounge arrangement" },
  { id: "surprise_me", label: "Surprise me!", icon: "✨", description: "AI fusion variation with unexpected elements" },
];

export function VariationModal({ isOpen, onClose, onSelectVariation }: VariationModalProps) {
  const [selected, setSelected] = useState("more_energetic");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-white/20 relative text-darktext">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-bold text-berry bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider">
            AI Variation Engine
          </span>
          <h3 className="text-xl font-bold text-darktext tracking-tight mt-2">Create Variation</h3>
          <p className="text-xs text-neutral-500 mt-1">
            Generate a new, original song rendition anchored on this project&apos;s composition DNA.
          </p>
        </div>

        <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
          {VARIATION_OPTIONS.map((opt) => (
            <div
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                selected === opt.id
                  ? "bg-burgundy text-white border-pink-500/50 shadow-md"
                  : "bg-neutral-50 text-darktext border-neutral-200 hover:bg-neutral-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{opt.icon}</span>
                <div>
                  <h4 className="font-bold text-sm">{opt.label}</h4>
                  <p className={`text-xs ${selected === opt.id ? "text-neutral-300" : "text-neutral-500"}`}>
                    {opt.description}
                  </p>
                </div>
              </div>

              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === opt.id ? "border-pink-300 bg-berry" : "border-neutral-300"
                }`}
              >
                {selected === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectVariation(selected);
              onClose();
            }}
            className="px-7 py-2.5 rounded-full bg-berry hover:bg-berry-hover text-white text-xs font-bold shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Variation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
