"use client";

import DashboardLayout from "@/app/dashboard/layout";
import { Coins, Sparkles, History } from "lucide-react";
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
      <div className="w-full space-y-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Workspace · Billing</p>
            <h1 className="text-2xl font-bold tracking-tight text-darktext sm:text-3xl">Billing & credits</h1>
            <p className="mt-1 text-sm text-neutral-500">Review your balance, choose a credit pack, and follow recent activity.</p>
          </div>
          <a href="#transactions" className="inline-flex min-h-10 items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
            View transaction history
          </a>
        </div>

        {/* Current Balance Banner */}
        <div className="grid gap-6 rounded-2xl border border-neutral-200 bg-white p-5 text-darktext sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#f2edfb] flex items-center justify-center shrink-0">
              <Coins className="w-6 h-6 text-berry" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Available credit balance</span>
              <div className="text-3xl font-bold text-darktext tracking-tight mt-1">{credits} Credits</div>
              <p className="text-xs text-neutral-500 mt-1">Approx. {credits * 2} minutes of voice synthesis or {Math.round(credits / 5)} video dubbing minutes</p>
            </div>
          </div>

          <a
            href="#packs"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-berry px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-berry-hover"
          >
            Buy Credit Packs
          </a>
        </div>

        {/* Credit Packs */}
        <div id="packs" className="space-y-4 scroll-mt-24">
          <div>
            <h2 className="text-lg font-semibold text-darktext">Choose a credit pack</h2>
            <p className="mt-1 text-sm text-neutral-500">One-time packs add credits to your current balance.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              { name: "STARTER", price: "$19", credits: 20, popular: false },
              { name: "CREATOR", price: "$49", credits: 60, popular: true },
              { name: "PRO", price: "$149", credits: 200, popular: false },
            ].map((pack, i) => (
              <div
                key={i}
                className={`flex min-h-[240px] flex-col justify-between rounded-2xl border p-5 transition-colors ${
                  pack.popular
                    ? "bg-white text-darktext border-berry ring-1 ring-berry/20"
                    : "bg-white text-darktext border-neutral-200/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm tracking-wider uppercase text-neutral-600">{pack.name}</span>
                    {pack.popular && (
                      <span className="px-2.5 py-1 rounded-md bg-[#f2edfb] text-[#5721b5] text-[10px] font-bold uppercase">Popular</span>
                    )}
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold">{pack.price}</span>
                    <span className={`text-xs ${pack.popular ? "text-neutral-300" : "text-neutral-500"}`}>one-time</span>
                  </div>

                  <div className="mt-3 inline-block rounded-lg bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-700">
                    {pack.credits} Credits Included
                  </div>
                </div>

                <button
                  onClick={() => handleBuyPack(pack.credits, pack.price)}
                  className={`mt-6 w-full py-3 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                    pack.popular
                      ? "bg-berry hover:bg-berry-hover text-white"
                      : "bg-neutral-900 hover:bg-black text-white"
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
        <div id="transactions" className="scroll-mt-24 space-y-4 rounded-2xl border border-neutral-200/80 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-darktext">
                <History className="h-4 w-4 text-berry" />
                <span>Credit activity</span>
              </h2>
              <p className="mt-1 text-sm text-neutral-500">Recent credits added and used in this workspace.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Activity</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {CREDIT_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-neutral-50">
                    <td className="py-3 px-2 text-neutral-500">{tx.date}</td>
                    <td className="py-3 px-2 font-medium text-darktext">{tx.description}</td>
                    <td className="py-3 px-2"><span className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${tx.type === "credit" ? "bg-emerald-50 text-emerald-700" : "bg-neutral-100 text-neutral-600"}`}>{tx.type === "credit" ? "Added" : "Used"}</span></td>
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
