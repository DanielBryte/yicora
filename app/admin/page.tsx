"use client";

import { useState } from "react";
import { AdminSidebar, ADMIN_NAV_ITEMS } from "@/components/admin/admin-sidebar";
import { AdminTopBar } from "@/components/admin/admin-topbar";
import { AdminStats } from "@/components/admin/admin-stats";
import { UserManagement } from "@/components/admin/user-management";
import { ProcessingQueue } from "@/components/admin/processing-queue";
import { VoiceModelsStatus } from "@/components/admin/voice-models-status";
import { ApiLogsView } from "@/components/admin/api-logs-view";
import { SystemSettings } from "@/components/admin/system-settings";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-offwhite font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <nav aria-label="Admin sections" className="flex gap-1 overflow-x-auto border-b border-neutral-200 bg-white px-3 py-2 md:hidden">
          {ADMIN_NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? "page" : undefined}
              className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-xs font-semibold transition ${
                activeTab === id ? "bg-berry text-white" : "text-neutral-600 hover:bg-violet-50 hover:text-berry"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <main className="mx-auto w-full max-w-7xl flex-1 space-y-6 p-4 sm:p-6">
          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <AdminStats />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ProcessingQueue />
                <VoiceModelsStatus />
              </div>
              <UserManagement />
            </div>
          )}

          {activeTab === "users" && (
            <div className="animate-in fade-in duration-200">
              <UserManagement />
            </div>
          )}

          {activeTab === "queue" && (
            <div className="animate-in fade-in duration-200">
              <ProcessingQueue />
            </div>
          )}

          {activeTab === "voices" && (
            <div className="animate-in fade-in duration-200">
              <VoiceModelsStatus />
            </div>
          )}

          {activeTab === "logs" && (
            <div className="animate-in fade-in duration-200">
              <ApiLogsView />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="animate-in fade-in duration-200">
              <SystemSettings />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
