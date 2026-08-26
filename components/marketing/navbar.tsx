"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function MarketingNavbar() {
  return (
    <header className="fixed top-5 inset-x-0 z-50 px-4 flex justify-center">
      <nav className="glass-nav rounded-full max-w-5xl w-full px-6 py-3.5 flex items-center justify-between shadow-xl transition-all">
        <Logo />

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-700">
          <a href="#preview" className="hover:text-berry transition-colors">
            Product
          </a>
          <a href="#voices" className="hover:text-berry transition-colors">
            African Voices
          </a>
          <a href="#use-cases" className="hover:text-berry transition-colors">
            Use Cases
          </a>
          <a href="#pricing" className="hover:text-berry transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-neutral-700 hover:text-berry transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 rounded-full bg-berry hover:bg-berry-hover text-white font-medium text-sm transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Try it Out
          </Link>
        </div>
      </nav>
    </header>
  );
}
