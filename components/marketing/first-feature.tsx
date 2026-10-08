"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowRight,
  Check,
  FileAudio2,
  Mic2,
  Music2,
  Play,
  Volume2,
} from "lucide-react";

const FEATURES = [
  {
    id: "video-dubbing",
    label: "AI video dubbing",
    icon: Play,
    eyebrow: "FIRST TO LAUNCH · VIDEO DUBBING",
    title: "One video. More voices. Wider reach.",
    description:
      "Bring your video to more African audiences with natural-sounding dubbing in the languages they speak.",
    previewTitle: "Video dubbing studio",
    sourceLabel: "Source video · English",
    visualTitle: "A story ready to travel",
    visualCopy: "Keep the speaker, feeling, and message in every language.",
    visualKind: "video",
    outputTitle: "Localized versions",
    outputs: [
      ["Yoruba", "Voice + subtitles", true],
      ["Igbo", "Voice + subtitles", true],
      ["Hausa", "Natural voice", false],
      ["Swahili", "Natural voice", false],
    ],
    timelineLabel: "Dubbed audio",
    cta: "Try the video dubbing demo",
    href: "/video",
  },
  {
    id: "text-to-speech",
    label: "AI text-to-speech",
    icon: FileAudio2,
    eyebrow: "AI TEXT-TO-SPEECH",
    title: "Give every script a natural voice.",
    description:
      "Turn written words into expressive speech with voices that sound at home in the language.",
    previewTitle: "Text-to-speech studio",
    sourceLabel: "Voice script · Yoruba",
    visualTitle: "Ẹ káàbọ̀ sí ìtàn yìí",
    visualCopy: "A warm, conversational read with a natural Yoruba cadence.",
    visualKind: "script",
    outputTitle: "Choose a voice",
    outputs: [
      ["Amara", "Yoruba · warm", true],
      ["Dayo", "Yoruba · upbeat", false],
      ["Zola", "Swahili · calm", false],
      ["Tunde", "Nigerian English", false],
    ],
    timelineLabel: "Generated speech",
    cta: "Try text-to-speech",
    href: "/voice",
  },
  {
    id: "music-box",
    label: "AI music box",
    icon: Music2,
    eyebrow: "AI MUSIC BOX",
    title: "Find a sound that feels like yours.",
    description:
      "Shape an original track from a simple idea, with rhythms and textures inspired by the sounds you love.",
    previewTitle: "Music box studio",
    sourceLabel: "Track idea · Afrobeats",
    visualTitle: "Golden hour in Lagos",
    visualCopy: "Warm guitar · bright percussion · 104 BPM",
    visualKind: "music",
    outputTitle: "Your sound palette",
    outputs: [
      ["Warm guitar", "Melodic layer", true],
      ["Talking drum", "Percussion", true],
      ["Soft brass", "Accent layer", false],
      ["Bass groove", "Rhythm bed", false],
    ],
    timelineLabel: "Original composition",
    cta: "Explore the music box",
    href: "/music",
  },
  {
    id: "voice-over",
    label: "AI voice over",
    icon: Mic2,
    eyebrow: "AI VOICE OVER",
    title: "Put the right voice behind your story.",
    description:
      "Create a clear, characterful voice-over for explainers, campaigns, and the ideas you want heard.",
    previewTitle: "Voice-over studio",
    sourceLabel: "Voice-over · English",
    visualTitle: "Make the next moment count.",
    visualCopy: "A confident, clear delivery for a short brand film.",
    visualKind: "voice",
    outputTitle: "Voice direction",
    outputs: [
      ["Confident", "Delivery style", true],
      ["Warm", "Tone", true],
      ["Nigerian English", "Accent", false],
      ["Storytelling", "Pacing", false],
    ],
    timelineLabel: "Voice-over take",
    cta: "Try the voice-over demo",
    href: "/voice",
  },
] as const;

type Feature = (typeof FEATURES)[number];

function AudioWaveform({ color = "bg-violet-400/80" }: { color?: string }) {
  return (
    <div className="flex h-5 flex-1 items-center gap-[2px] overflow-hidden" aria-hidden="true">
      {Array.from({ length: 58 }, (_, index) => (
        <span
          key={index}
          className={`w-[2px] shrink-0 rounded-full ${color}`}
          style={{ height: `${20 + ((index * 19 + 13) % 80)}%` }}
        />
      ))}
    </div>
  );
}

