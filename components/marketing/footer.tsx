import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function MarketingFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/[0.08] bg-[#111014] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[#111014]" />
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-x-12">
          <div className="col-span-2 max-w-sm space-y-5 sm:col-span-3 lg:col-span-1">
            <Logo variant="light" height={36} />
            <p className="max-w-xs text-sm leading-7 text-white/65">
              Voice and video tools for stories that deserve to be heard in every language.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#c89aff]">Products</h2>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="/music" className="inline-flex items-center gap-2 font-medium text-white transition-colors hover:text-violet-200">
                  AI Music Box
                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">Live</span>
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-2">
                  AI Face Changer
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">Coming soon</span>
                </span>
              </li>
              <li>
                <span className="inline-flex items-center gap-2">
                  AI UGC Studio
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">Coming soon</span>
                </span>
              </li>
              <li>
                <span className="inline-flex items-center gap-2">
                  Video dubbing
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">Coming soon</span>
                </span>
              </li>
              <li>
                <span className="inline-flex items-center gap-2">
                  Text to speech
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">Coming soon</span>
                </span>
              </li>
              <li>
                <span className="inline-flex items-center gap-2">
                  AI voice-over
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">Coming soon</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#c89aff]">Explore</h2>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/use-cases" className="transition-colors hover:text-white">Use cases</Link></li>
              <li><Link href="/#preview" className="transition-colors hover:text-white">Try the studio</Link></li>
              <li><Link href="/pricing" className="transition-colors hover:text-white">Pricing</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-tight text-[#c89aff]">Get started</h2>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/signup" className="transition-colors hover:text-white">Create an account</Link></li>
              <li><Link href="/login" className="transition-colors hover:text-white">Log in</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} YiCORA. All rights reserved.</p>
          <p>Made for voices, stories, and sounds from everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
