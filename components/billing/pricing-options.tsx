"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, LoaderCircle, Sparkles, X } from "lucide-react";
import { BILLING_CATALOG, type Currency, type ProductKey } from "@/lib/billing/catalog";

const plans = [
  { id: "free" as const, name: "Free", description: "Try Yicora with audio creation tools.", bullets: ["50 credits included once", "Music creation", "Voice creation and narration", "Credit top-ups when your starter balance runs out"], locked: ["Video dubbing and localization", "Virtual try-on and face changer", "Live studio recording and export"], credits: "50 starter credits" },
  { id: "subscription" as const, name: "Yicora Pro", description: "Create and localize across every studio.", bullets: ["Audio creation and localization tools", "Video dubbing and translation", "Virtual try-on and face changer", "Screen recording and export in live studios", "300 credits monthly or 3,600 yearly", "Top up credits whenever you need"], credits: "" },
  { id: "lifetime" as const, name: "Lifetime", description: "One payment for lasting access.", bullets: ["Audio creation and localization tools", "Video dubbing and translation", "Virtual try-on and face changer", "Screen recording and export in live studios", "5,000 credits included once", "Top up credits whenever you need"], credits: "5,000 starter credits" },
];

function money(amount: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", {
    style: "currency", currency, maximumFractionDigits: 0,
  }).format(amount);
}

