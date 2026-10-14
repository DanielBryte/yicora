"use client";

import { createDecartClient, models, type RealTimeClient } from "@decartai/sdk";
import { ArrowDownToLine, Camera, CircleHelp, Expand, ImagePlus, Mic, MicOff, Radio, RotateCcw, Shirt, Square, UserRound, Video, WandSparkles } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type StudioMode = "try-on" | "face";
type StudioStatus = "idle" | "connecting" | "connected" | "generating" | "reconnecting" | "disconnected";

const PROMPTS = {
  "try-on": [
    "Substitute the current top with the garment in the reference image, keeping its colors, cut, and details accurate.",
    "Replace the current outfit with a tailored charcoal suit and a clean white shirt.",
    "Substitute the current top with a relaxed-fit cream knit sweater.",
  ],
  face: [
    "Substitute the character in the video with the person in the reference image. Preserve the lighting and camera movement.",
    "Transform me into a polished editorial fashion portrait, keeping my facial expression natural.",
    "Give me a cinematic sci-fi character look with realistic skin and soft blue lighting.",
  ],
} satisfies Record<StudioMode, string[]>;

const STATUS_LABEL: Record<StudioStatus, string> = {
  idle: "Ready when you are", connecting: "Connecting…", connected: "Live", generating: "Generating", reconnecting: "Reconnecting…", disconnected: "Disconnected",
};

