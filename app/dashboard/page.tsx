import { QuickActions } from "@/components/dashboard/quick-actions";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { RecentProjects } from "@/components/dashboard/recent-projects";
import { ToolSearch } from "@/components/dashboard/tool-search";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-darktext sm:text-3xl">What are you creating today?</h1>
          <p className="mt-1 text-sm text-neutral-500">Find a creative tool or jump back into your workspace.</p>
        </div>
        <ToolSearch />
      </div>
      <QuickActions />
      <StatsOverview />
      <RecentProjects />
    </div>
  );
}