export function PricingOptions({ showTopups = false }: { showTopups?: boolean }) {
  const router = useRouter();
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [busy, setBusy] = useState<ProductKey | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/billing/region").then((res) => res.ok ? res.json() : null)
      .then((data) => { if (data?.currency === "NGN" || data?.currency === "USD") setCurrency(data.currency); })
      .catch(() => undefined);
  }, []);

  async function checkout(product: ProductKey) {
    setBusy(product); setError("");
    try {
      const response = await fetch("/api/billing/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, currency }),
      });
      const result = await response.json();
      if (response.status === 401) { router.push("/login?redirect=/billing"); return; }
      if (!response.ok) throw new Error(result.error || "Could not start checkout.");
      window.location.assign(result.checkoutUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      setBusy(null);
    }
  }

  const subscription = billing === "monthly" ? "monthly" : "yearly";
  const subPrice = BILLING_CATALOG[subscription];
  const subPriceLabel = currency === "NGN"
    ? billing === "monthly" ? `${money(subPrice.ngn, currency)}/month` : `${money(Math.round(subPrice.ngn / 12), currency)}/month`
    : billing === "monthly" ? "$20/month" : "$13/month";

  return <div className="space-y-8">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7652c7]">Plans and credits</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#211638] sm:text-3xl">Create freely. Upgrade when you need more.</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">Audio tools are available on the free plan. Video and live studios require paid access and use credits from the same wallet. Free accounts start with 50 credits.</p>
      </div>
      <div className="flex w-fit items-center gap-1 rounded-full border border-[#e6def2] bg-white p-1" aria-label="Display currency">
        {(["USD", "NGN"] as const).map((option) => <button key={option} onClick={() => setCurrency(option)} aria-pressed={currency === option} className={`rounded-full px-3.5 py-2 text-xs font-semibold transition ${currency === option ? "bg-[#7130dc] text-white" : "text-neutral-600 hover:bg-[#f5f0fc]"}`}>{option === "NGN" ? "₦ NGN" : "$ USD"}</button>)}
      </div>
    </div>

    <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-[#e6def2] bg-[#f8f5fc] p-1">
      <button onClick={() => setBilling("monthly")} aria-pressed={billing === "monthly"} className={`rounded-full px-4 py-2 text-sm font-semibold ${billing === "monthly" ? "bg-white text-[#6131b7] shadow-sm" : "text-neutral-600"}`}>Monthly</button>
      <button onClick={() => setBilling("yearly")} aria-pressed={billing === "yearly"} className={`rounded-full px-4 py-2 text-sm font-semibold ${billing === "yearly" ? "bg-white text-[#6131b7] shadow-sm" : "text-neutral-600"}`}>Yearly <span className="ml-1 text-xs text-[#7652c7]">Save 35%</span></button>
    </div>

    <div className="grid gap-5 lg:grid-cols-3">
      {plans.map((plan) => {
        const product = plan.id === "subscription" ? subscription : plan.id === "lifetime" ? "lifetime" : null;
        const details = product ? BILLING_CATALOG[product] : null;
        const amountLabel = plan.id === "subscription" ? subPriceLabel : plan.id === "lifetime" ? money(details![currency === "NGN" ? "ngn" : "usd"], currency) : "Free";
        return <article key={plan.id} className={`flex flex-col rounded-[1.5rem] border p-6 ${plan.id === "subscription" ? "border-[#cbb3ff] bg-[#f8f4ff] shadow-sm" : "border-neutral-200 bg-white"}`}>
          <div className="flex items-center justify-between gap-3"><h3 className="font-bold text-[#211638]">{plan.name}</h3>{plan.id === "subscription" && <span className="rounded-full bg-[#7130dc] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Most popular</span>}</div>
          <p className="mt-1 min-h-10 text-sm text-neutral-600">{plan.description}</p>
          <div className="mt-5 text-3xl font-extrabold tracking-tight text-[#211638]">{amountLabel}</div>
          {plan.id === "subscription" && <p className="mt-1 text-xs text-neutral-500">{billing === "monthly" ? "One month of access. Renew when you’re ready." : currency === "USD" ? "$156 billed yearly for 12 months of access." : `${money(subPrice.ngn, currency)} billed yearly for 12 months of access.`}</p>}
          {plan.id === "lifetime" && <p className="mt-1 text-xs text-neutral-500">One-time payment</p>}
          {(plan.id === "lifetime" || plan.id === "subscription") && <p className="mt-3 inline-flex w-fit rounded-lg bg-[#eee7f9] px-3 py-1.5 text-xs font-semibold text-[#5d3ab7]">{plan.id === "subscription" ? `${billing === "monthly" ? "300 credits included for the month" : "3,600 credits included for the year"}` : plan.credits}</p>}
          <ul className="my-6 flex-1 space-y-3 text-sm text-neutral-700">{plan.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7130dc]" />{bullet}</li>)}{"locked" in plan && plan.locked?.map((feature) => <li key={feature} className="flex gap-2 text-neutral-500"><X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />{feature}</li>)}</ul>
          {product ? <button disabled={busy !== null} onClick={() => checkout(product)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#7130dc] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5f26bd] disabled:opacity-60">{busy === product ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{plan.id === "lifetime" ? "Get lifetime access" : `Choose ${billing}`}</button> : <a href="/signup" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#7130dc] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5f26bd]">Try it out</a>}
        </article>;
      })}
    </div>
    {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

    {showTopups && <section className="space-y-4 border-t border-neutral-200 pt-7">
      <div><h3 className="text-lg font-bold text-[#211638]">Top up credits as you go</h3><p className="mt-1 text-sm text-neutral-600">Use your included credits first. Add a pack whenever you need more.</p></div>
      <div className="grid gap-4 sm:grid-cols-3">{(["credit_100", "credit_300", "credit_900"] as ProductKey[]).map((key) => { const pack = BILLING_CATALOG[key]; return <article key={key} className="rounded-2xl border border-neutral-200 bg-white p-5"><p className="text-sm font-semibold text-neutral-600">{pack.credits} credits</p><p className="mt-2 text-2xl font-bold text-[#211638]">{money(pack[currency === "NGN" ? "ngn" : "usd"], currency)}</p><button disabled={busy !== null} onClick={() => checkout(key)} className="mt-4 min-h-10 w-full rounded-full bg-[#7130dc] text-sm font-semibold text-white hover:bg-[#5f26bd] disabled:opacity-60">{busy === key ? "Opening checkout…" : "Buy credits"}</button></article>;})}</div>
    </section>}
    <p className="text-xs leading-5 text-neutral-500">Audio generations use credits (music: 10, voice: 2). Video dubbing uses 5 credits per minute; each 5-minute live studio session uses 25 credits. Included credits are added after payment is confirmed. Monthly and yearly access are prepaid periods; renew by purchasing again. Credit packs are one-time purchases.</p>
  </div>;
}
