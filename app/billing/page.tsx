"use client";

import DashboardLayout from "@/app/dashboard/layout";
import { PricingOptions } from "@/components/billing/pricing-options";
import { Coins, History, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

type Summary = {
  profile: { credits: number; plan: string; plan_access_until: string | null; lifetime_access: boolean } | null;
  transactions: { id: string; amount: number; type: string; description: string; created_at: string }[];
};

export default function BillingPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [activePaid, setActivePaid] = useState(false);
  useEffect(() => {
    fetch("/api/billing/summary", { cache: "no-store" }).then(async (response) => {
      if (response.ok) {
        const body: Summary = await response.json();
        setSummary(body);
        setActivePaid(Boolean(body.profile?.lifetime_access || (body.profile?.plan_access_until && new Date(body.profile.plan_access_until).getTime() > Date.now())));
      }
    }).finally(() => setLoading(false));
  }, []);

  const credits = summary?.profile?.credits ?? 0;
  const paidUntil = summary?.profile?.plan_access_until ? new Date(summary.profile.plan_access_until) : null;

  return <DashboardLayout>
    <main className="w-full space-y-8 py-8">
      <header><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7652c7]">Workspace · Billing</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-[#211638]">Billing &amp; credits</h1><p className="mt-2 text-sm text-neutral-600">Your audio, video and live tools share one credit balance.</p></header>
      <section className="flex flex-col gap-5 rounded-2xl border border-[#e7e1ef] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f2edfb]"><Coins className="h-6 w-6 text-[#6131b7]" /></div><div><p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Available credits</p><p className="mt-1 text-3xl font-bold tracking-tight text-[#211638]">{loading ? <LoaderCircle className="inline h-6 w-6 animate-spin" /> : credits.toLocaleString()}</p><p className="mt-1 text-xs text-neutral-500">{summary?.profile?.lifetime_access ? "Lifetime access" : activePaid && paidUntil ? `Pro access through ${paidUntil.toLocaleDateString()}` : "Free audio access"}</p></div></div>
        <a href="#transactions" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-neutral-200 px-4 text-sm font-medium text-neutral-700 hover:bg-neutral-50"><History className="h-4 w-4" /> Activity</a>
      </section>
      <section className="rounded-[1.5rem] border border-neutral-200 bg-white p-5 sm:p-8"><PricingOptions showTopups /></section>
      <section id="transactions" className="scroll-mt-24 rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-[#211638]">Recent credit activity</h2><p className="mt-1 text-sm text-neutral-500">Credits appear here when they are added, used or refunded.</p>
        {loading ? <div className="py-8 text-center text-sm text-neutral-500">Loading activity…</div> : summary?.transactions.length ? <div className="mt-5 divide-y divide-neutral-100">{summary.transactions.map((tx) => <div key={tx.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-medium text-neutral-800">{tx.description}</p><p className="text-xs text-neutral-500">{new Date(tx.created_at).toLocaleString()}</p></div><span className={`text-sm font-bold ${tx.amount >= 0 ? "text-emerald-700" : "text-neutral-700"}`}>{tx.amount > 0 ? "+" : ""}{tx.amount} credits</span></div>)}</div> : <div className="py-8 text-center text-sm text-neutral-500">No activity yet. Your signup credits will show here.</div>}
      </section>
    </main>
  </DashboardLayout>;
}
