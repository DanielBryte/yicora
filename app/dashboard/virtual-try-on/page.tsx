import { LiveStudio } from "@/components/decart/live-studio";
import { PaidFeatureGate } from "@/components/billing/paid-feature-gate";

export default function VirtualTryOnPage() {
  return <PaidFeatureGate><LiveStudio mode="try-on" /></PaidFeatureGate>;
}
