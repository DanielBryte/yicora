"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const USE_CASES = [
  {
    title: "Video creators & publishers",
    description: "Use video dubbing to prepare existing clips for audiences in YiCORA’s supported languages.",
    href: "/video",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Scriptwriters & narrators",
    description: "Turn a written script into speech with YiCORA text-to-speech, then choose a voice that fits the read.",
    href: "/voice",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Creative & content teams",
    description: "Create voice-over drafts for explainers, social clips, and campaign concepts in the voice studio.",
    href: "/voice",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Music creators",
    description: "Build an original music idea from a prompt and shape it with the Music Box’s creative controls.",
    href: "/music",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Marketing teams",
    description: "Localize campaign assets across cultures, tones, and languages without sacrificing speed.",
    href: "/billing",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80",
  },
  {
    title: "Agencies & studios",
    description: "Ship cleaner, faster creative outputs across branded voice, video, and music workflows.",
    href: "/projects",
    image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=600&auto=format&fit=crop&q=80",
  },
];

export function UseCases() {
  return (
    <motion.section
      id="use-cases"
      className="bg-offwhite px-4 py-16 sm:py-20 lg:py-24"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 md:flex-row md:items-end lg:mb-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-darktext sm:text-4xl lg:text-5xl">
              YiCora Use Cases
            </h2>
            <p className="text-mutedtext mt-2 text-base sm:text-lg">
              Built for real-world creative workflows across Africa and beyond.
            </p>
          </div>

          <Link
            href="/signup"
            className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-berry hover:bg-berry-hover text-white font-medium text-xs sm:text-sm transition-all shadow-md active:scale-95"
          >
            <span>Start Creating</span>
          </Link>
        </motion.div>

        {/* Use Cases Cards Grid */}
        <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {USE_CASES.map((uc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: "easeOut" }}
            >
              <Link
                href={uc.href}
                className="group relative flex h-[440px] cursor-pointer flex-col justify-end overflow-hidden rounded-[1.5rem] border border-neutral-200/60 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-[470px] xl:h-[500px]"
              >
                <img
                  src={uc.image}
                  alt={uc.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/55 opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-white sm:p-6">
                  <h3 className="mb-2 flex items-center justify-between gap-3 text-[1.05rem] font-bold tracking-tight text-white sm:text-[1.2rem]">
                    <span className={uc.title === "Creative & content teams" ? "whitespace-nowrap text-[clamp(0.9rem,2.6vw,1.2rem)]" : ""}>{uc.title}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </h3>
                  <p className="max-w-[30ch] text-[11px] leading-relaxed text-neutral-300 sm:text-xs">
                    {uc.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-600">
            and more...
          </span>
        </motion.div>
      </div>
    </motion.section>
  );
}
