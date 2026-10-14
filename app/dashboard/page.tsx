import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { ToolSearch } from "@/components/dashboard/tool-search";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-700">Your creative workspace</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-darktext sm:text-3xl">Bring your next idea to life.</h1>
          <p className="mt-1 text-sm text-neutral-500">Create, transform, and localize audio, video, and voice content for audiences everywhere.</p>
        </div>
        <ToolSearch />
      </div>
      <QuickActions />
      <StatsOverview />
      <RecentProjects />
    </div>
  );
}
