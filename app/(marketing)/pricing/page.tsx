import { MarketingNavbar } from "@/components/marketing/navbar";
import { Pricing } from "@/components/marketing/pricing";
import { MarketingFooter } from "@/components/marketing/footer";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white pt-24 flex flex-col font-sans">
      <MarketingNavbar />
      <Pricing />
      <MarketingFooter />
    </main>
  );
}
