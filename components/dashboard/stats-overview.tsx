import { FolderKanban, Clock, Coins } from "lucide-react";

interface StatsProps {
  totalProjects?: number;
  minutesCreated?: number;
  creditsRemaining?: number;
}

export function StatsOverview({
  totalProjects = 12,
  minutesCreated = 48,
  creditsRemaining = 50,
}: StatsProps) {
  const STATS = [
    {
      label: "Total Projects",
      value: totalProjects,
      unit: "created",
      icon: FolderKanban,
      color: "text-violet-700",
      bg: "bg-violet-50",
      accent: "bg-violet-100 text-violet-700",
    },
    {
      label: "Minutes Processed",
      value: minutesCreated,
      unit: "mins",
      icon: Clock,
      color: "text-violet-700",
      bg: "bg-violet-50",
      accent: "bg-violet-100 text-violet-700",
    },
    {
      label: "Credits Remaining",
      value: creditsRemaining,
      unit: "credits",
      icon: Coins,
      color: "text-amber-700",
      bg: "bg-amber-50",
      accent: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
      {STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="flex items-center justify-between rounded-[26px] border border-neutral-200/80 bg-white p-5 shadow-[0_10px_24px_rgba(23,19,31,0.03)] sm:p-6"
          >
            <div>
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-[-0.06em] text-darktext">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-neutral-400">{stat.unit}</span>
              </div>
            </div>

            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.accent}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
