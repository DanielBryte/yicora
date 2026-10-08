import DashboardLayout from "@/app/dashboard/layout";
import { TTSForm } from "@/components/voice/tts-form";

export default function VoiceStudioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-darktext">Voice Studio</h1>
          <p className="mt-1 text-sm text-neutral-500">Create expressive speech from your script using African voice models.</p>
        </div>
        <TTSForm />
      </div>
    </DashboardLayout>
  );
}
