import { MarketingNavbar } from "@/components/marketing/navbar";
import { Pricing } from "@/components/marketing/pricing";
import { MarketingFooter } from "@/components/marketing/footer";

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white font-sans">
      <div className="brand-masthead">
        <MarketingNavbar />
      </div>
      <Pricing />
      <MarketingFooter />
    </main>
  );
}
