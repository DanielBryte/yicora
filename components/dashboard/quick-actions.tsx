import Link from "next/link";
import { ArrowRight, Clapperboard, Coins, FolderKanban, Mic, Music, Sparkles } from "lucide-react";

export function QuickActions() {
  const ACTIONS = [
    { title: "Music Box", description: "Build a track from your idea, then shape the sound until it feels like yours.", href: "/music", icon: Music, available: true },
    { title: "Video Dubbing", description: "Bring your videos to more audiences.", href: "/video", icon: Clapperboard, available: false },
    { title: "Voice Studio", description: "Create expressive narration from a script.", href: "/voice", icon: Mic, available: false },
    { title: "AI Face Changer", description: "Transform faces in your creative content.", href: "#face-changer", icon: Sparkles, available: false },
    { title: "AI UGC Studio", description: "Create creator-style brand videos.", href: "#ugc-studio", icon: Sparkles, available: false },
    { title: "Projects", description: "Browse your saved creations.", href: "/projects", icon: FolderKanban, available: true },
    { title: "Billing & Credits", description: "Manage your plan and credits.", href: "/billing", icon: Coins, available: true },
    { title: "Settings", description: "Manage your profile and preferences.", href: "/settings", icon: Sparkles, available: true },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Your creative tools</h2>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-800">Music Box is live</span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          const content = (
            <>
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${action.available ? "bg-[#f1ebff] text-[#5d3ab7]" : "bg-neutral-100 text-neutral-400"}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="min-w-0 truncate text-sm font-semibold text-darktext">{action.title}</h3>
                  {action.available ? <ArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-[#d95ca8]" /> : <span className="shrink-0 whitespace-nowrap rounded-full bg-neutral-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-neutral-500">Coming soon</span>}
                </div>
                <p className="line-clamp-2 text-[11px] leading-relaxed text-neutral-500">{action.description}</p>
              </div>
            </>
          );

          return action.available ? (
            <Link
              key={action.href}
              href={action.href}
              className={`group flex min-h-[132px] flex-col justify-between rounded-[24px] border bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d9c0ff] ${action.title === "Music Box" ? "col-span-2 min-h-[172px] border-[#d9c0ff] bg-[radial-gradient(ellipse_at_top_right,_rgba(217,194,255,0.35),_transparent_55%),white] p-5 shadow-[0_12px_28px_rgba(124,75,214,0.09)] lg:col-span-2" : "border-neutral-200"}`}
            >
              {content}
            </Link>
          ) : (
            <div key={action.href} aria-disabled="true" className="flex min-h-[132px] cursor-not-allowed flex-col justify-between rounded-[24px] border border-neutral-200/80 bg-white/65 p-4 opacity-75">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
