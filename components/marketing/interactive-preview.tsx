"use client";

import { useState } from "react";
import useRouter from "next/navigation";
import { Upload, Play, Sparkles, Mic, Music, Video, ArrowRight } from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "video-dubbing", label: "AI video dubbing", icon: Video },
  { id: "text-to-speech", label: "AI text-to-speech", icon: Mic },
  { id: "music-box", label: "AI music box", icon: Music },
  { id: "voice-over", label: "AI voice over", icon: Sparkles },
];

const LANGUAGES = [
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "sw", name: "Swahili", flag: "🇰🇪" },
  { code: "pd", name: "Pidgin English", flag: "🇳🇬" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", flag: "🇫🇷" },
];

export function InteractivePreview() {
  const [activeTab, setActiveTab] = useState("video-dubbing");
  const [selectedLang, setSelectedLang] = useState("yo");
  const [videoUrl, setVideoUrl] = useState("https://youtube.com/watch?v=sample123");
  const [ttsText, setTtsText] = useState("Ekabo si YiCORA! System a ma sọ ede rẹ ni kiakia.");
  const [musicPrompt, setMusicPrompt] = useState("Energetic Afrobeats with warm guitar, brass, and catchy African percussion.");

  return (
    <div id="preview" className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-neutral-200/80 text-darktext transition-all">
      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-neutral-100 rounded-2xl mb-6">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                isActive
                  ? "bg-white text-darktext shadow-md font-semibold"
                  : "text-neutral-600 hover:text-darktext hover:bg-neutral-200/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-berry" : "text-neutral-500"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Video Dubbing */}
      {activeTab === "video-dubbing" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 bg-neutral-50/80 text-center hover:border-berry/50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-xl bg-neutral-200/80 text-neutral-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 text-berry" />
            </div>
            <h4 className="font-semibold text-darktext text-base">Upload a video!</h4>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Tap to choose a video file or drag & drop it here
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
              Or paste YouTube video link
            </label>
            <div className="relative">
              <Video className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-berry" />
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full pl-11 pr-4 py-3 bg-neutral-100 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-600">Translate to:</span>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="bg-neutral-100 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm font-medium text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/video"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Translate & Dub</span>
              <ArrowRight className="w-4 h-4" />
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
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md"
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
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md"
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
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md"
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
