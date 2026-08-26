import DashboardLayout from "@/app/dashboard/layout";
import { VideoDubbingForm } from "@/components/video/dubbing-form";

export default function VideoStudioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <VideoDubbingForm />
      </div>
    </DashboardLayout>
  );
}
