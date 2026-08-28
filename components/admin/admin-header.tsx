"use client";

import Link from "next/link";
import { ShieldCheck, Activity, Search, RefreshCw, Command, Zap } from "lucide-react";
import { Logo } from "@/components/shared/logo";

interface AdminHeaderProps {
  onRefresh?: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export function AdminHeader({ onRefresh, searchQuery = "", setSearchQuery }: AdminHeaderProps) {
  return (
    <header className="bg-[#1D0017] text-white border-b border-white/10 px-4 sm:px-8 py-4 sticky top-0 z-50 backdrop-blur-xl bg-opacity-95">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Logo + System Badge */}
        <div className="flex items-center gap-4">
          <Logo variant="light" />
          <div className="h-5 w-px bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-berry/20 text-pink-300 text-xs font-bold tracking-wider border border-berry/40 shadow-inner">
            <ShieldCheck className="w-3.5 h-3.5 text-berry" />
            <span>BUILDER CONTROL CENTER</span>
          </div>
        </div>

        {/* Center: Command Search Bar */}
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search users, task IDs, voice models, API logs..."
            className="w-full pl-10 pr-12 py-2 bg-white/10 border border-white/15 rounded-xl text-xs text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-berry/50 focus:bg-white/15 transition-all font-medium"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] text-neutral-400 font-mono bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>

        {/* Right: Operational Status & Quick Actions */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline">System Uptime 99.98%</span>
            <span className="sm:hidden">Operational</span>
          </div>

          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10 active:scale-95"
            title="Refresh System Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
