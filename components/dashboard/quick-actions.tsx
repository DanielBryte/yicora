import Link from "next/link";
import { ArrowRight, Clapperboard, Coins, FolderKanban, Mic, Music, Sparkles } from "lucide-react";

export function QuickActions() {
  const ACTIONS = [
    { title: "Video Dubbing", description: "Translate and dub videos across African languages.", href: "/video", icon: Clapperboard },
    { title: "Voice Studio", description: "Turn scripts into expressive, local-ready narration.", href: "/voice", icon: Mic },
    { title: "Music Box", description: "Compose branded songs and radio-ready tracks.", href: "/music", icon: Music },
    { title: "Billing & Credits", description: "Manage your balance and credit packs.", href: "/billing", icon: Coins },
    { title: "Projects", description: "Track every generation and export in one place.", href: "/projects", icon: FolderKanban },
    { title: "Settings", description: "Manage your profile and account preferences.", href: "/settings", icon: Sparkles },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-500">Quick access</h2>
        <div className="hidden items-center gap-2 text-xs font-medium text-neutral-500 sm:flex">
          <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1">Popular</span>
          <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1">Recent</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.href}
              href={action.href}
              className="group flex min-h-[132px] flex-col justify-between rounded-[24px] border border-neutral-200 bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d9c0ff]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1ebff] text-[#5d3ab7]">
                <Icon className="h-4 w-4" />
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-darktext">{action.title}</h3>
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-[#d95ca8]" />
                </div>
                <p className="line-clamp-2 text-[11px] leading-relaxed text-neutral-500">{action.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
