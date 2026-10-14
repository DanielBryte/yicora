"use client";

import { useEffect, useState } from "react";
import { BadgeDollarSign, LoaderCircle } from "lucide-react";

type Report = {
  totals: Record<"USD" | "NGN", { sales: number; commission: number; orders: number }>;
  recent: { id: string; product_key: string; currency: "USD" | "NGN"; amount: number; estimated_commission: number; credits: number; paid_at: string }[];
};

const format = (amount: number, currency: "USD" | "NGN") => new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-US", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);

export function RevenueOverview() {
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/revenue", { cache: "no-store" }).then(async (response) => {
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Could not load revenue.");
      setReport(body);
    }).catch((reason) => setError(reason instanceof Error ? reason.message : "Could not load revenue."));
  }, []);
  if (error) return <p role="alert" className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">{error}</p>;
  if (!report) return <div className="flex items-center gap-2 py-10 text-sm text-neutral-500"><LoaderCircle className="h-4 w-4 animate-spin" />Loading sales…</div>;
  return <section className="space-y-5">
    <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f2edfb] text-[#6131b7]"><BadgeDollarSign className="h-5 w-5" /></span><div><h2 className="text-xl font-bold text-[#211638]">Credit sales</h2><p className="text-sm text-neutral-500">20% estimated platform commission on paid orders, before payment fees and provider costs.</p></div></div>
    <div className="grid gap-4 sm:grid-cols-2">{(["USD", "NGN"] as const).map((currency) => { const totals = report.totals[currency]; return <article key={currency} className="rounded-2xl border border-neutral-200 bg-white p-5"><p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{currency} totals · {totals.orders} paid orders</p><p className="mt-3 text-sm text-neutral-600">Gross sales <strong className="float-right text-[#211638]">{format(totals.sales, currency)}</strong></p><p className="mt-2 text-sm text-neutral-600">Estimated commission <strong className="float-right text-[#6131b7]">{format(totals.commission, currency)}</strong></p></article>;})}</div>
    <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500"><tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">Paid</th><th className="px-4 py-3">Credits</th><th className="px-4 py-3">Commission estimate</th><th className="px-4 py-3">Date</th></tr></thead><tbody className="divide-y divide-neutral-100">{report.recent.slice(0, 20).map((order) => <tr key={order.id}><td className="px-4 py-3 font-medium text-[#211638]">{order.product_key.replaceAll("_", " ")}</td><td className="px-4 py-3">{format(Number(order.amount), order.currency)}</td><td className="px-4 py-3">{order.credits.toLocaleString()}</td><td className="px-4 py-3 font-semibold text-[#6131b7]">{format(Number(order.estimated_commission), order.currency)}</td><td className="px-4 py-3 text-neutral-500">{order.paid_at ? new Date(order.paid_at).toLocaleDateString() : "-"}</td></tr>)}</tbody></table>{report.recent.length === 0 && <p className="p-6 text-center text-sm text-neutral-500">No completed purchases yet.</p>}</div>
  </section>;
}
