"use client";

import Link from "next/link";
import { Sparkles, Coins, User } from "lucide-react";

interface HeaderProps {
  userName?: string;
  credits?: number;
}

export function DashboardHeader({ userName = "Creator", credits = 50 }: HeaderProps) {
  return (
    <header className="bg-white border-b border-neutral-200/80 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-darktext tracking-tight">
          Welcome back, {userName} 👋
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
          What will you create today?
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="/billing"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 border border-pink-200 hover:bg-pink-100 transition-colors"
        >
          <Coins className="w-4 h-4 text-berry" />
          <span className="text-xs font-bold text-berry">{credits} Credits</span>
          <Sparkles className="w-3 h-3 text-berry" />
        </Link>

        <div className="w-9 h-9 rounded-full bg-burgundy text-white font-bold flex items-center justify-center text-sm shadow-md">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