function FeatureVisual({ feature }: { feature: Feature }) {
  if (feature.visualKind === "video") {
    return (
      <div className="relative min-h-44 overflow-hidden rounded-xl bg-[#261d2a] sm:min-h-56">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&crop=faces&w=1000&h=640&q=85"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/35" />
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
          {feature.sourceLabel}
        </span>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-neutral-900 shadow-lg sm:h-12 sm:w-12" aria-hidden="true">
          <Play className="ml-0.5 h-4 w-4 fill-current sm:h-5 sm:w-5" aria-hidden="true" />
        </span>
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 text-white">
          <Volume2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/35">
            <span className="block h-full w-[42%] rounded-full bg-white" />
          </div>
          <span className="text-[9px] font-medium">00:14 / 00:32</span>
        </div>
      </div>
    );
  }

  if (feature.visualKind === "music") {
    return (
      <div className="relative flex min-h-44 flex-col justify-between overflow-hidden rounded-xl bg-[#2d173f] p-4 text-white sm:min-h-56 sm:p-5">
        <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/15" />
        <div className="absolute -right-2 -top-6 h-36 w-36 rounded-full border border-white/15" />
        <span className="relative w-fit rounded-md bg-black/20 px-2 py-1 text-[10px] font-medium backdrop-blur-sm">{feature.sourceLabel}</span>
        <div className="relative">
          <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10">
            <Music2 className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="text-lg font-semibold tracking-tight sm:text-xl">{feature.visualTitle}</p>
          <p className="mt-1 text-[11px] text-white/75">{feature.visualCopy}</p>
        </div>
      </div>
    );
  }

  const Icon = feature.visualKind === "script" ? FileAudio2 : Mic2;
  return (
    <div className="relative flex min-h-44 flex-col justify-between overflow-hidden rounded-xl border border-violet-100 bg-[#faf8ff] p-4 sm:min-h-56 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-md bg-violet-100 px-2 py-1 text-[10px] font-medium text-violet-800">{feature.sourceLabel}</span>
        <Icon className="h-4 w-4 text-violet-600" aria-hidden="true" />
      </div>
      <div>
        <p className="text-base font-semibold leading-snug tracking-tight text-neutral-900 sm:text-lg">“{feature.visualTitle}”</p>
        <p className="mt-1.5 max-w-sm text-[11px] leading-relaxed text-neutral-600">{feature.visualCopy}</p>
      </div>
    </div>
  );
}

