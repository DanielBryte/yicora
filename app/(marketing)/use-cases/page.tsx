import { MarketingNavbar } from "@/components/marketing/navbar";
import { UseCases } from "@/components/marketing/use-cases";
import { MarketingFooter } from "@/components/marketing/footer";

export default function UseCasesPage() {
  return (
    <main className="min-h-screen bg-offwhite pt-24 flex flex-col font-sans">
      <MarketingNavbar />
      <UseCases />
      <MarketingFooter />
    </main>
  );
}
