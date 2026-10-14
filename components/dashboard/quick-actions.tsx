import Link from "next/link";
import { ArrowRight, Clapperboard, Coins, FolderKanban, Mic, Music, Shirt, Sparkles, UserRound } from "lucide-react";

export function QuickActions() {
  const ACTIONS = [
    { title: "Virtual Try-On", description: "Preview outfits and accessories on live camera.", href: "/dashboard/virtual-try-on", icon: Shirt, iconColor: "bg-fuchsia-100 text-fuchsia-700", available: true },
    { title: "AI Face Changer", description: "Transform your live look with a prompt or reference photo.", href: "/dashboard/face-changer", icon: UserRound, iconColor: "bg-cyan-100 text-cyan-700", available: true },
    { title: "Music Box", description: "Build a track from your idea, then shape the sound until it feels like yours.", href: "/music", icon: Music, iconColor: "bg-amber-100 text-amber-700", available: true },
    { title: "Video Dubbing", description: "Bring your videos to more audiences.", href: "/video", icon: Clapperboard, iconColor: "bg-rose-100 text-rose-700", available: false },
    { title: "Voice Studio", description: "Create expressive narration from a script.", href: "/voice", icon: Mic, iconColor: "bg-sky-100 text-sky-700", available: false },
    { title: "AI UGC Studio", description: "Create creator-style brand videos.", href: "#ugc-studio", icon: Sparkles, iconColor: "bg-violet-100 text-violet-700", available: false },
    { title: "Projects", description: "Browse your saved creations.", href: "/projects", icon: FolderKanban, iconColor: "bg-emerald-100 text-emerald-700", available: true },
    { title: "Billing & Credits", description: "Manage your plan and credits.", href: "/billing", icon: Coins, iconColor: "bg-lime-100 text-lime-700", available: true },
    { title: "Settings", description: "Manage your profile and preferences.", href: "/settings", icon: Sparkles, iconColor: "bg-indigo-100 text-indigo-700", available: true },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Your creative tools</h2>
        <span className="rounded-full border border-[#e4daf5] bg-[#f2edfb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#5d3ab7]">Creative studios available</span>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          const content = (
            <>
              <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${action.iconColor}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>

              <div>
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="min-w-0 text-sm font-semibold leading-snug text-darktext">{action.title}</h3>
                  {action.available && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-[#d95ca8]" />}
                </div>
                {!action.available && <span className="mb-1 inline-flex w-fit rounded-full bg-neutral-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-neutral-500">Coming soon</span>}
                <p className="line-clamp-2 text-[11px] leading-relaxed text-neutral-500">{action.description}</p>
              </div>
            </>
          );

          return action.available ? (
            <Link
              key={action.href}
              href={action.href}
              className="group flex min-h-[132px] flex-col justify-between rounded-[24px] border border-neutral-200 bg-white p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d9c0ff]"
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
