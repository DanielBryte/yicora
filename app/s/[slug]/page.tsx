"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Music, Sparkles } from "lucide-react";

type SharedSong = { title: string; audioUrl: string; inspiredBy?: string | null };

export default function SharedSongPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [song, setSong] = useState<SharedSong | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let active = true;
    fetch(`/api/music/shares/${slug}`, { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "This shared song is unavailable.");
        if (active) setSong(result);
      })
      .catch((cause) => { if (active) setError(cause instanceof Error ? cause.message : "This shared song is unavailable."); });
    return () => { active = false; };
  }, [slug]);

  const nextPath = `/music?inspiredBy=${encodeURIComponent(slug)}`;
  const authQuery = new URLSearchParams({ next: nextPath }).toString();
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 p-5">
      <section className="w-full max-w-xl rounded-3xl border border-neutral-200 bg-white p-7 text-center shadow-sm sm:p-10">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-berry text-white"><Music className="h-6 w-6" /></div>
        <p className="text-xs font-semibold uppercase tracking-wider text-berry">A YiCORA Music Box creation</p>
        <h1 className="mt-2 text-2xl font-bold text-darktext">{song?.title || (error ? "Song unavailable" : "Loading shared song…")}</h1>
        {song?.inspiredBy && <p className="mt-1 text-xs text-neutral-500">Remixed from {song.inspiredBy}</p>}
        {error && <p role="alert" className="mt-4 text-sm text-neutral-600">{error}</p>}
        {song && <audio controls src={song.audioUrl} className="mt-7 w-full" />}
        {song && <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href={`/signup?${authQuery}`} className="inline-flex items-center justify-center gap-2 rounded-full bg-berry px-5 py-3 text-sm font-semibold text-white"><Sparkles className="h-4 w-4" />Create your version</Link>
          <Link href={`/login?${authQuery}`} className="inline-flex items-center justify-center rounded-full border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700">I have an account</Link>
        </div>}
        <p className="mt-7 text-xs text-neutral-400">Songs are public only when their creator turns sharing on.</p>
      </section>
    </main>
  );
}
