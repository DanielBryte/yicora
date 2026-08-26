import Link from "next/link";
import { Video, Mic, Music, ArrowRight } from "lucide-react";

export function QuickActions() {
  const ACTIONS = [
    {
      title: "Create Video Dub",
      description: "Localize video into Yoruba, Igbo, Hausa, Swahili & Pidgin.",
      href: "/video",
      icon: Video,
      badge: "Video AI",
      bg: "from-burgundy to-burgundy-light",
    },
    {
      title: "Create Voice",
      description: "Generate lifelike speech with authentic African voice presets.",
      href: "/voice",
      icon: Mic,
      badge: "Voice AI",
      bg: "from-neutral-900 to-neutral-800",
    },
    {
      title: "Create Music",
      description: "Compose Afrobeats, Amapiano & highlife with YiCORA Music Box.",
      href: "/music",
      icon: Music,
      badge: "Music Box",
      bg: "from-berry to-burgundy-light",
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-500">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {ACTIONS.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`group relative p-6 rounded-3xl bg-gradient-to-br ${action.bg} text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col justify-between h-[200px]`}
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-pink-200 border border-white/10">
                  {action.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-pink-200 transition-colors flex items-center justify-between">
                  <span>{action.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
