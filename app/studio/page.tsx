import DashboardLayout from "@/app/dashboard/layout";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function StudioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-darktext tracking-tight">YiCORA Creative Studio Launcher</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">Select an AI creative tool to begin localizing or generating content.</p>
        </div>
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
