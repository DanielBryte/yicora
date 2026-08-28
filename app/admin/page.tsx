"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
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

        <main className="flex-1 p-6 space-y-6 max-w-7xl w-full mx-auto">
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
