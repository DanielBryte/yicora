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
      color: "text-burgundy",
      bg: "bg-pink-50",
    },
    {
      label: "Minutes Processed",
      value: minutesCreated,
      unit: "mins",
      icon: Clock,
      color: "text-berry",
      bg: "bg-pink-50",
    },
    {
      label: "Credits Remaining",
      value: creditsRemaining,
      unit: "credits",
      icon: Coins,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {STATS.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="p-6 bg-white rounded-3xl border border-neutral-200/80 shadow-sm flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-1">
                {stat.label}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-darktext tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-400 font-medium">{stat.unit}</span>
              </div>
            </div>

            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
