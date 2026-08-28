"use client";

import { useState, useEffect } from "react";
import { Search, RefreshCw, UserCheck } from "lucide-react";

interface AdminTopBarProps {
  onRefresh?: () => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export function AdminTopBar({ onRefresh, searchQuery = "", setSearchQuery }: AdminTopBarProps) {
  const [adminEmail, setAdminEmail] = useState("ezedinirudaniel@gmail.com");

  useEffect(() => {
    const email = localStorage.getItem("yicora_admin_authorized_email");
    if (email) {
      setAdminEmail(email);
    }
  }, []);

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-3.5 sticky top-0 z-40">
      <div className="flex items-center justify-between gap-4">
        {/* Simple Search Bar */}
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-darktext focus:outline-none focus:ring-2 focus:ring-berry/20"
          />
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Operational</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 text-xs text-neutral-700 font-medium">
            <UserCheck className="w-3.5 h-3.5 text-berry" />
            <span className="font-mono">{adminEmail}</span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-xl hover:bg-neutral-100 text-neutral-600 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
