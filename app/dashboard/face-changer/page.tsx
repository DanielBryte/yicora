import { LiveStudio } from "@/components/decart/live-studio";
import { PaidFeatureGate } from "@/components/billing/paid-feature-gate";

export default function FaceChangerPage() {
  return <PaidFeatureGate><LiveStudio mode="face" /></PaidFeatureGate>;
}
