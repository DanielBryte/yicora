"use client";

import { useState } from "react";
import { Sparkles, Wand2 } from "lucide-react";

interface LyricsModeProps {
  onGenerate: (data: any) => void;
}

export function LyricsMode({ onGenerate }: LyricsModeProps) {
  const [lyrics, setLyrics] = useState(
    `[Verse 1]\nWaking up in Lagos city with the morning sun\nGot my dreams packed in my bag, my journey has begun\n\n[Chorus]\nOya dance, make we celebrate life\nNo matter the hustle, we go reach the light`
  );
  const [genre, setGenre] = useState("Afrobeats");
  const [mood, setMood] = useState("Uplifting");
  const [vocalType, setVocalType] = useState("Male");
  const [language, setLanguage] = useState("Pidgin / Yoruba");
  const [duration, setDuration] = useState("2 minutes");
  const [showAiModal, setShowAiModal] = useState(false);

  // AI Generator state
  const [aiTheme, setAiTheme] = useState("Chasing success in the city");
  const [aiStory, setAiStory] = useState("Young musician working hard and making their family proud");

  const handleAiGenerateLyrics = () => {
    const generated = `[Verse 1]\nFrom the streets of Surulere to the global stage\nWriting every single line, turning every page\n\n[Pre-Chorus]\nMamma tell me, son you go make us proud\nNow my voice is ringing clear and loud\n\n[Chorus]\nOya rise up, let the drums play\nWe are shining brighter every single day\n\n[Verse 2]\nWith my acoustic guitar and the Talking Drum\nVictory is sweet, the moment has come\n\n[Bridge]\nNo giving up, no backing down\nWe wear the golden crown\n\n[Final Chorus]\nOya rise up, let the drums play\nWe are shining brighter every single day!`;
    setLyrics(generated);
    setShowAiModal(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({
      mode: "lyrics",
      lyrics,
      genre,
      mood,
      vocalType,
      language,
      duration,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
          Lyrics Composition Editor
        </label>

        <button
          type="button"
          onClick={() => setShowAiModal(true)}
          className="px-4 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-berry font-bold text-xs flex items-center gap-1.5 border border-pink-200 transition-colors shadow-sm"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>✨ Generate Lyrics with AI</span>
        </button>
      </div>

      <textarea
        rows={8}
        value={lyrics}
        onChange={(e) => setLyrics(e.target.value)}
        placeholder="Write or paste your custom song lyrics..."
        className="w-full p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext leading-relaxed font-mono"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <label className="block text-[11px] font-semibold text-neutral-600 uppercase mb-1">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {["Afrobeats", "Amapiano", "Highlife", "Afro-fusion", "R&B"].map((g) => (
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
            {["Uplifting", "Emotional", "Energetic", "Chill"].map((m) => (
              <option key={m} value={m}>{m}</option>
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
            {["Male", "Female", "Duet"].map((v) => (
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
            {["1 minute", "2 minutes", "3 minutes"].map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs text-neutral-500">Deducts <strong className="text-berry">10 credits</strong></span>
        <button
          type="submit"
          className="px-8 py-3.5 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Turn Lyrics Into Song</span>
        </button>
      </div>

      {/* AI Lyrics Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-white/20">
            <h3 className="text-lg font-bold text-darktext tracking-tight flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-berry" />
              <span>AI Lyricist Assistant</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Theme / Concept
                </label>
                <input
                  type="text"
                  value={aiTheme}
                  onChange={(e) => setAiTheme(e.target.value)}
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1">
                  Storyline / Context
                </label>
                <textarea
                  rows={2}
                  value={aiStory}
                  onChange={(e) => setAiStory(e.target.value)}
                  className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-5 py-2.5 rounded-full border border-neutral-200 text-xs font-semibold text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAiGenerateLyrics}
                className="px-6 py-2.5 rounded-full bg-berry hover:bg-berry-hover text-white text-xs font-bold shadow-md"
              >
                Generate Full Lyrics
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
