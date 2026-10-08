"use client";

import { useState } from "react";
import useRouter from "next/navigation";
import { Upload, Play, Sparkles, Mic, Music, Video, ArrowRight } from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "video-dubbing", label: "AI video dubbing" },
  { id: "text-to-speech", label: "AI text-to-speech" },
  { id: "music-box", label: "AI music box" },
  { id: "voice-over", label: "AI voice over" },
];

const LANGUAGES = [
  { code: "yo", name: "Yoruba", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { code: "ig", name: "Igbo", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { code: "ha", name: "Hausa", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { code: "sw", name: "Swahili", flagUrl: "https://flagcdn.com/w40/ke.png" },
  { code: "pd", name: "Pidgin English", flagUrl: "https://flagcdn.com/w40/ng.png" },
  { code: "en", name: "English", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { code: "fr", name: "French", flagUrl: "https://flagcdn.com/w40/fr.png" },
];

export function InteractivePreview() {
  const [activeTab, setActiveTab] = useState("video-dubbing");
  const [selectedLang, setSelectedLang] = useState("yo");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=...");
  const [ttsText, setTtsText] = useState("Ekabo si YiCORA! System a ma sọ ede rẹ ni kiakia.");
  const [musicPrompt, setMusicPrompt] = useState("Energetic Afrobeats with warm guitar, brass, and catchy African percussion.");

  const activeLangObj = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  return (
    <div id="preview" className="mx-auto mt-7 w-full max-w-5xl scroll-mt-24 rounded-[1.5rem] border border-white/60 bg-[#ECEAE5] p-3.5 text-darktext shadow-xl transition-all sm:mt-10 sm:rounded-[2.5rem] sm:p-6 lg:p-7">
      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 p-1.5 bg-[#DBD8D2] rounded-2xl mb-6">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${
                isActive
                  ? "bg-white text-darktext shadow-sm"
                  : "text-neutral-700 hover:text-darktext hover:bg-white/40"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Video Dubbing */}
      {activeTab === "video-dubbing" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="group cursor-pointer rounded-2xl border border-neutral-300/60 bg-[#E2DFD9] p-6 text-center transition-colors hover:border-berry/40 sm:p-12">
            <div className="w-10 h-10 rounded-lg text-neutral-800 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
              <svg className="w-8 h-8 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
              </svg>
            </div>
            <h4 className="font-bold text-darktext text-base sm:text-lg">Upload a video!</h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-normal">
              See it in another language in just minutes.
            </p>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs sm:text-sm font-normal text-neutral-700">
              Or paste a YouTube link:
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-6 h-4 bg-red-600 rounded flex items-center justify-center text-white text-[8px] font-bold">
                ▶
              </div>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full pl-12 pr-4 py-3 bg-[#E2DFD9] border border-neutral-300/60 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 text-darktext font-mono"
              />
            </div>
          </div>

          <div className="flex flex-col items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-normal text-neutral-700">Translate to:</span>
              <div className="relative inline-flex items-center">
                <div className="bg-white border border-neutral-300/80 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm font-medium text-darktext shadow-sm transition-all hover:bg-neutral-50">
                  <img
                    src={activeLangObj.flagUrl}
                    alt={activeLangObj.name}
                    className="w-5 h-3.5 object-cover rounded-xs border border-neutral-200 shrink-0"
                  />
                  <span>{activeLangObj.name}</span>
                  <span className="text-neutral-500 text-xs ml-0.5">▾</span>
                </div>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <Link
              href="/video"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-berry px-6 py-3 text-xs font-medium text-white shadow-md transition-all hover:bg-berry-hover active:scale-95 sm:w-auto sm:px-8 sm:text-sm"
            >
              <span>Translate video</span>
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: Text to Speech */}
      {activeTab === "text-to-speech" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
              Enter script to voice
            </label>
            <textarea
              rows={4}
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              className="w-full p-4 bg-neutral-100 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-neutral-500 font-medium whitespace-nowrap">Voice:</span>
              {["Dayo (NG)", "Amina (NG)", "Tunde (YO)", "Usman (HA)"].map((v, i) => (
                <span
                  key={v}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                    i === 0 ? "bg-berry text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {v}
                </span>
              ))}
            </div>

            <Link
              href="/voice"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Generate Voice</span>
            </Link>
          </div>
        </div>
      )}

      {/* Tab 3: Music Box */}
      {activeTab === "music-box" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
              Describe your song concept
            </label>
            <textarea
              rows={3}
              value={musicPrompt}
              onChange={(e) => setMusicPrompt(e.target.value)}
              className="w-full p-4 bg-neutral-100 border border-neutral-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-neutral-100 p-2.5 rounded-xl border border-neutral-200 text-xs">
              <span className="text-neutral-500 block">Genre</span>
              <span className="font-semibold text-darktext">Afrobeats</span>
            </div>
            <div className="bg-neutral-100 p-2.5 rounded-xl border border-neutral-200 text-xs">
              <span className="text-neutral-500 block">Mood</span>
              <span className="font-semibold text-darktext">Energetic</span>
            </div>
            <div className="bg-neutral-100 p-2.5 rounded-xl border border-neutral-200 text-xs">
              <span className="text-neutral-500 block">Language</span>
              <span className="font-semibold text-darktext">Yoruba / English</span>
            </div>
            <div className="bg-neutral-100 p-2.5 rounded-xl border border-neutral-200 text-xs">
              <span className="text-neutral-500 block">Tempo</span>
              <span className="font-semibold text-darktext">112 BPM</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Link
              href="/music"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md"
            >
              <Music className="w-4 h-4" />
              <span>Create Song</span>
            </Link>
          </div>
        </div>
      )}

      {/* Tab 4: Voice Over */}
      {activeTab === "voice-over" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="p-6 bg-neutral-100 rounded-2xl border border-neutral-200 text-center">
            <Sparkles className="w-8 h-8 text-berry mx-auto mb-2" />
            <h4 className="font-semibold text-darktext">AI Voiceover & Dub Sync</h4>
            <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1">
              Match natural emotion, tone, and lip sync alignment across native African dialects.
            </p>
          </div>

          <div className="flex justify-end">
            <Link
              href="/voice"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md"
            >
              <span>Explore Voiceover Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
