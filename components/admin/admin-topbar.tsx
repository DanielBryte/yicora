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
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white px-3 py-3 sm:px-6 sm:py-3.5">
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
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Operational</span>
          </div>

          <div className="hidden min-w-0 max-w-[32vw] items-center gap-2 rounded-xl bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700 sm:flex">
            <UserCheck className="w-3.5 h-3.5 text-berry" />
            <span className="truncate font-mono">{adminEmail}</span>
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
