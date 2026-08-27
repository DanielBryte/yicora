import Link from "next/link";
import { InteractivePreview } from "./interactive-preview";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-burgundy-radial text-white overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-berry/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mt-4 mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          The AI localization infrastructure for African creative content.
        </h1>

        {/* Subheadline */}
        <p className="mt-5 text-sm sm:text-base text-neutral-300/90 max-w-2xl mx-auto font-normal leading-relaxed">
          YiCORA helps African creators, filmmakers, musicians, brands and media companies transform one piece of content into multiple languages, voices and markets.
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="px-6 py-2.5 rounded-[10px] bg-white text-darktext hover:bg-neutral-100 font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Get started for free</span>
          </Link>
          <a
            href="#pricing"
            className="px-6 py-2.5 rounded-[10px] bg-transparent hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/60 transition-all text-center"
          >
            See Pricing
          </a>
        </div>

        {/* Embedded Interactive Product Preview */}
        <InteractivePreview />
      </div>
    </section>
  );
}
