"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Play, Sparkles, Music, ArrowRight, X, Video, AudioLines, Mic } from "lucide-react";

const TABS = [
  { id: "music-box", label: "AI music box", icon: Music, available: true },
  { id: "video-dubbing", label: "AI video dubbing", icon: Video, available: false },
  { id: "text-to-speech", label: "AI text-to-speech", icon: AudioLines, available: false },
  { id: "voice-over", label: "AI voice over", icon: Mic, available: false },
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("music-box");
  const [selectedLang, setSelectedLang] = useState("yo");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=...");
  const [ttsText, setTtsText] = useState("Ekabo si YiCORA! System a ma sọ ede rẹ ni kiakia.");
  const [musicPrompt, setMusicPrompt] = useState("Energetic Afrobeats with warm guitar, brass, and catchy African percussion.");
  const [selectedVoice, setSelectedVoice] = useState("Dayo (NG)");
  const [selectedVoiceEmotion, setSelectedVoiceEmotion] = useState("Confident");
  const [selectedMusicMood, setSelectedMusicMood] = useState("Energetic");
  const [selectedMusicGenre, setSelectedMusicGenre] = useState("Afrobeats");
  const [selectedVoiceoverMood, setSelectedVoiceoverMood] = useState("Warm");
  const [voiceoverLength, setVoiceoverLength] = useState("30 sec");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Ready to localize");
  const [authGateOpen, setAuthGateOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<string>("generate");

  const activeLangObj = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setProgress(18);
    setStatusMessage(`${file.name} is ready`);
  };

  const beginProcessing = (actionLabel: string) => {
    setPendingAction(actionLabel);
    setIsProcessing(true);
    setProgress(12);
    setStatusMessage(`${actionLabel}...`);

    const intervalId = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 18, 100);
        if (next >= 100) {
          window.clearInterval(intervalId);
          setIsProcessing(false);
          setStatusMessage(`${actionLabel} ready`);
          setAuthGateOpen(true);
          return 100;
        }
        return next;
      });
    }, 220);
  };

  const openAuthGate = (action: string) => {
    setPendingAction(action);
    setAuthGateOpen(true);
  };

  return (
    <div id="preview" className="mx-auto mt-7 w-full max-w-5xl scroll-mt-24 rounded-[1.5rem] border border-white/60 bg-[#ECEAE5] p-3.5 text-darktext shadow-xl transition-all sm:mt-10 sm:rounded-[2.5rem] sm:p-6 lg:p-7">
      <div className="grid grid-cols-2 gap-1.5 rounded-[1.25rem] bg-[#DBD8D2] p-1.5 lg:grid-cols-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              disabled={!tab.available}
              aria-disabled={!tab.available}
              onClick={() => tab.available && setActiveTab(tab.id)}
              className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-1.5 rounded-full px-2 py-2 text-center text-xs font-bold transition-all lg:flex-row lg:gap-2 lg:px-3 lg:text-sm ${
                isActive
                  ? "bg-berry text-white shadow-sm"
                  : tab.available
                    ? "text-neutral-700 hover:bg-white/40 hover:text-darktext"
                    : "cursor-not-allowed text-neutral-600"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span className="max-w-full truncate">{tab.label}</span>
              {!tab.available && (
                <span className="shrink-0 whitespace-nowrap rounded-full border border-neutral-300 bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wide leading-none text-neutral-700">Coming soon</span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "video-dubbing" && (
        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-neutral-300/60 bg-[#E2DFD9] p-6 text-center transition-colors hover:border-berry/40 sm:p-10">
            <input id="video-upload" type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
            <label
              htmlFor="video-upload"
              className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-400/80 bg-[#F3F1EE] px-4 py-6 transition hover:border-berry/40 hover:bg-white"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-neutral-800 shadow-sm transition group-hover:scale-105">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-darktext sm:text-lg">{uploadedFileName ? "Replace video" : "Upload a video!"}</h4>
              <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                {uploadedFileName ? uploadedFileName : "See it in another language in just minutes."}
              </p>
            </label>
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-normal text-neutral-700 sm:text-sm">Or paste a YouTube link:</label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 flex h-4 w-6 -translate-y-1/2 items-center justify-center rounded bg-red-600 text-[8px] font-bold text-white">▶</div>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-xl border border-neutral-300/60 bg-[#E2DFD9] py-3 pl-12 pr-4 text-xs text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="text-xs font-normal text-neutral-700 sm:text-sm">Translate to:</span>
              <div className="relative inline-flex items-center">
                <div className="flex items-center gap-2.5 rounded-xl border border-neutral-300/80 bg-white px-3.5 py-2.5 text-xs font-medium text-darktext shadow-sm sm:text-sm">
                  <img src={activeLangObj.flagUrl} alt={activeLangObj.name} className="h-3.5 w-5 rounded-xs border border-neutral-200 object-cover" />
                  <span>{activeLangObj.name}</span>
                  <span className="ml-0.5 text-xs text-neutral-500">▾</span>
                </div>
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}> {lang.name} </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => beginProcessing("Translating video")}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-berry px-6 py-3 text-xs font-medium text-white shadow-md transition-all hover:bg-berry-hover active:scale-95 disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto sm:px-8 sm:text-sm"
            >
              <span>{isProcessing ? "Generating..." : "Translate video"}</span>
            </button>
          </div>

          {(uploadedFileName || videoUrl) && (
            <div className="rounded-2xl border border-neutral-200 bg-[#f4f1ed] p-3">
              <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-neutral-700 sm:text-xs">
                <span>{statusMessage}</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-berry transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "text-to-speech" && (
        <div className="mt-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">Enter script to voice</label>
            <textarea
              rows={4}
              value={ttsText}
              onChange={(e) => setTtsText(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-100 p-4 text-sm text-darktext focus:border-berry focus:outline-none focus:ring-2 focus:ring-berry/30"
            />
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-[#f0eee9] p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Voice studio</span>
              <button
                type="button"
                className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-darktext transition hover:bg-neutral-100"
              >
                Preview
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                "Dayo (NG)",
                "Amina (NG)",
                "Tunde (YO)",
                "Usman (HA)",
              ].map((voice) => (
                <button
                  key={voice}
                  type="button"
                  onClick={() => setSelectedVoice(voice)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedVoice === voice ? "bg-berry text-white" : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {voice}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {[
                "Confident",
                "Friendly",
                "Energetic",
                "Formal",
              ].map((emotion) => (
                <button
                  key={emotion}
                  type="button"
                  onClick={() => setSelectedVoiceEmotion(emotion)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                    selectedVoiceEmotion === emotion
                      ? "border-berry bg-violet-50 text-berry"
                      : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
            <div className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs text-neutral-600">
              {selectedVoiceEmotion} tone • {selectedVoice}
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => beginProcessing("Generating voice")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-berry px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-berry-hover disabled:cursor-not-allowed disabled:opacity-80"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{isProcessing ? "Generating..." : "Generate Voice"}</span>
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-[#f4f1ed] p-3">
            <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-neutral-700 sm:text-xs">
              <span>{statusMessage}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-berry transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "music-box" && (
        <div className="mt-6 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="music-preview-prompt" className="block w-full text-left text-xs font-semibold uppercase tracking-wider text-neutral-600">Describe your song concept</label>
            <textarea
              id="music-preview-prompt"
              rows={3}
              value={musicPrompt}
              onChange={(e) => setMusicPrompt(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-100 p-4 text-sm text-darktext focus:border-berry focus:outline-none focus:ring-2 focus:ring-berry/30"
            />
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-[#f0eee9] p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Music controls</span>
              <span className="rounded-full border border-neutral-200 bg-white px-2 py-1 text-[10px] font-semibold text-neutral-700">112 BPM</span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="mb-2 flex items-center justify-between text-[11px] text-neutral-600">
                  <span>Genre</span>
                  <span>{selectedMusicGenre}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Afrobeats",
                    "Amapiano",
                    "Gospel",
                    "Highlife",
                  ].map((genre) => (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => setSelectedMusicGenre(genre)}
                      className={`rounded-full px-2.5 py-1.5 text-[11px] font-medium transition ${
                        selectedMusicGenre === genre
                          ? "bg-berry text-white"
                          : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-[11px] text-neutral-600">
                  <span>Mood</span>
                  <span>{selectedMusicMood}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Energetic",
                    "Warm",
                    "Dreamy",
                    "Lyrical",
                  ].map((mood) => (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setSelectedMusicMood(mood)}
                      className={`rounded-full border px-2.5 py-1.5 text-[11px] font-medium transition ${
                        selectedMusicMood === mood
                          ? "border-berry bg-violet-50 text-berry"
                          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
                      }`}
                    >
                      {mood}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => beginProcessing("Creating song")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-berry px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-berry-hover disabled:cursor-not-allowed disabled:opacity-80"
            >
              <Music className="h-4 w-4" />
              <span>{isProcessing ? "Generating..." : "Create Song"}</span>
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-[#f4f1ed] p-3">
            <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-neutral-700 sm:text-xs">
              <span>{statusMessage}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-berry transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "voice-over" && (
        <div className="mt-6 space-y-5">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-100 p-6 text-center">
            <Sparkles className="mx-auto mb-2 h-8 w-8 text-berry" />
            <h4 className="font-semibold text-darktext">AI Voiceover & Dub Sync</h4>
            <p className="mx-auto mt-1 max-w-md text-xs text-neutral-500">
              Match natural emotion, tone, and lip sync alignment across native African dialects.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-[#f0eee9] p-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">Scene settings</span>
              <button type="button" className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-neutral-700">
                Preview sync
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-neutral-200 bg-white p-2.5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Tone</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Warm",
                    "Bold",
                    "Calm",
                  ].map((tone) => (
                    <button
                      key={tone}
                      type="button"
                      onClick={() => setSelectedVoiceoverMood(tone)}
                      className={`rounded-full px-2 py-1 text-[10px] font-medium transition ${
                        selectedVoiceoverMood === tone ? "bg-berry text-white" : "bg-neutral-100 text-neutral-700"
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-neutral-200 bg-white p-2.5">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-500">Language</div>
                <div className="text-sm font-semibold text-darktext">{activeLangObj.name}</div>
              </div>

            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              disabled={isProcessing}
              onClick={() => beginProcessing("Generating voiceover")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-berry px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-berry-hover disabled:cursor-not-allowed disabled:opacity-80"
            >
              <span>{isProcessing ? "Generating..." : "Explore Voiceover Studio"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-[#f4f1ed] p-3">
            <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-neutral-700 sm:text-xs">
              <span>{statusMessage}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-berry transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {authGateOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#120b1d]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[1.75rem] border border-white/20 bg-[#f7f5f2] p-5 shadow-2xl shadow-violet-950/30">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">Auth gateway</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-darktext">Start creating</h3>
              </div>
              <button
                type="button"
                aria-label="Close auth gateway"
                onClick={() => setAuthGateOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition hover:bg-neutral-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm leading-relaxed text-neutral-600">
              {pendingAction} is available after sign in. Create your account or log in to unlock the studio.
            </p>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setAuthGateOpen(false);
                  router.push("/signup");
                }}
                className="inline-flex w-full items-center justify-center rounded-xl bg-berry px-4 py-3 text-sm font-semibold text-white transition hover:bg-berry-hover"
              >
                Create account
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthGateOpen(false);
                  router.push("/login");
                }}
                className="inline-flex w-full items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-darktext transition hover:bg-neutral-100"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