export function LiveStudio({ mode }: { mode: StudioMode }) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const outputVideoRef = useRef<HTMLVideoElement>(null);
  const realtimeRef = useRef<RealTimeClient | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const outputStreamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const recordedPartsRef = useRef<Blob[]>([]);
  const referenceUrlRef = useRef<string | null>(null);
  const [status, setStatus] = useState<StudioStatus>("idle");
  const [hasOutputStream, setHasOutputStream] = useState(false);
  const [prompt, setPrompt] = useState(PROMPTS[mode][0]);
  const [reference, setReference] = useState<File | null>(null);
  const [referenceUrl, setReferenceUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);
  const [micEnabled, setMicEnabled] = useState(true);
  const [audioPreview, setAudioPreview] = useState(false);
  const [busy, setBusy] = useState(false);

  const isTryOn = mode === "try-on";
  const title = isTryOn ? "Virtual Try-On" : "AI Face Changer";
  const subtitle = isTryOn
    ? "Preview outfits and accessories on your live camera. Add a garment photo for a closer match."
    : "Transform your live camera into a new character or look with a text prompt or reference photo.";

  const stopStudio = useCallback(() => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
    recorderRef.current = null;
    realtimeRef.current?.disconnect();
    realtimeRef.current = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    outputStreamRef.current = null;
    setHasOutputStream(false);
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (outputVideoRef.current) outputVideoRef.current.srcObject = null;
    setRecording(false);
    setStatus("idle");
  }, []);

  useEffect(() => () => {
    realtimeRef.current?.disconnect();
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    if (referenceUrlRef.current) URL.revokeObjectURL(referenceUrlRef.current);
  }, []);

  async function startStudio() {
    if (busy || status === "connected" || status === "generating") return;
    setBusy(true);
    setError(null);
    setExportUrl(null);
    setStatus("connecting");
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw new Error("Camera access needs a secure connection (HTTPS) and a supported browser.");
      const model = models.realtime(isTryOn ? "lucy-vton-latest" : "lucy-2.5");
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: micEnabled,
        video: { frameRate: model.fps, width: model.width, height: model.height },
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;

      const client = createDecartClient({
        apiKeyProvider: async () => {
          const response = await fetch("/api/decart/token", { method: "POST" });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || "Could not authorize the live session.");
          return result.apiKey as string;
        },
      });
      const connected = await client.realtime.connect(stream, {
        model,
        mirror: "auto",
        onRemoteStream: (remoteStream) => {
          outputStreamRef.current = remoteStream;
          setHasOutputStream(true);
          if (outputVideoRef.current) outputVideoRef.current.srcObject = remoteStream;
        },
      });
      realtimeRef.current = connected;
      connected.on("connectionChange", (nextStatus) => setStatus(nextStatus as StudioStatus));
      connected.on("error", (sdkError) => setError(sdkError.message || "The live session encountered an error."));
      await connected.set({
        prompt,
        ...(reference ? { image: reference } : {}),
        enhance: !isTryOn,
      });
      setStatus("connected");
    } catch (cause) {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      realtimeRef.current?.disconnect();
      realtimeRef.current = null;
      setStatus("idle");
      setError(cause instanceof Error ? cause.message : "Could not start the live studio.");
    } finally {
      setBusy(false);
    }
  }

  async function applyPrompt(nextPrompt = prompt, nextReference = reference) {
    if (!nextPrompt.trim()) {
      setError("Add a short description first.");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      if (realtimeRef.current) {
        await realtimeRef.current.set({ prompt: nextPrompt.trim(), ...(nextReference ? { image: nextReference } : {}), enhance: !isTryOn });
      }
      setPrompt(nextPrompt);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not apply that change.");
    } finally {
      setBusy(false);
    }
  }

  function selectReference(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setError("Choose an image smaller than 12 MB.");
      return;
    }
    if (referenceUrlRef.current) URL.revokeObjectURL(referenceUrlRef.current);
    const url = URL.createObjectURL(file);
    referenceUrlRef.current = url;
    setReference(file);
    setReferenceUrl(url);
    setError(null);
    if (realtimeRef.current) void applyPrompt(prompt, file);
  }

  function toggleRecording() {
    if (recording) {
      recorderRef.current?.stop();
      setRecording(false);
      return;
    }
    const stream = outputStreamRef.current;
    if (!stream || stream.getVideoTracks().length === 0) {
      setError("Wait for the processed video to appear before recording.");
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setError("This browser does not support recording. Try Chrome or Edge.");
      return;
    }
    const mimeType = ["video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"].find((type) => MediaRecorder.isTypeSupported(type));
    if (!mimeType) {
      setError("This browser cannot export a WebM recording. Try Chrome or Edge.");
      return;
    }
    recordedPartsRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType });
    recorder.ondataavailable = (event) => { if (event.data.size) recordedPartsRef.current.push(event.data); };
    recorder.onstop = () => {
      const blob = new Blob(recordedPartsRef.current, { type: mimeType });
      const url = URL.createObjectURL(blob);
      setExportUrl((previous) => { if (previous) URL.revokeObjectURL(previous); return url; });
    };
    recorder.start(1000);
    recorderRef.current = recorder;
    setRecording(true);
  }

  function downloadRecording() {
    if (!exportUrl) return;
    const link = document.createElement("a");
    link.href = exportUrl;
    link.download = `yicora-${isTryOn ? "virtual-try-on" : "face-changer"}-${new Date().toISOString().slice(0, 10)}.webm`;
    link.click();
  }

  const live = status === "connected" || status === "generating" || status === "reconnecting";
  const StatusIcon = isTryOn ? Shirt : UserRound;

  return (
    <div className="mx-auto max-w-[1240px] space-y-6 pb-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#7130dc] px-3 py-1.5 text-xs font-semibold text-white"><WandSparkles className="h-3.5 w-3.5" /> Realtime creative studio</div>
          <h1 className="text-3xl font-bold tracking-tight text-[#201c27] sm:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-[#e8e7ed] bg-white px-3 py-2 text-xs font-semibold text-neutral-600 sm:self-auto">
          <span className={`h-2 w-2 rounded-full ${live ? "animate-pulse bg-emerald-500" : "bg-neutral-300"}`} />{STATUS_LABEL[status]}
        </div>
      </header>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-3xl border border-[#e8e7ed] bg-white shadow-sm">
          <div className="grid gap-px bg-[#ece8f1] lg:grid-cols-2">
            <div className="relative aspect-video overflow-hidden bg-[#201c27]">
              <video ref={localVideoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
              {!live && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,#45345e_0%,#201c27_70%)] px-6 text-center text-white"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#d9c8ff]"><Camera className="h-7 w-7" /></span><div><p className="font-semibold">Camera preview</p><p className="mt-1 text-xs text-white/60">Start the studio to enable your camera</p></div></div>}
              <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">You</span>
              <button type="button" onClick={() => {
                const track = localStreamRef.current?.getAudioTracks()[0];
                if (!track) { setMicEnabled((value) => !value); return; }
                track.enabled = !track.enabled;
                setMicEnabled(track.enabled);
              }} className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white" aria-label={micEnabled ? "Mute microphone" : "Unmute microphone"}>{micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}</button>
            </div>
            <div className="relative aspect-video overflow-hidden bg-[#201c27]">
              <video ref={outputVideoRef} autoPlay muted={!audioPreview} playsInline className="h-full w-full object-cover" />
              {!hasOutputStream && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[radial-gradient(ellipse_at_center,#45345e_0%,#201c27_70%)] px-6 text-center text-white"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2edfb]/15 text-[#d9c8ff]"><StatusIcon className="h-7 w-7" /></span><div><p className="font-semibold">Processed output</p><p className="mt-1 text-xs text-white/60">Your live transformation appears here</p></div></div>}
              <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">Yicora output</span>
              {live && <button type="button" onClick={() => void outputVideoRef.current?.requestFullscreen?.()} className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white" aria-label="Show processed output full screen"><Expand className="h-4 w-4" /></button>}
              {live && <button type="button" onClick={() => setAudioPreview((value) => !value)} className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white" aria-label={audioPreview ? "Mute output preview" : "Play output audio"}><Radio className="h-4 w-4" /></button>}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
            <p className="flex items-center gap-2 text-xs text-neutral-500"><CircleHelp className="h-4 w-4 text-[#7a55bd]" />Allow camera and microphone access when your browser asks.</p>
            <div className="flex flex-wrap gap-2">
              {live ? <button type="button" onClick={stopStudio} className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-200 px-4 text-sm font-semibold text-red-700 hover:bg-red-50"><Square className="h-4 w-4" />End session</button> : <button type="button" onClick={startStudio} disabled={busy} className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#f2edfb] px-5 text-sm font-bold text-[#5d3ab7] hover:bg-[#e9defb] disabled:opacity-60"><Video className="h-4 w-4" />{busy ? "Starting…" : "Start live studio"}</button>}
              {live && <button type="button" onClick={toggleRecording} className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold ${recording ? "bg-red-50 text-red-700" : "border border-[#e8e7ed] text-[#393542] hover:bg-[#f7f6f9]"}`}>{recording ? <><Square className="h-4 w-4 fill-current" />Stop recording</> : <><span className="h-2 w-2 rounded-full bg-red-500" />Record output</>}</button>}
              {exportUrl && <button type="button" onClick={downloadRecording} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e8e7ed] px-4 text-sm font-semibold text-[#5d3ab7] hover:bg-[#f7f3ff]"><ArrowDownToLine className="h-4 w-4" />Export WebM</button>}
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-3xl border border-[#e8e7ed] bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#201c27]">Your look</h2>
            <p className="mt-1 text-xs leading-5 text-neutral-500">{isTryOn ? "Upload a clear garment photo on a plain background for a more accurate try-on." : "Add a reference photo to guide the character transformation. JPG, PNG, or WebP."}</p>
            <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#cfc4df] bg-[#fbf9fe] p-3 hover:border-[#a68acf]">
              {referenceUrl ? <Image src={referenceUrl} alt="Selected reference" width={56} height={56} unoptimized className="h-14 w-14 rounded-xl object-cover" /> : <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f2edfb] text-[#5d3ab7]"><ImagePlus className="h-5 w-5" /></span>}
              <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-[#393542]">{reference?.name ?? "Choose a reference image"}</span><span className="mt-1 block text-[11px] text-neutral-500">Optional · up to 12 MB</span></span>
              <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => selectReference(event.target.files?.[0])} />
            </label>
          </section>

          <section className="rounded-3xl border border-[#e8e7ed] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between"><h2 className="text-sm font-bold text-[#201c27]">Describe the change</h2><button type="button" aria-label="Reset prompt" onClick={() => { setPrompt(PROMPTS[mode][0]); void applyPrompt(PROMPTS[mode][0]); }} className="rounded-lg p-1.5 text-neutral-400 hover:bg-[#f2edfb] hover:text-[#5d3ab7]"><RotateCcw className="h-3.5 w-3.5" /></button></div>
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={4} maxLength={400} placeholder="Describe the outfit, character, or style…" className="mt-3 w-full resize-y rounded-xl border border-[#e8e7ed] bg-white p-3 text-sm leading-5 text-[#201c27] outline-none focus:border-[#a98ad6] focus:ring-2 focus:ring-[#f2edfb]" />
            <div className="mt-2 grid gap-1.5">{PROMPTS[mode].map((suggestion, index) => <button key={suggestion} type="button" onClick={() => { setPrompt(suggestion); void applyPrompt(suggestion); }} className="rounded-lg bg-[#f8f5fc] px-2.5 py-2 text-left text-[11px] leading-4 text-[#5d3ab7] hover:bg-[#f2edfb]">{index === 0 ? "Recommended · " : ""}{suggestion}</button>)}</div>
            {live && <button type="button" disabled={busy || !prompt.trim()} onClick={() => void applyPrompt()} className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#f2edfb] text-sm font-bold text-[#5d3ab7] hover:bg-[#e9defb] disabled:opacity-60"><WandSparkles className="h-4 w-4" />{busy ? "Applying…" : "Apply to live output"}</button>}
          </section>
        </aside>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-[#e8e7ed] bg-white p-5"><h2 className="text-sm font-bold text-[#201c27]">Record and export</h2><p className="mt-2 text-xs leading-5 text-neutral-500">Record the processed video and audio in your browser, then export a WebM file. Keep the tab open while recording; recordings stay on this device.</p></div>
        <div className="rounded-3xl border border-[#e8e7ed] bg-white p-5"><h2 className="text-sm font-bold text-[#201c27]">Use it in a livestream or video call</h2><p className="mt-2 text-xs leading-5 text-neutral-500">Open OBS and add a Window Capture source for this Yicora tab, then start OBS Virtual Camera. Select OBS Virtual Camera in your livestream or call app. Keep Yicora open and the live session running.</p></div>
      </section>

      {error && <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>}
      <div className="flex items-center gap-2 text-[11px] leading-5 text-neutral-400"><Mic className="h-3.5 w-3.5 shrink-0" />Your camera and reference image are used to provide live processing. End the session to turn off the camera.</div>
    </div>
  );
}
