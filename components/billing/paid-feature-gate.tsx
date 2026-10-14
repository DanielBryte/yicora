"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, LockKeyhole, LoaderCircle, Play } from "lucide-react";

export function PaidFeatureGate({ children }: { children: React.ReactNode }) {
  const [access, setAccess] = useState<boolean | null>(null);
  useEffect(() => {
    fetch("/api/billing/summary", { cache: "no-store" }).then(async (response) => {
      if (!response.ok) { setAccess(false); return; }
      const { profile } = await response.json();
      setAccess(Boolean(profile?.lifetime_access || (profile?.plan_access_until && new Date(profile.plan_access_until).getTime() > Date.now())));
    }).catch(() => setAccess(false));
  }, []);
  if (access === null) return <div className="flex min-h-64 items-center justify-center"><LoaderCircle className="h-6 w-6 animate-spin text-[#7130dc]" /></div>;
  if (access) return children;
  return <section className="mx-auto w-full max-w-5xl space-y-6 px-5 py-8 sm:py-10">
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 px-5 py-4 sm:px-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2edfb] text-[#6131b7]"><Play className="ml-0.5 h-4 w-4" fill="currentColor" /></span>
        <div>
          <h2 className="text-sm font-bold text-[#211638]">Sample video preview</h2>
          <p className="text-xs text-neutral-500">Temporary sample footage</p>
        </div>
      </div>
      <video
        className="aspect-video w-full bg-[#18151e] object-contain"
        controls
        playsInline
        preload="metadata"
        aria-label="Sample video preview"
      >
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
        Your browser does not support embedded video.
      </video>
      <p className="px-5 py-3 text-xs text-neutral-500 sm:px-6">This is sample footage for preview. Your own transformation is created when you try the studio.</p>
    </div>

    <div className="flex flex-col items-center rounded-3xl border border-[#e8e1f2] bg-white px-6 py-8 text-center shadow-sm sm:px-10">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2edfb] text-[#6131b7]"><LockKeyhole className="h-6 w-6" /></span>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-[#211638]">Unlock this studio with Yicora Pro</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">Video and live studios are available with an active plan. Your included credits and any top-ups work across your creative tools.</p>
      <Link href="/billing" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#7130dc] px-6 text-sm font-semibold text-white hover:bg-[#5f26bd]">Upgrade to try it out <ArrowRight className="h-4 w-4" /></Link>
    </div>
  </section>;
}
