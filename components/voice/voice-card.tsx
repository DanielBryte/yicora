"use client";

import { useState } from "react";
import { VoiceOption } from "@/lib/providers/voice/types";
import { Play, Pause, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface VoiceCardProps {
  voice: VoiceOption;
  selected: boolean;
  onSelect: (voice: VoiceOption) => void;
}

export function VoiceCard({ voice, selected, onSelect }: VoiceCardProps) {
  const [playing, setPlaying] = useState(false);

  const togglePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPlaying(!playing);
  };

  return (
    <div
      onClick={() => onSelect(voice)}
      className={cn(
        "p-4 rounded-3xl border transition-all cursor-pointer relative flex flex-col justify-between h-[160px]",
        selected
          ? "bg-burgundy text-white border-pink-500/50 shadow-xl ring-2 ring-berry/40"
          : "bg-white text-darktext border-neutral-200/80 hover:border-berry/40 hover:shadow-md"
      )}
    >
      {selected && (
        <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-berry text-white flex items-center justify-center shadow-md">
          <Check className="w-3.5 h-3.5" />
        </span>
      )}

      <div className="flex items-center gap-3">
        <img
          src={voice.avatarUrl}
          alt={voice.name}
          className="w-12 h-12 rounded-2xl object-cover border border-white/20 shadow-sm"
        />
        <div>
          <h4 className="font-bold text-sm tracking-tight">{voice.name}</h4>
          <span className={cn("text-xs font-medium block", selected ? "text-pink-200" : "text-neutral-500")}>
            {voice.language} • {voice.gender}
          </span>
        </div>
      </div>

      <p className={cn("text-xs line-clamp-2 leading-relaxed mt-2", selected ? "text-neutral-300" : "text-neutral-500")}>
        {voice.description}
      </p>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={togglePreview}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors",
            selected
              ? "bg-white/20 hover:bg-white/30 text-white"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
          )}
        >
          {playing ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
          <span>{playing ? "Playing" : "Preview"}</span>
        </button>

        <span className={cn("text-[10px] uppercase tracking-wider font-bold", selected ? "text-pink-300" : "text-berry")}>
          HD Voice
        </span>
      </div>
    </div>
  );
}
