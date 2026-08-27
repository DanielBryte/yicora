"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { ChevronDown } from "lucide-react";

export function MarketingNavbar() {
  return (
    <header className="fixed top-5 inset-x-0 z-50 px-4 flex justify-center">
      <nav className="bg-white/95 backdrop-blur-md rounded-[16px] max-w-5xl w-full px-3 py-2.5 sm:px-4 sm:py-3 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all border border-neutral-200/80">
        <Logo variant="dark" />

        <div className="hidden md:flex items-center space-x-7 text-[13px] sm:text-sm font-medium text-neutral-800 tracking-tight">
          <a href="#preview" className="flex items-center gap-1.5 hover:text-berry transition-colors">
            <span>Products</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a href="#voices" className="flex items-center gap-1.5 hover:text-berry transition-colors">
            <span>African voices</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-70" />
          </a>
          <a href="#use-cases" className="hover:text-berry transition-colors">
            Use Cases
          </a>
          <a href="#pricing" className="hover:text-berry transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <Link
            href="/login"
            className="px-3 py-1.5 text-[13px] sm:text-sm font-medium text-neutral-700 hover:text-darktext transition-colors rounded-[8px]"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-[10px] bg-[#67002B] hover:bg-[#520022] text-white font-semibold text-[13px] sm:text-sm transition-all shadow-sm hover:shadow active:scale-95 flex items-center justify-center"
          >
            Try It Out
          </Link>
        </div>
      </nav>
    </header>
  );
}
