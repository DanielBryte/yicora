"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import {
  LayoutDashboard,
  Users,
  Cpu,
  Radio,
  Terminal,
  Sliders,
  LogOut,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ADMIN_NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users & Credits", icon: Users },
  { id: "queue", label: "Task Queue", icon: Cpu },
  { id: "voices", label: "Voice Fleet", icon: Radio },
  { id: "logs", label: "API Logs", icon: Terminal },
  { id: "settings", label: "Settings", icon: Sliders },
];

export function AdminSidebar({ activeTab, setActiveTab }: AdminSidebarProps) {
  const handleLockSession = () => {
    localStorage.removeItem("yicora_admin_authorized_email");
    window.location.reload();
  };

  return (
    <aside className="w-60 bg-white border-r border-neutral-200 flex flex-col justify-between p-5 min-h-screen shrink-0 hidden md:flex sticky top-0 h-screen">
      <div className="space-y-6">
        {/* Logo + Admin Tag */}
        <div className="space-y-2">
          <Logo />
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[11px] font-semibold uppercase tracking-wider">
            Admin Panel
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {ADMIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-colors text-left",
                  isActive
                    ? "bg-berry text-white font-semibold shadow-xs"
                    : "text-neutral-600 hover:text-darktext hover:bg-neutral-100"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-neutral-500")} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Links */}
      <div className="pt-4 border-t border-neutral-200 space-y-1">
        <button
          onClick={handleLockSession}
          className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-neutral-600 hover:text-amber-600 hover:bg-amber-50 font-medium text-xs transition-colors"
        >
          <Lock className="w-4 h-4 text-amber-500" />
          <span>Lock Admin</span>
        </button>

        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-neutral-600 hover:text-darktext hover:bg-neutral-100 font-medium text-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-neutral-400" />
          <span>Exit Admin</span>
        </Link>
      </div>
    </aside>
  );
}
