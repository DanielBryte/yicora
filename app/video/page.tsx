import DashboardLayout from "@/app/dashboard/layout";
import { VideoDubbingForm } from "@/components/video/dubbing-form";
import { PaidFeatureGate } from "@/components/billing/paid-feature-gate";

export default function VideoStudioPage() {
  return (
    <DashboardLayout>
      <PaidFeatureGate><div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-darktext">Video Dubbing</h1>
          <p className="mt-1 text-sm text-neutral-500">Localize video content with voice, language, and subtitle controls.</p>
        </div>
        <VideoDubbingForm />
      </div></PaidFeatureGate>
    </DashboardLayout>
  );
}
