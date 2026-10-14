import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, Presentation } from "lucide-react";
import { Logo } from "@/components/shared/logo";

const DECK_URL = "/yicora-pitch-deck.pdf";

export const metadata: Metadata = {
  title: "YiCORA Pitch Deck",
  description: "View the YiCORA pitch deck.",
};

export default function PitchDeckPage() {
  return (
    <main className="min-h-screen bg-[#f7f4fa] text-[#201c27]">
      <header className="border-b border-[#e8e7ed] bg-white">
        <div className="mx-auto flex min-h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
          <Logo />
          <Link href="/" className="text-sm font-semibold text-neutral-600 transition hover:text-[#5d3ab7]">Back to YiCORA</Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#7130dc] px-3 py-1.5 text-xs font-semibold text-white">
              <Presentation className="h-3.5 w-3.5" aria-hidden="true" /> Company overview
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">YiCORA Pitch Deck</h1>
            <p className="mt-2 text-sm text-neutral-500">Read the presentation below, or open and download the PDF.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href={DECK_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#e4daf5] bg-white px-4 text-sm font-semibold text-[#5d3ab7] transition hover:bg-[#f2edfb]">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> Open PDF
            </a>
            <a href={DECK_URL} download="yicora-pitch-deck.pdf" className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#7130dc] px-4 text-sm font-semibold text-white transition hover:bg-[#5721b5]">
              <ArrowDownToLine className="h-4 w-4" aria-hidden="true" /> Download
            </a>
          </div>
        </div>

        <section aria-label="Pitch deck PDF viewer" className="overflow-hidden rounded-2xl border border-[#e8e7ed] bg-white shadow-[0_12px_36px_rgba(32,28,39,0.08)]">
          <iframe
            src={`${DECK_URL}#view=FitH`}
            title="YiCORA Pitch Deck PDF"
            className="h-[calc(100vh-230px)] min-h-[560px] w-full bg-neutral-100 sm:h-[calc(100vh-220px)]"
          />
          <div className="border-t border-[#e8e7ed] px-4 py-3 text-center text-xs text-neutral-500">
            If the preview does not load in your browser, use Open PDF or Download above.
          </div>
        </section>
      </div>
    </main>
  );
}
