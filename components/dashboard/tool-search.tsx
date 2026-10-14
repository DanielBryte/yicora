"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Clapperboard, CreditCard, FolderKanban, Mic, Music, Search, Settings, Shirt, Sparkles, UserRound } from "lucide-react";

const DESTINATIONS = [
  { name: "Music Box", description: "Generate original music", href: "/music", keywords: "music song audio compose generate", icon: Music, group: "Create", available: true },
  { name: "Video Dubbing", description: "Translate and dub video content", href: "/video", keywords: "video dubbing subtitles localization translate", icon: Clapperboard, group: "Create", available: false },
  { name: "Voice Studio", description: "Create speech from a script", href: "/voice", keywords: "voice audio speech narration text to speech tts", icon: Mic, group: "Create", available: false },
  { name: "Virtual Try-On", description: "Try outfits live with a garment photo", href: "/dashboard/virtual-try-on", keywords: "virtual try on clothes fashion outfit garment live camera", icon: Shirt, group: "Create", available: true },
  { name: "AI Face Changer", description: "Transform your look live with a reference image", href: "/dashboard/face-changer", keywords: "face changer face swap character live camera", icon: UserRound, group: "Create", available: true },
  { name: "AI UGC Studio", description: "Create creator-style brand videos", href: "#coming-soon", keywords: "ugc creator video user generated content", icon: Sparkles, group: "Create", available: false },
  { name: "Projects", description: "Browse and manage your creations", href: "/projects", keywords: "projects library assets files generations", icon: FolderKanban, group: "Workspace", available: true },
  { name: "Billing & Credits", description: "View your balance and transactions", href: "/billing", keywords: "billing credits payments plan usage", icon: CreditCard, group: "Workspace", available: true },
  { name: "Settings", description: "Manage your account preferences", href: "/settings", keywords: "settings account profile preferences", icon: Settings, group: "Workspace", available: true },
];

export function ToolSearch() {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return DESTINATIONS;
    return DESTINATIONS.filter(({ name, description, keywords }) =>
      `${name} ${description} ${keywords}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target?.tagName ?? "");
      if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
      if (event.key === "Escape" && open) {
        setOpen(false);
        inputRef.current?.blur();
      }
    }

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [open]);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  function openDestination(index = activeIndex) {
    const destination = results[index];
    if (!destination || !destination.available) return;
    setOpen(false);
    setQuery("");
    router.push(destination.href);
  }

  return (
    <div ref={rootRef} className="relative mx-auto w-full max-w-3xl">
      <label htmlFor="dashboard-tool-search" className="sr-only">Search tools and workspace pages</label>
      <div className={`tool-search-control flex h-14 items-center gap-3 rounded-xl border bg-white px-4 transition-colors ${open ? "border-[#d6d3dc]" : "border-[#e8e7ed] hover:border-[#d6d1df]"}`}>
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-neutral-500" />
        <input
          id="dashboard-tool-search"
          ref={inputRef}
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="dashboard-search-results"
          aria-activedescendant={open && results[activeIndex] ? `dashboard-search-result-${activeIndex}` : undefined}
          autoComplete="off"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && results.length) {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((index) => (index + 1) % results.length);
            } else if (event.key === "ArrowUp" && results.length) {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((index) => (index - 1 + results.length) % results.length);
            } else if (event.key === "Enter") {
              event.preventDefault();
              openDestination();
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search tools and workspace…"
          className="tool-search-input min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-darktext outline-none placeholder:text-neutral-400 focus:ring-0"
        />
        <kbd className="hidden rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1 font-sans text-xs font-medium text-neutral-500 sm:inline-flex">/</kbd>
      </div>

      {open && (
        <div className="absolute inset-x-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl border border-[#e8e7ed] bg-white shadow-[0_16px_40px_rgba(32,28,39,0.12)]">
          <div className="max-h-[min(60vh,420px)] overflow-y-auto p-2" id="dashboard-search-results" role="listbox" aria-label="Search destinations">
            {results.length ? results.map(({ name, description, href, icon: Icon, group, available }, index) => (
              <div
                id={`dashboard-search-result-${index}`}
                key={href}
                role="option"
                aria-selected={index === activeIndex}
                aria-disabled={!available}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => available && openDestination(index)}
                className={`flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-2 text-left ${available ? "cursor-pointer" : "cursor-not-allowed opacity-65"} ${index === activeIndex ? "bg-[#f7f6f9]" : "bg-white"}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#f2edfb] text-[#5d3ab7]">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-darktext">{name}</span>
                  <span className="block truncate text-xs text-neutral-500">{description}</span>
                </span>
                <span className="hidden text-[11px] text-neutral-400 sm:block">{group}</span>
                {!available ? (
                  <span className="rounded-full bg-neutral-100 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-neutral-500">Coming soon</span>
                ) : (
                  <ArrowRight aria-hidden="true" className="h-4 w-4 text-neutral-400" />
                )}
              </div>
            )) : (
              <p className="px-3 py-6 text-center text-sm text-neutral-500">No matching tools or pages.</p>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-neutral-100 px-3 py-2 text-[11px] text-neutral-400">
            <span>Search destinations</span>
            <span><kbd className="font-sans">↑</kbd> <kbd className="font-sans">↓</kbd> to navigate · <kbd className="font-sans">Enter</kbd> to open</span>
          </div>
        </div>
      )}
    </div>
  );
}
