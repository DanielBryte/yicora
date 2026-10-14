"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Coins, Menu, X, ChevronDown, UserRound, CreditCard, Settings, LogOut, Bell, Rocket } from "lucide-react";
import { DASHBOARD_NAV_ITEMS } from "@/components/dashboard/sidebar";

interface HeaderProps {
  userName?: string;
  credits?: number;
  sidebarCollapsed?: boolean;
}

export function DashboardHeader({ userName = "Creator", credits = 50, sidebarCollapsed = false }: HeaderProps) {
  const pathname = usePathname();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b border-[#e8e7ed] bg-white transition-[left,width] duration-300 ease-out md:right-0 ${sidebarCollapsed ? "md:left-[76px] md:w-[calc(100%-76px)]" : "md:left-[252px] md:w-[calc(100%-252px)]"}`}>
      <div className="relative mx-auto flex min-h-[64px] w-full max-w-[1600px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileNavOpen}
            aria-controls="dashboard-mobile-navigation"
            onClick={() => setMobileNavOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-50 md:hidden"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-[#1b1b1f] sm:text-lg">Welcome back, {userName}</h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/billing"
            className="hidden items-center gap-1.5 rounded-full bg-[#7130dc] px-2.5 py-2 text-white shadow-sm transition hover:bg-[#5f26bd] sm:flex sm:gap-2 sm:px-4"
          >
            <Coins className="h-4 w-4 text-white" />
            <span className="text-[11px] font-bold sm:text-xs">{credits} Credits</span>
            <Sparkles className="hidden h-3 w-3 text-white sm:block" />
          </Link>

          <button type="button" aria-label="Notifications" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9dff3] bg-white text-neutral-600 shadow-sm transition hover:text-[#7c4bd6]">
            <Bell className="h-4 w-4" />
          </button>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((open) => !open)}
              className="flex items-center gap-2 rounded-full border border-[#e9dff3] bg-white px-2 py-1.5 shadow-sm transition hover:border-[#caa5ff] hover:bg-[#faf4ff]"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7c4bd6] text-sm font-bold text-white shadow-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-[11px] font-semibold text-neutral-500">Signed in</span>
                <span className="block text-xs font-semibold text-[#1b1b1f]">{userName}</span>
              </span>
              <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-64 overflow-hidden rounded-3xl border border-[#efe5f7] bg-white p-2 shadow-2xl shadow-[#d5c6eb]/40">
                <div className="flex items-center gap-3 rounded-2xl bg-[#f7f0ff] px-3 py-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7c4bd6] text-sm font-bold text-white shadow-sm">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#1b1b1f]">{userName}</p>
                    <p className="truncate text-xs text-neutral-500">creator@yicora.ai</p>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  {[
                    { label: "Profile", icon: UserRound, href: "/settings" },
                    { label: "Billing", icon: CreditCard, href: "/billing" },
                    { label: "Settings", icon: Settings, href: "/settings" },
                  ].map(({ label, icon: Icon, href }) => (
                    <Link
                      key={label}
                      href={href}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-[#f5eefb] hover:text-[#1b1b1f]"
                    >
                      <Icon className="h-4 w-4 text-neutral-500" />
                      {label}
                    </Link>
                  ))}

                  <div className="my-1 border-t border-neutral-200" />

                  <Link
                    href="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileNavOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileNavOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/30 md:hidden"
          />
          <nav
            id="dashboard-mobile-navigation"
            aria-label="Studio navigation"
            className="absolute inset-x-3 top-[calc(100%+0.5rem)] z-50 rounded-2xl border border-[#efe5f7] bg-white p-2 shadow-xl md:hidden"
          >
            {DASHBOARD_NAV_ITEMS.map(({ label, href, icon: Icon, available }) => {
              const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
              const contents = (
                <>
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{label}</span>
                    {!available && <span className="shrink-0 whitespace-nowrap rounded-full bg-neutral-100 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-neutral-500">Coming soon</span>}
                </>
              );

              return available ? (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileNavOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 ${label === "Overview" || isActive ? "rounded-full" : "rounded-2xl"} px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-berry text-white hover:bg-berry-hover hover:text-white" : label === "Music Box" ? "text-[#603ab7] hover:bg-[#f5eefb]" : "text-neutral-700 hover:bg-[#f5eefb] hover:text-[#1b1b1f]"}`}
                >
                  <>
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{label}</span>
                  </>
                </Link>
              ) : (
                <div key={href} aria-disabled="true" className="flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400">
                  {contents}
                </div>
              );
            })}
            <Link
              href="/billing"
              onClick={() => setMobileNavOpen(false)}
              className="my-2 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#7130dc] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5f26bd]"
            >
              <Rocket className="h-4 w-4" /> Upgrade plan
            </Link>
            <Link
              href="/"
              onClick={() => setMobileNavOpen(false)}
              className="mt-1 flex min-h-11 items-center gap-3 rounded-xl border-t border-neutral-100 px-3 py-2.5 text-sm font-medium text-neutral-500 transition hover:bg-neutral-50"
            >
              Exit Studio
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}
