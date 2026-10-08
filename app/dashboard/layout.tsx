import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-shell relative min-h-screen overflow-hidden bg-[#f7f4fa] text-darktext">
      <Sidebar />
      <DashboardHeader />

      <div className="relative z-10 flex min-h-screen flex-col md:pl-[252px]">
        <main className="flex-1 overflow-y-auto pt-[76px] md:pt-[80px]">
          <div className="dashboard-content mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6 md:space-y-8 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
