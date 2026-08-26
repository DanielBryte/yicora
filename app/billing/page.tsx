"use client";

import DashboardLayout from "@/app/dashboard/layout";
import { Coins, Sparkles, Check, ArrowRight, History } from "lucide-react";
import { useState } from "react";

const CREDIT_TRANSACTIONS = [
  { id: "tx_1", date: "August 26, 2026", description: "Welcome bonus free credits", amount: "+50", type: "credit" },
  { id: "tx_2", date: "August 26, 2026", description: "AI Video Dubbing - Nollywood Short", amount: "-5", type: "debit" },
  { id: "tx_3", date: "August 26, 2026", description: "AI Music Box Generation - Afrobeats", amount: "-10", type: "debit" },
  { id: "tx_4", date: "August 25, 2026", description: "AI Voice Synthesis - Igbo Script", amount: "-2", type: "debit" },
];

export default function BillingPage() {
  const [credits, setCredits] = useState(50);

  const handleBuyPack = (amount: number, price: string) => {
    alert(`Added ${amount} credits for ${price}! (Payment integration ready for Stripe/Paystack)`);
    setCredits((prev) => prev + amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-darktext tracking-tight">Billing & Credit Packs</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage your credit balance, view transaction ledger, and top up minutes on demand.
          </p>
        </div>

        {/* Current Balance Banner */}
        <div className="bg-burgundy rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-berry flex items-center justify-center shadow-lg shrink-0">
              <Coins className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-300">Available Credit Balance</span>
              <div className="text-4xl font-extrabold text-white tracking-tight mt-0.5">{credits} Credits</div>
              <p className="text-xs text-neutral-300 mt-1">Approx. {credits * 2} minutes of voice synthesis or {Math.round(credits / 5)} video dubbing minutes</p>
            </div>
          </div>

          <a
            href="#packs"
            className="px-6 py-3 rounded-full bg-white text-darktext hover:bg-neutral-100 font-bold text-xs shadow-md transition-colors whitespace-nowrap"
          >
            Buy Credit Packs
          </a>
        </div>

        {/* Credit Packs */}
        <div id="packs" className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600">
            Top Up Credit Packs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "STARTER", price: "$19", credits: 20, popular: false },
              { name: "CREATOR", price: "$49", credits: 60, popular: true },
              { name: "PRO", price: "$149", credits: 200, popular: false },
            ].map((pack, i) => (
              <div
                key={i}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  pack.popular
                    ? "bg-burgundy text-white border-pink-500/50 shadow-xl"
                    : "bg-white text-darktext border-neutral-200/80 shadow-sm hover:shadow-md"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm tracking-wider uppercase text-pink-300">{pack.name}</span>
                    {pack.popular && (
                      <span className="px-3 py-0.5 rounded-full bg-berry text-white text-[10px] font-bold uppercase">Popular</span>
                    )}
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold">{pack.price}</span>
                    <span className={`text-xs ${pack.popular ? "text-neutral-300" : "text-neutral-500"}`}>one-time</span>
                  </div>

                  <div className={`mt-3 inline-block px-3 py-1 rounded-lg text-xs font-bold ${
                    pack.popular ? "bg-white/10 text-pink-200" : "bg-neutral-100 text-neutral-700"
                  }`}>
                    {pack.credits} Credits Included
                  </div>
                </div>

                <button
                  onClick={() => handleBuyPack(pack.credits, pack.price)}
                  className={`mt-6 w-full py-3 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                    pack.popular
                      ? "bg-berry hover:bg-berry-hover text-white shadow-md active:scale-95"
                      : "bg-darktext hover:bg-black text-white active:scale-95"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Purchase Pack</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-600 flex items-center gap-2">
              <History className="w-4 h-4 text-berry" />
              <span>Credit Transaction Ledger</span>
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider font-semibold">
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Description</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {CREDIT_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50">
                    <td className="py-3 px-2 text-neutral-500">{tx.date}</td>
                    <td className="py-3 px-2 font-medium text-darktext">{tx.description}</td>
                    <td className={`py-3 px-2 text-right font-bold ${tx.type === "credit" ? "text-emerald-600" : "text-darktext"}`}>
                      {tx.amount} Credits
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
