import { MarketingNavbar } from "@/components/marketing/navbar";
import { Hero } from "@/components/marketing/hero";
import { UseCases } from "@/components/marketing/use-cases";
import { Pricing } from "@/components/marketing/pricing";
import { MarketingFooter } from "@/components/marketing/footer";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-offwhite flex flex-col font-sans">
      <MarketingNavbar />
      <Hero />
      <UseCases />
      <Pricing />
      <MarketingFooter />
    </main>
  );
}
