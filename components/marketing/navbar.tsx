"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type PointerEvent as ReactPointerEvent } from "react";
import { Logo } from "@/components/shared/logo";
import {
  ArrowUpRight,
  AudioLines,
  ChevronDown,
  Compass,
  Mic2,
  Menu,
  Music2,
  Video,
  X,
  WandSparkles,
} from "lucide-react";

const PRODUCT_COLUMNS = [
  {
    title: "Video",
    icon: Video,
    links: [
      { label: "AI video dubbing", description: "Localize videos for new audiences", href: "/video" },
      { label: "Try the video demo", description: "See the workflow before you start", href: "#preview" },
    ],
  },
  {
    title: "Voice",
    icon: Mic2,
    links: [
      { label: "Text to speech", description: "Turn scripts into natural speech", href: "/voice" },
      { label: "AI voice-over", description: "Find the right delivery for your story", href: "/voice" },
    ],
  },
  {
    title: "Music",
    icon: Music2,
    links: [
      { label: "AI music box", description: "Build a track from a creative brief", href: "/music" },
      { label: "Afrobeats & Amapiano", description: "Shape a sound with regional character", href: "/music" },
    ],
  },
  {
    title: "For your workflow",
    icon: Compass,
    links: [
      { label: "Explore use cases", description: "For creators, studios, and growing teams", href: "#use-cases" },
      { label: "Plans & pricing", description: "Find a plan for your next project", href: "#pricing" },
    ],
  },
];

const VOICE_LANGUAGES = [
  ["Yoruba", "Nigeria"],
  ["Igbo", "Nigeria"],
  ["Hausa", "West Africa"],
  ["Swahili", "East Africa"],
  ["Nigerian Pidgin", "Nigeria"],
];

const menuLinkClass =
  "block rounded-xl px-3 py-3 text-sm text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300";

