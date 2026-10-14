"use client";

import { useSyncExternalStore } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

const SIDEBAR_PREFERENCE_KEY = "yicora.dashboard.sidebar-collapsed";
const SIDEBAR_PREFERENCE_EVENT = "yicora:sidebar-preference";

function subscribeToSidebarPreference(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(SIDEBAR_PREFERENCE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SIDEBAR_PREFERENCE_EVENT, onChange);
  };
}

function getSidebarPreference() {
  return window.localStorage.getItem(SIDEBAR_PREFERENCE_KEY) === "true";
}

function setSidebarPreference(collapsed: boolean) {
  window.localStorage.setItem(SIDEBAR_PREFERENCE_KEY, String(collapsed));
  window.dispatchEvent(new Event(SIDEBAR_PREFERENCE_EVENT));
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const sidebarCollapsed = useSyncExternalStore(subscribeToSidebarPreference, getSidebarPreference, () => false);
  const toggleSidebar = () => setSidebarPreference(!sidebarCollapsed);

  return (
    <div className="dashboard-shell relative min-h-screen overflow-hidden bg-[#f7f4fa] text-darktext">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <DashboardHeader sidebarCollapsed={sidebarCollapsed} />

      <div className={`relative z-10 flex min-h-screen flex-col transition-[padding] duration-300 ease-out ${sidebarCollapsed ? "md:pl-[76px]" : "md:pl-[252px]"}`}>
        <main className="flex-1 overflow-y-auto pt-[76px] md:pt-[80px]">
          <div className="dashboard-content mx-auto w-full max-w-[1440px] space-y-6 p-4 sm:p-6 md:space-y-8 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
