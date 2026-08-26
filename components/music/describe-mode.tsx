"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

interface DescribeModeProps {
  onGenerate: (data: any) => void;
}

export function DescribeMode({ onGenerate }: DescribeModeProps) {
  const [prompt, setPrompt] = useState(
    "Create an energetic Afrobeats song about a young person leaving home to chase their dreams. Warm guitars, African percussion, catchy chorus and uplifting energy."
  );
  const [genre, setGenre] = useState("Afrobeats");
  const [mood, setMood] = useState("Energetic");
  const [language, setLanguage] = useState("Yoruba / English");
  const [vocalType, setVocalType] = useState("Male");
  const [duration, setDuration] = useState("2 minutes");
  const [energy, setEnergy] = useState(80);
  const [tempo, setTempo] = useState(112);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      mode: "describe",
      prompt,
      genre,
      mood,
      language,
      vocalType,
      duration,
      energy,
      tempo,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prompt Area */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
          Song Concept & Description
        </label>
        <textarea
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the song you want to create..."
          className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext leading-relaxed font-medium"
        />
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-neutral-600 uppercase mb-1">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {["Afrobeats", "Afro-fusion", "Amapiano", "Highlife", "Afro-house", "R&B", "Pop"].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-600 uppercase mb-1">Mood</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {["Energetic", "Emotional", "Romantic", "Inspirational", "Chill", "Dark"].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-600 uppercase mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {["English", "Pidgin", "Yoruba", "Igbo", "Hausa", "Swahili"].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-600 uppercase mb-1">Vocals</label>
          <select
            value={vocalType}
            onChange={(e) => setVocalType(e.target.value)}
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {["Male", "Female", "Instrumental"].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-neutral-600 uppercase mb-1">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {["Short", "1 minute", "2 minutes", "3 minutes"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sliders for Energy & Tempo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-neutral-600 uppercase">Energy</span>
            <span className="text-xs font-bold text-berry">{energy}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => setEnergy(parseInt(e.target.value))}
            className="w-full accent-berry cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-neutral-600 uppercase">Tempo (BPM)</span>
            <span className="text-xs font-bold text-berry">{tempo} BPM</span>
          </div>
          <input
            type="range"
            min="70"
            max="150"
            value={tempo}
            onChange={(e) => setTempo(parseInt(e.target.value))}
            className="w-full accent-berry cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-neutral-500">Deducts <strong className="text-berry">10 credits</strong></span>
        <button
          type="submit"
          className="px-8 py-3.5 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Song</span>
        </button>
      </div>
    </form>
  );
}