export function FirstFeature() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const feature = FEATURES[activeIndex];
  const FeatureIcon = feature.icon;

  function selectTab(index: number, focus = false) {
    setActiveIndex(index);
    if (focus) tabRefs.current[index]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % FEATURES.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + FEATURES.length) % FEATURES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = FEATURES.length - 1;
    else return;
    event.preventDefault();
    selectTab(nextIndex, true);
  }

  return (
    <section id="video-dubbing" className="bg-offwhite px-4 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
          <h2 className="text-3xl font-bold leading-tight tracking-tight text-darktext sm:text-4xl lg:text-[2.75rem]">
            Pick a tool. Bring your next idea to life.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-600 sm:text-base">
            Start with video dubbing, then explore the voice and music tools in YiCORA’s first release.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="YiCORA launch features"
          className="mx-auto mb-6 grid max-w-5xl grid-cols-2 gap-1.5 rounded-2xl border border-neutral-200 bg-white p-1.5 shadow-sm sm:mb-8 sm:rounded-full sm:p-2 lg:grid-cols-4"
        >
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            const selected = index === activeIndex;
            return (
              <button
                key={item.id}
                ref={(element) => { tabRefs.current[index] = element; }}
                id={`${item.id}-tab`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${item.id}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectTab(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry focus-visible:ring-offset-2 sm:rounded-full sm:px-4 sm:text-sm ${
                  selected
                    ? "bg-berry text-white shadow-sm"
                    : "text-neutral-700 hover:bg-violet-50 hover:text-berry"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
                {index === 0 && (
                  <span className={`hidden rounded-full px-2 py-0.5 text-[9px] font-semibold sm:inline-flex ${selected ? "bg-white/15 text-white" : "bg-violet-50 text-violet-700"}`}>
                    First
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div
          id={`${feature.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${feature.id}-tab`}
          tabIndex={0}
          className="relative isolate overflow-hidden rounded-3xl bg-[#17131b] text-white shadow-[0_24px_80px_-32px_rgba(31,12,56,0.45)] outline-none focus-visible:ring-2 focus-visible:ring-berry sm:rounded-[2rem]"
        >
          <div className="pointer-events-none absolute -right-24 -top-36 -z-10 h-[28rem] w-[28rem] rounded-full bg-violet-600/20 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-48 left-1/3 -z-10 h-[24rem] w-[24rem] rounded-full bg-fuchsia-700/15 blur-[100px]" />

          <div className="grid items-center gap-9 p-5 sm:p-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10 lg:p-12">
            <div className="max-w-md" key={feature.id}>
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">
                <FeatureIcon className="h-4 w-4" aria-hidden="true" />
                {feature.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                {feature.description}
              </p>

              <Link
                href={feature.href}
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-berry px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-berry-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#17131b]"
              >
                {feature.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div
              role="img"
              aria-label={`${feature.previewTitle} dashboard preview`}
              className="relative mx-auto w-full max-w-3xl rounded-2xl border border-white/15 bg-[#f5f3f7] p-2.5 text-neutral-900 shadow-2xl shadow-black/30 sm:rounded-[1.5rem] sm:p-3"
              key={`preview-${feature.id}`}
            >
              <div className="flex h-9 items-center justify-between border-b border-neutral-200 px-1 pb-2 sm:h-10 sm:px-2">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-[#ff6b67]" />
                  <span className="h-2 w-2 rounded-full bg-[#f4bd4f]" />
                  <span className="h-2 w-2 rounded-full bg-[#57c66b]" />
                </div>
                <span className="text-[9px] font-semibold tracking-[0.12em] text-neutral-500 sm:text-[10px]">
                  YICORA · {feature.previewTitle.toUpperCase()}
                </span>
                <span className="rounded-md bg-white px-2 py-1 text-[9px] font-medium text-neutral-500 shadow-sm sm:text-[10px]">
                  Draft
                </span>
              </div>

              <div className="grid gap-2.5 pt-2.5 md:grid-cols-[1.35fr_0.85fr] md:gap-3 md:pt-3">
                <FeatureVisual feature={feature} />

                <div className="rounded-xl border border-neutral-200 bg-white p-3 sm:p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-semibold text-neutral-800 sm:text-xs">{feature.outputTitle}</p>
                    <span className="shrink-0 rounded-full bg-violet-50 px-2 py-1 text-[9px] font-semibold text-violet-700">
                      {feature.outputs.length} options
                    </span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {feature.outputs.map(([name, detail, ready]) => (
                      <div key={name} className="flex items-center gap-2 rounded-lg border border-neutral-100 bg-[#faf9fb] p-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-violet-100 text-[9px] font-bold text-violet-800">
                          {name.slice(0, 2).toUpperCase()}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[10px] font-medium text-neutral-700 sm:text-[11px]">{name}</span>
                          <span className="block truncate text-[9px] text-neutral-500">{detail}</span>
                        </span>
                        {ready ? (
                          <span className="flex items-center gap-1 text-[9px] font-medium text-emerald-700">
                            <Check className="h-3 w-3" aria-hidden="true" /> Ready
                          </span>
                        ) : (
                          <span className="h-1.5 w-8 overflow-hidden rounded-full bg-neutral-200">
                            <span className="block h-full w-2/3 rounded-full bg-violet-500" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5">
                    <span className="text-[9px] text-neutral-500">Preview workspace</span>
                    <span className="rounded-md bg-berry px-2.5 py-1.5 text-[9px] font-semibold text-white">Create</span>
                  </div>
                </div>
              </div>

              <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 sm:mt-3">
                <span className="text-[9px] font-semibold uppercase tracking-wide text-neutral-500">{feature.timelineLabel}</span>
                <AudioWaveform />
                <span className="text-[9px] font-medium text-neutral-500">00:32</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
