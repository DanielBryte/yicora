import Link from "next/link";
import { InteractivePreview } from "./interactive-preview";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-4 pb-10 pt-6 text-white sm:pb-16 sm:pt-8 lg:pb-20">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <div
          role="group"
          aria-label="Used by more than 300,000 creators"
          className="mx-auto mb-5 inline-flex w-fit self-center items-center gap-2.5 text-left sm:mb-6"
        >
          <div className="flex shrink-0 -space-x-2" aria-hidden="true">
            {[
              "photo-1534528741775-53994a69daeb",
              "photo-1500648767791-00dcc994a43e",
              "photo-1531123897727-8f129e1688ce",
              "photo-1506794778202-cad84cf45f1d",
            ].map((photo) => (
              <img
                key={photo}
                src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&crop=faces&w=96&h=96&q=80`}
                alt=""
                width="28"
                height="28"
                loading="eager"
                decoding="async"
                className="relative h-7 w-7 rounded-full border-2 border-[#160b20] object-cover"
              />
            ))}
          </div>
          <p className="whitespace-nowrap text-[11px] leading-tight text-white/70 sm:text-xs">
            <span className="font-semibold text-white">300,000</span>
            <span className="ml-1">creators using YiCORA</span>
          </p>
        </div>

        <h1 className="mx-auto w-full max-w-5xl text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">
          The AI localization infrastructure for <span className="whitespace-nowrap">creative content.</span>
        </h1>

        <p className="mx-auto mt-4 w-full max-w-2xl text-sm font-normal leading-relaxed text-white/75 sm:text-base lg:text-lg">
          Dub videos, turn scripts into natural speech, and create voice-overs in Yoruba, Igbo, Hausa, Swahili, and Nigerian Pidgin. Choose a tool below to try it.
        </p>

        <div className="mt-7 flex w-full max-w-lg flex-row items-center justify-center gap-3 sm:mt-8">
          <a
            href="#preview"
            className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-berry px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-berry-hover hover:shadow-xl hover:shadow-violet-950/25 active:translate-y-0 active:scale-[.98] sm:flex-none sm:px-6"
          >
            Try It Out
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/signup"
            className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full border border-[#d9c7ff] bg-[#eee6ff] px-3 py-2.5 text-center text-sm font-medium text-[#35135f] shadow-sm shadow-violet-900/10 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e9dcff] hover:shadow-md active:translate-y-0 active:scale-[.98] sm:flex-none sm:px-5"
          >
            Sign up free
          </Link>
        </div>

        {/* Embedded Interactive Product Preview */}
        <div className="w-full self-center">
          <InteractivePreview />
        </div>

        <div className="mx-auto mt-9 w-full max-w-5xl border-t border-white/10 pt-6 text-center sm:mt-11 sm:pt-7">
          <p className="text-xs font-medium tracking-wide text-white/65 sm:text-sm">
            Made for creators, studios, and brands carrying African stories further.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 sm:gap-x-10" aria-label="Illustrative sample company names">
            {["Kora House", "Sauti Studio", "Moyo Creative", "Nuru Films", "AfriFrame", "Coastline Media"].map((name) => (
              <span key={name} className="text-sm font-semibold tracking-tight text-white/45 sm:text-base">
                {name}
              </span>
            ))}
          </div>
          <span className="mt-2 block text-[9px] uppercase tracking-[0.16em] text-white/30">Illustrative sample brands</span>
        </div>
      </div>
    </section>
  );
}
