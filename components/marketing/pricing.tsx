import Link from "next/link";
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
    <section id="pricing" className="py-24 px-4 bg-offwhite text-darktext">
      <div className="max-w-6xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-berry block mb-2">
          PRICING
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-darktext">
          One price. No subscription.
        </h2>
        <p className="text-mutedtext mt-2 text-xs sm:text-sm max-w-2xl mx-auto">
          Simple, transparent credit packs to process video, voice, and music on demand.
        </p>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left items-stretch">
          {PRICING_PLANS.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-[2.5rem] p-8 sm:p-9 transition-all duration-300 flex flex-col justify-between min-h-[480px] ${
                plan.popular
                  ? "bg-[#23001C] text-white shadow-2xl scale-105 border border-pink-500/20"
                  : "bg-[#ECEAE5] text-darktext border border-neutral-300/60 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-xl bg-berry text-white font-bold text-[11px] uppercase tracking-wider shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-bold text-sm tracking-wider uppercase ${
                      plan.popular ? "text-pink-200" : "text-neutral-500"
                    }`}
                  >
                    {plan.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className={`text-xs ${plan.popular ? "text-neutral-300" : "text-neutral-500"}`}>
                    one-time
                  </span>
                </div>

                <div
                  className={`mt-2 inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
                    plan.popular ? "bg-white/10 text-pink-200" : "bg-neutral-300/60 text-neutral-800"
                  }`}
                >
                  {plan.credits}
                </div>

                <p className={`mt-4 text-xs sm:text-sm leading-relaxed ${plan.popular ? "text-neutral-300" : "text-mutedtext"}`}>
                  {plan.description}
                </p>

                <div className="my-6 border-t border-neutral-300/30" />

                <ul className="space-y-2.5 text-xs sm:text-sm">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.popular ? "text-pink-400" : "text-berry"
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
                      ? "bg-berry hover:bg-berry-hover text-white shadow-md active:scale-95"
                      : "bg-darktext hover:bg-black text-white shadow-sm active:scale-95"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
