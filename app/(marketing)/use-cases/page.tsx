import { MarketingNavbar } from "@/components/marketing/navbar";
import { UseCases } from "@/components/marketing/use-cases";
import { MarketingFooter } from "@/components/marketing/footer";

export default function UseCasesPage() {
  return (
    <main className="flex min-h-screen flex-col bg-offwhite font-sans">
      <div className="brand-masthead">
        <MarketingNavbar />
      </div>
      <UseCases />
      <MarketingFooter />
    </main>
  );
}
