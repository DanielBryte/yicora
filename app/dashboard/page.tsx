import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { RecentProjects } from "@/components/dashboard/recent-projects";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <QuickActions />
      <StatsOverview />
      <RecentProjects />
    </div>
  );
}
