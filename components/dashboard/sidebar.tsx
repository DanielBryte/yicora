"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/shared/logo";
import {
  LayoutDashboard,
  Mic,
  Music,
  FolderKanban,
  CreditCard,
  Settings,
  LogOut,
  Plus,
  Sparkles,
  Coins,
  ArrowUpRight,
  Clapperboard,
  FolderOpen,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const DASHBOARD_NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Video Dubbing", href: "/video", icon: Clapperboard },
  { label: "Voice Studio", href: "/voice", icon: Mic },
  { label: "Music Box", href: "/music", icon: Music },
];

const SECONDARY_NAV_ITEMS = [
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/billing", icon: CreditCard },
];

const CREATE_TOOLS = [
  { label: "Video Dubbing", href: "/video", icon: Clapperboard, color: "bg-[#f2edfb] text-[#5d3ab7]" },
  { label: "Voice Studio", href: "/voice", icon: Mic, color: "bg-[#f2edfb] text-[#5d3ab7]" },
  { label: "Music Box", href: "/music", icon: Music, color: "bg-[#f2edfb] text-[#5d3ab7]" },
  { label: "Billing & Credits", href: "/billing", icon: Coins, color: "bg-[#f2edfb] text-[#5d3ab7]" },
  { label: "Projects", href: "/projects", icon: FolderOpen, color: "bg-[#f2edfb] text-[#5d3ab7]" },
];

export function Sidebar() {
  const pathname = usePathname();
  const [createOpen, setCreateOpen] = useState(false);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!createOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!createMenuRef.current?.contains(event.target as Node)) {
        setCreateOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCreateOpen(false);
        createButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [createOpen]);

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[252px] shrink-0 flex-col justify-between overflow-y-auto border-r border-[#e8e7ed] bg-white p-4 md:flex">
        <div className="space-y-6 pb-6">
        <div className="flex items-center px-2">
          <Logo />
        </div>

        <div ref={createMenuRef} className="relative">
          <button
            ref={createButtonRef}
            type="button"
            onClick={() => setCreateOpen((open) => !open)}
            aria-expanded={createOpen}
            aria-controls="create-tools-menu"
            className="flex min-h-11 w-full items-center gap-2.5 rounded-[18px] border border-[#decaf8] bg-[linear-gradient(135deg,#f1e5ff_0%,#e3d4ff_100%)] p-1.5 text-left text-sm font-semibold text-[#201c27] shadow-[0_10px_22px_rgba(124,75,214,0.12)] transition hover:brightness-[0.99]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#8d55ef_0%,#7c4bd6_100%)] text-white shadow-[0_8px_18px_rgba(124,75,214,0.28)]">
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="flex-1">Create</span>
          </button>

          {createOpen && (
            <div id="create-tools-menu" className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-full min-w-[220px] rounded-xl border border-[#e8e7ed] bg-white p-1.5 shadow-[0_12px_28px_rgba(32,28,39,0.12)]">
              <nav aria-label="Create a project" className="space-y-0.5">
                {CREATE_TOOLS.map(({ label, href, icon: Icon, color }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setCreateOpen(false)}
                    className="flex min-h-10 items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-[#f7f6f9] hover:text-[#201c27] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#8b5cf6]"
                  >
                    <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg border border-black/5", color)}>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-neutral-400" />
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Tools</p>
          <nav className="space-y-1.5">
            {DASHBOARD_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive ? "bg-[#f3ebff] text-[#1b1b1f] ring-1 ring-[#decaf8]" : "text-neutral-600 hover:bg-white hover:text-[#1b1b1f]"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-[#7c4bd6]" : "text-neutral-500")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="space-y-4 border-t border-[#e8e7ed] pt-4">
        <div className="space-y-2">
          <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Workspace</p>
          <div className="space-y-1.5">
            {SECONDARY_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  aria-current={isActive ? "page" : undefined}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition hover:bg-white",
                    isActive ? "bg-[#f2edfb] text-[#35135f]" : "text-neutral-600 hover:text-[#1b1b1f]"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-[#7c4bd6]" : "text-neutral-500")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button type="button" aria-label="Notifications" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9dff3] bg-white text-neutral-600 shadow-sm transition hover:text-[#7c4bd6]">
            <Sparkles className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Settings" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e9dff3] bg-white text-neutral-600 shadow-sm transition hover:text-[#7c4bd6]">
            <Settings className="h-4 w-4" />
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-neutral-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            <span>Exit</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
