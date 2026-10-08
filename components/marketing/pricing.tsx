"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const PRICING_PLANS = [
  {
    name: "STARTER",
    price: "$19",
    credits: "20 minutes / credits",
    description: "Ideal for individual creators starting out with AI localization.",
    features: [
      "20 minutes of Video Dubbing",
      "Full access to 6 African Voices",
      "Basic AI Text-to-Speech",
      "Standard 1080p video output",
      "Standard queue processing",
    ],
    popular: false,
  },
  {
    name: "CREATOR",
    price: "$49",
    credits: "60 minutes / credits",
    description: "Our most popular pack for filmmakers, musicians & agencies.",
    features: [
      "60 minutes of Video & Voice Dubbing",
      "Full YiCORA AI Music Box (Afrobeats & Amapiano)",
      "Music DNA Reference Analyzer",
      "High Definition 4K video exports",
      "Priority processing queue",
      "Full commercial license",
    ],
    popular: true,
  },
  {
    name: "PRO",
    price: "$149",
    credits: "200 minutes / credits",
    description: "For high-volume studios, brands, and enterprise production.",
    features: [
      "200 minutes of credits across all tools",
      "Unlimited AI Music Box generations",
      "Batch Video Dubbing & Translation",
      "Instant priority rendering queue",
      "Custom voice model fine-tuning",
      "Dedicated account manager & API support",
    ],
    popular: false,
  },
];

export function Pricing() {
  return (
    <motion.section
      id="pricing"
      className="py-24 px-4 bg-offwhite text-darktext"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-6xl text-center">
        <motion.span
          className="text-xs font-bold uppercase tracking-widest text-berry block mb-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          PRICING
        </motion.span>
        <motion.h2
          className="text-3xl font-bold tracking-tight text-darktext sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
        >
          One price. No subscription.
        </motion.h2>
        <motion.p
          className="mx-auto mt-2 max-w-2xl text-xs text-mutedtext sm:text-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Simple, transparent credit packs to process video, voice, and music on demand.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 text-left sm:mt-14 md:grid-cols-2 xl:mt-16 xl:grid-cols-3">
          {PRICING_PLANS.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
              className={`relative flex min-h-[440px] flex-col justify-between rounded-[1.75rem] p-6 transition-all duration-300 sm:rounded-[2rem] sm:p-8 lg:p-9 ${
                plan.popular
                  ? "z-[1] border border-[#cbb3ff] bg-[#f7f1ff] text-[#211638] shadow-[0_20px_60px_rgba(91,48,153,0.14)] xl:scale-[1.025]"
                  : "border border-[#e7e3ed] bg-white text-darktext shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-950/[0.06]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-berry px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-violet-900/20">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-bold text-sm tracking-wider uppercase ${
                      plan.popular ? "text-[#6935bd]" : "text-neutral-500"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className={`text-xs ${plan.popular ? "text-[#777280]" : "text-neutral-500"}`}>
                    one-time
                  </span>
                </div>

                <div
                  className={`mt-2 inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                    plan.popular ? "bg-[#7130dc]/[0.09] text-[#6935bd]" : "bg-neutral-300/60 text-neutral-800"
                  }`}
                >
                  {plan.credits}
                </div>

                <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${plan.popular ? "text-[#625b6e]" : "text-mutedtext"}`}>
                  {plan.description}
                </p>

                <div className={`my-6 border-t ${plan.popular ? "border-[#7130dc]/15" : "border-neutral-300/30"}`} />

                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.popular ? "text-[#7130dc]" : "text-berry"
                        }`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/signup"
                  className={`w-full py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all text-center block ${
                    plan.popular
                      ? "bg-berry hover:bg-berry-hover text-white shadow-md shadow-violet-900/15 active:scale-[0.98]"
                      : "bg-darktext hover:bg-black text-white shadow-sm active:scale-95"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