export function MarketingNavbar() {
  const [openMenu, setOpenMenu] = useState<"products" | "voices" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);
  const voicesTriggerRef = useRef<HTMLButtonElement>(null);
  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedMenuRef = useRef<"products" | "voices" | null>(null);

  function cancelScheduledClose() {
    if (closeMenuTimerRef.current) {
      clearTimeout(closeMenuTimerRef.current);
      closeMenuTimerRef.current = null;
    }
  }

  function scheduleMenuClose() {
    cancelScheduledClose();
    closeMenuTimerRef.current = setTimeout(() => {
      setOpenMenu(null);
      hoverOpenedMenuRef.current = null;
      closeMenuTimerRef.current = null;
    }, 180);
  }

  function openMenuOnHover(menu: "products" | "voices", event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
    cancelScheduledClose();
    hoverOpenedMenuRef.current = menu;
    setOpenMenu(menu);
  }

  useEffect(() => {
    if (!openMenu) return;

    function closeOnOutsidePointer(event: PointerEvent) {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        (openMenu === "products" ? productsTriggerRef : voicesTriggerRef).current?.focus();
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openMenu]);

  function toggleMenu(menu: "products" | "voices") {
    cancelScheduledClose();
    if (hoverOpenedMenuRef.current === menu) {
      hoverOpenedMenuRef.current = null;
      return;
    }
    setOpenMenu((current) => (current === menu ? null : menu));
  }

  function closeAfterNavigation(event: ReactMouseEvent<HTMLDivElement>) {
    if ((event.target as HTMLElement).closest("a")) setOpenMenu(null);
  }

  useEffect(() => () => {
    if (closeMenuTimerRef.current) clearTimeout(closeMenuTimerRef.current);
  }, []);

  return (
    <header className="w-full bg-transparent px-3 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-6">
      <nav
        ref={navRef}
        onPointerEnter={cancelScheduledClose}
        onPointerLeave={scheduleMenuClose}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            cancelScheduledClose();
            hoverOpenedMenuRef.current = null;
            setOpenMenu(null);
          }
        }}
        className="relative mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-2 py-2 md:gap-6 sm:min-h-[72px]"
      >
        <Logo variant="light" />

        <div className="hidden items-center gap-4 whitespace-nowrap text-base font-medium tracking-tight text-white/90 md:flex lg:gap-7">
          <button
            ref={productsTriggerRef}
            id="products-trigger"
            type="button"
            aria-expanded={openMenu === "products"}
            aria-controls={openMenu === "products" ? "products-menu" : undefined}
            onPointerEnter={(event) => openMenuOnHover("products", event)}
            onClick={() => toggleMenu("products")}
            className="flex items-center gap-1.5 rounded-md py-2 transition-colors hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            Products
            <ChevronDown className={`h-4 w-4 opacity-70 transition-transform ${openMenu === "products" ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          <button
            ref={voicesTriggerRef}
            id="voices-trigger"
            type="button"
            aria-expanded={openMenu === "voices"}
            aria-controls={openMenu === "voices" ? "voices-menu" : undefined}
            onPointerEnter={(event) => openMenuOnHover("voices", event)}
            onClick={() => toggleMenu("voices")}
            className="flex items-center gap-1.5 rounded-md py-2 transition-colors hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
          >
            Voices
            <ChevronDown className={`h-4 w-4 opacity-70 transition-transform ${openMenu === "voices" ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>

          <a href="#use-cases" className="rounded-md py-2 transition-colors hover:text-violet-200">Use Cases</a>
          <a href="#pricing" className="rounded-md py-2 transition-colors hover:text-violet-200">Pricing</a>
        </div>

        {openMenu === "products" && (
          <div
            id="products-menu"
            role="region"
            aria-labelledby="products-trigger"
            onPointerEnter={cancelScheduledClose}
            onClick={closeAfterNavigation}
            className="absolute left-1/2 top-full z-50 mt-3 max-h-[min(72vh,560px)] w-[min(92vw,1150px)] -translate-x-1/2 overflow-x-hidden overflow-y-auto rounded-3xl border border-white/10 bg-[#17131b]/[0.97] p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6 lg:p-8"
          >
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/10 pb-4 sm:mb-6 sm:pb-5">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Explore YiCORA</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/65">One studio for video, voice, and original sound.</p>
              </div>
              <Link href="#preview" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-violet-200 transition-colors hover:text-white sm:inline-flex">
                Try It Out <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
              {PRODUCT_COLUMNS.map(({ title, icon: Icon, links }) => (
                <div key={title} className="min-w-0">
                  <h3 className="flex items-center gap-2.5 text-lg font-semibold text-white">
                    <Icon className="h-5 w-5 shrink-0 text-violet-300" aria-hidden="true" />
                    {title}
                  </h3>
                  <div className="mt-3 space-y-1">
                    {links.map((item) => (
                      <Link key={item.label} href={item.href} className={menuLinkClass}>
                        {item.label}
                        <span className="mt-1 block whitespace-normal text-xs font-normal leading-relaxed text-white/45">{item.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {openMenu === "voices" && (
          <div
            id="voices-menu"
            role="region"
            aria-labelledby="voices-trigger"
            onPointerEnter={cancelScheduledClose}
            onClick={closeAfterNavigation}
            className="absolute left-1/2 top-full z-50 mt-3 max-h-[min(72vh,560px)] w-[min(92vw,960px)] -translate-x-1/2 overflow-x-hidden overflow-y-auto rounded-3xl border border-white/10 bg-[#17131b]/[0.97] p-4 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6 lg:p-8"
          >
            <div className="grid gap-6 sm:grid-cols-[1.15fr_1fr_0.9fr] sm:gap-7">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-300">Find your voice</p>
                <h3 className="mt-2 text-lg font-semibold text-white">Voices made for your story</h3>
                <p className="mt-2 max-w-xs whitespace-normal text-sm leading-relaxed text-white/60">
                  Choose a voice for dubbing, narration, or a script that needs to be heard.
                </p>
                <Link href="/voice" className="mt-4 inline-flex items-center gap-1 rounded-lg py-1.5 text-sm font-semibold text-violet-200 transition-colors hover:text-white">
                  Explore the voice studio <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="min-w-0">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">Languages</h3>
                <div className="mt-3 grid grid-cols-2 gap-1">
                  {VOICE_LANGUAGES.map(([language, region]) => (
                    <Link key={language} href="/voice" className="min-w-0 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300">
                      <span className="block truncate text-sm font-medium text-white/85">{language}</span>
                      <span className="mt-0.5 block truncate text-[11px] text-white/45">{region}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="min-w-0 border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <AudioLines className="h-5 w-5 shrink-0 text-violet-300" aria-hidden="true" /> Voice tools
                </h3>
                <div className="mt-3 space-y-1">
                  <Link href="/voice" className={menuLinkClass}>Text to speech</Link>
                  <Link href="/voice" className={menuLinkClass}>Voice-over</Link>
                  <Link href="/video" className={menuLinkClass}>Video dubbing</Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center space-x-2 sm:space-x-3 md:flex">
            <Link href="/login" className="rounded-full px-2 py-1.5 text-[13px] font-medium text-white/90 transition-colors hover:text-white sm:px-3 sm:text-sm">
              Log In
            </Link>
            <Link href="/signup" className="flex items-center justify-center gap-2 rounded-full bg-berry px-3 py-2 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-berry-hover hover:shadow active:scale-95 sm:px-6 sm:py-2.5 sm:text-sm">
              <WandSparkles className="h-4 w-4" aria-hidden="true" />
              Try It Out
            </Link>
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-marketing-menu"
            onClick={() => {
              setOpenMenu(null);
              setMobileOpen((open) => !open);
            }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-marketing-menu"
            aria-label="Mobile navigation"
            className="absolute inset-x-0 top-full z-50 mt-2 grid gap-1 rounded-2xl border border-white/10 bg-[#17131b]/[0.98] p-3 text-white shadow-2xl shadow-black/40 backdrop-blur-2xl md:hidden"
          >
            {[
              ["Products", "#preview"],
              ["Voices", "/voice"],
              ["Use cases", "/use-cases"],
              ["Pricing", "/pricing"],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-4 text-sm font-semibold text-white/85 transition hover:bg-white/[0.08]">
                Log In
              </Link>
              <Link href="/signup" onClick={() => setMobileOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-berry px-4 text-sm font-semibold text-white transition hover:bg-berry-hover">
                <WandSparkles className="h-4 w-4" aria-hidden="true" />
                Try It Out
              </Link>
            </div>
          </nav>
        )}
      </nav>
    </header>
  );
}
