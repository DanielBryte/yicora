"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Video, Sparkles, CheckCircle2, Link as LinkIcon } from "lucide-react";
import { getVideoProvider } from "@/lib/providers/video";

const AFRICAN_LANGUAGES = [
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "sw", name: "Swahili", flag: "🇰🇪" },
  { code: "pd", name: "Pidgin English", flag: "🇳🇬" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", flag: "🇫🇷" },
];

export function VideoDubbingForm() {
  const router = useRouter();
  const [sourceVideoUrl, setSourceVideoUrl] = useState("https://youtube.com/watch?v=nollywood_demo");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("yo");
  const [subtitles, setSubtitles] = useState(true);
  const [translatedSubs, setTranslatedSubs] = useState(true);
  const [dubbedAudio, setDubbedAudio] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const provider = getVideoProvider();
      const result = await provider.dubVideo({
        sourceVideoUrl,
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        subtitlesEnabled: subtitles,
        translatedSubtitlesEnabled: translatedSubs,
        dubbedAudioEnabled: dubbedAudio,
      });

      // Route to project detail page
      router.push(`/video/${result.jobId}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200/80 space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-darktext tracking-tight flex items-center gap-2">
          <Video className="w-5 h-5 text-berry" />
          <span>New Video Dubbing Project</span>
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Upload video content or paste a link to localize into native African dialects.
        </p>
      </div>

      {/* Upload Dropzone */}
      <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 bg-neutral-50 text-center hover:border-berry/50 transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-2xl bg-pink-50 text-berry flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <Upload className="w-6 h-6" />
        </div>
        <h4 className="font-semibold text-darktext text-sm">Upload Video File</h4>
        <p className="text-xs text-neutral-400 mt-1">MP4, MOV, or WEBM (up to 500MB)</p>
      </div>

      {/* URL Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
          Or Video URL
        </label>
        <div className="relative">
          <LinkIcon className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-berry" />
          <input
            type="text"
            value={sourceVideoUrl}
            onChange={(e) => setSourceVideoUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full pl-11 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-berry/30 focus:border-berry text-darktext"
          />
        </div>
      </div>

      {/* Language Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1.5">
            Source Language
          </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {AFRICAN_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1.5">
            Target Language
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
          >
            {AFRICAN_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-semibold text-neutral-600 uppercase">
          Output Options
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer text-xs font-medium">
            <input
              type="checkbox"
              checked={subtitles}
              onChange={(e) => setSubtitles(e.target.checked)}
              className="accent-berry rounded w-4 h-4"
            />
            <span>Subtitles</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer text-xs font-medium">
            <input
              type="checkbox"
              checked={translatedSubs}
              onChange={(e) => setTranslatedSubs(e.target.checked)}
              className="accent-berry rounded w-4 h-4"
            />
            <span>Translated Subs</span>
          </label>

          <label className="flex items-center gap-2.5 p-3 rounded-xl border border-neutral-200 bg-neutral-50 cursor-pointer text-xs font-medium">
            <input
              type="checkbox"
              checked={dubbedAudio}
              onChange={(e) => setDubbedAudio(e.target.checked)}
              className="accent-berry rounded w-4 h-4"
            />
            <span>Dubbed Audio Track</span>
          </label>
        </div>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <div className="text-xs text-neutral-500 font-medium">
          Deducts <span className="font-bold text-berry">5 credits</span> per minute
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-full bg-berry hover:bg-berry-hover text-white font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? "Initializing Dub..." : "Start Video Dubbing"}</span>
        </button>
      </div>
    </form>
  );
}
