"use client";

import { Users, Coins, Video, Zap } from "lucide-react";

export function AdminStats() {
  const STATS = [
    {
      title: "Total Creators",
      value: "1,420",
      change: "+18.4% this week",
      icon: Users,
    },
    {
      title: "Credits Volume",
      value: "84,500",
      change: "94% utilization",
      icon: Coins,
    },
    {
      title: "Minutes Dubbed",
      value: "12,840",
      change: "50+ dialects",
      icon: Video,
    },
    {
      title: "API Latency",
      value: "142 ms",
      change: "99.98% SLA uptime",
      icon: Zap,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">{stat.title}</span>
              <div className="p-2 rounded-xl bg-neutral-100 text-neutral-700">
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-2xl font-bold text-darktext tracking-tight">{stat.value}</div>
              <div className="text-[11px] text-neutral-500 font-medium mt-1">{stat.change}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
