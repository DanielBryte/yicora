"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { InteractivePreview } from "./interactive-preview";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex w-full flex-col items-center overflow-hidden px-4 pb-10 pt-6 text-white sm:pb-16 sm:pt-8 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute left-[7%] top-[10%] h-56 w-56 rounded-full bg-violet-500/18 blur-3xl"
          animate={reduceMotion ? { opacity: 0.4 } : { x: [0, 18, 0], y: [0, -14, 0], opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-fuchsia-400/12 blur-3xl"
          animate={reduceMotion ? { opacity: 0.4 } : { x: [0, -22, 0], y: [0, 18, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.div
          role="group"
          aria-label="Used by more than 300,000 creators"
          className="mx-auto mb-6 inline-flex w-fit self-center items-center gap-2.5 text-left sm:mb-7"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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
        </motion.div>

        <motion.h1
          className="mx-auto w-full max-w-[1600px] text-[clamp(2.5rem,4.2vw,5.5rem)] font-black leading-[1.08] tracking-[-0.04em] text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block">The AI localization infrastructure</span>
          <span className="block">for creative content.</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-8 w-full max-w-2xl text-sm font-normal leading-7 text-white/75 sm:mt-9 sm:text-base sm:leading-8 lg:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Dub videos, turn scripts into natural speech, and create voice-overs in Yoruba, Igbo, Hausa, Swahili, Nigerian Pidgin and other local accents. Choose a tool below to try it.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-lg flex-row items-center justify-center gap-3 sm:mt-9"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="#preview"
            whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-berry px-3 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/20 transition-all duration-200 ease-out hover:bg-berry-hover hover:shadow-xl hover:shadow-violet-950/25 sm:flex-none sm:px-6"
          >
            Try It Out
            <motion.span
              animate={reduceMotion ? undefined : { rotate: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </motion.a>
          <motion.div whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/signup"
              className="inline-flex min-h-11 min-w-0 flex-1 items-center justify-center rounded-full border border-[#d9c7ff] bg-[#eee6ff] px-3 py-2.5 text-center text-sm font-medium text-[#35135f] shadow-sm shadow-violet-900/10 transition-all duration-200 ease-out hover:bg-[#e9dcff] hover:shadow-md sm:flex-none sm:px-5"
            >
              Sign up free
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full self-center"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full">
            <InteractivePreview />
          </div>
        </motion.div>

        <motion.div
          className="mx-auto mt-9 w-full max-w-5xl border-t border-white/10 pt-6 text-center sm:mt-11 sm:pt-7"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
