import Link from "next/link";
import { InteractivePreview } from "./interactive-preview";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 bg-burgundy-radial text-white overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-berry/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          The AI localization infrastructure for African creative content.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto font-normal leading-relaxed">
          YiCORA helps African creators, filmmakers, musicians, brands and media companies create, translate and transform content across languages and audiences.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-darktext hover:bg-neutral-100 font-semibold text-base transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-4 h-4 text-berry" />
          </Link>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-md transition-all text-center"
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
