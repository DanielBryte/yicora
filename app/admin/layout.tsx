import { ReactNode } from "react";
import { AdminAuthGate } from "@/components/admin/admin-auth-gate";

export const metadata = {
  title: "Builder Admin Control Center | YiCORA AI Infrastructure",
  description: "Administrative overview, platform metrics, user credit management, and voice model telemetry.",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthGate>
      <div className="min-h-screen bg-offwhite text-darktext font-sans">{children}</div>
    </AdminAuthGate>
  );
}
