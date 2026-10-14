"use client";

import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
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
  Plus,
  Sparkles,
  Coins,
  ArrowUpRight,
  Clapperboard,
  FolderOpen,
  Shirt,
  UserRound,
  PanelLeftClose,
  PanelLeftOpen,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const DASHBOARD_NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, available: true },
  { label: "Virtual Try-On", href: "/dashboard/virtual-try-on", icon: Shirt, available: true },
  { label: "AI Face Changer", href: "/dashboard/face-changer", icon: UserRound, available: true },
  { label: "Music Box", href: "/music", icon: Music, available: true },
  { label: "Video Dubbing", href: "/video", icon: Clapperboard, available: false },
  { label: "Voice Studio", href: "/voice", icon: Mic, available: false },
  { label: "AI UGC Studio", href: "#coming-soon", icon: Sparkles, available: false },
];

const SECONDARY_NAV_ITEMS = [
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/billing", icon: CreditCard },
];

const CREATE_TOOLS = [
  { label: "Virtual Try-On", href: "/dashboard/virtual-try-on", icon: Shirt, color: "bg-fuchsia-100 text-fuchsia-700", available: true },
  { label: "AI Face Changer", href: "/dashboard/face-changer", icon: UserRound, color: "bg-cyan-100 text-cyan-700", available: true },
  { label: "Music Box", href: "/music", icon: Music, color: "bg-amber-100 text-amber-700", available: true },
  { label: "Video Dubbing", href: "/video", icon: Clapperboard, color: "bg-rose-100 text-rose-700", available: false },
  { label: "Voice Studio", href: "/voice", icon: Mic, color: "bg-sky-100 text-sky-700", available: false },
  { label: "AI UGC Studio", href: "#coming-soon", icon: Sparkles, color: "bg-violet-100 text-violet-700", available: false },
  { label: "Billing & Credits", href: "/billing", icon: Coins, color: "bg-lime-100 text-lime-700", available: true },
  { label: "Projects", href: "/projects", icon: FolderOpen, color: "bg-emerald-100 text-emerald-700", available: true },
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const [createOpen, setCreateOpen] = useState(false);
  const [navTooltip, setNavTooltip] = useState<{ label: string; left: number; top: number } | null>(null);
  const createMenuRef = useRef<HTMLDivElement>(null);
  const createButtonRef = useRef<HTMLButtonElement>(null);

  function showNavTooltip(element: HTMLElement, label: string) {
    const rect = element.getBoundingClientRect();
    setNavTooltip({ label, left: rect.right + 10, top: rect.top + rect.height / 2 });
  }

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
    <>
    <aside className={cn(
      "fixed left-0 top-0 z-30 hidden h-screen shrink-0 flex-col justify-between overflow-y-auto border-r border-[#e8e7ed] bg-white transition-[width,padding] duration-300 ease-out md:flex",
      collapsed ? "w-[76px] p-2" : "w-[252px] p-4",
    )}>
        <div className={cn("pb-6", collapsed ? "space-y-4" : "space-y-6")}>
        <div className={cn("flex items-center", collapsed ? "min-h-10 flex-col justify-center gap-2 pt-4" : "min-h-16 justify-between px-2")}>
          {collapsed ? (
            <Link href="/dashboard" aria-label="YiCORA dashboard" title="YiCORA" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-transparent">
              <Image src="/yicora-mark.svg" alt="YiCORA" width={24} height={28} className="h-7 w-6 shrink-0 object-contain" />
            </Link>
          ) : <Logo />}
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-pressed={collapsed}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onMouseEnter={(event) => collapsed && showNavTooltip(event.currentTarget, "Expand sidebar")}
            onMouseLeave={() => setNavTooltip(null)}
            onFocus={(event) => collapsed && showNavTooltip(event.currentTarget, "Expand sidebar")}
            onBlur={() => setNavTooltip(null)}
            className={cn("flex shrink-0 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-[#f2edfb] hover:text-[#5d3ab7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7130dc]/40", collapsed ? "h-7 w-7" : "h-9 w-9")}
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </button>
        </div>

        <div ref={createMenuRef} className="relative">
          <button
            ref={createButtonRef}
            type="button"
            onClick={() => setCreateOpen((open) => !open)}
            aria-expanded={createOpen}
            aria-controls="create-tools-menu"
            title={collapsed ? "Create" : undefined}
            onMouseEnter={(event) => collapsed && showNavTooltip(event.currentTarget, "Create")}
            onMouseLeave={() => setNavTooltip(null)}
            onFocus={(event) => collapsed && showNavTooltip(event.currentTarget, "Create")}
            onBlur={() => setNavTooltip(null)}
            className={cn("flex min-h-11 w-full items-center rounded-[18px] border border-transparent bg-transparent p-1.5 text-left text-sm font-semibold text-[#7130dc] shadow-none transition hover:text-[#5721b5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7130dc]/40", collapsed ? "justify-center" : "gap-2.5")}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-berry text-white">
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className={cn("flex-1", collapsed && "sr-only")}>Create</span>
          </button>

          {createOpen && (
            <div id="create-tools-menu" className={cn("z-50 w-[240px] rounded-xl border border-[#e8e7ed] bg-white p-1.5 shadow-[0_12px_28px_rgba(32,28,39,0.12)]", collapsed ? "fixed left-[84px] top-20" : "absolute left-0 top-[calc(100%+0.5rem) w-full min-w-[220px]")}>
              <nav aria-label="Create a project" className="space-y-0.5">
                {CREATE_TOOLS.map(({ label, href, icon: Icon, color, available }) => {
                  const row = (
                    <>
                      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/5", color)}>
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1 truncate">{label}</span>
                      {available ? (
                        <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-neutral-400" />
                      ) : (
                        <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-neutral-100 px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide text-neutral-500">Coming soon</span>
                      )}
                    </>
                  );

                  return available ? (
                    <Link key={label} href={href} onClick={() => setCreateOpen(false)} className="flex min-h-10 min-w-0 flex-nowrap items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-[#603ab7] transition-colors hover:bg-[#f7f6f9] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#8b5cf6]">
                      {row}
                    </Link>
                  ) : (
                    <div key={label} aria-disabled="true" className="flex min-h-10 min-w-0 flex-nowrap items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-neutral-400">
                      {row}
                    </div>
                  );
                })}
              </nav>
            </div>
          )}
        </div>

        <div className={cn("space-y-2", collapsed && "space-y-3")}>
          {!collapsed && <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Tools</p>}
          <nav className="space-y-1.5">
            {DASHBOARD_NAV_ITEMS.filter((item) => item.available).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  aria-current={isActive ? "page" : undefined}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  onMouseEnter={(event) => collapsed && showNavTooltip(event.currentTarget, item.label)}
                  onMouseLeave={() => setNavTooltip(null)}
                  onFocus={(event) => collapsed && showNavTooltip(event.currentTarget, item.label)}
                  onBlur={() => setNavTooltip(null)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    collapsed && "justify-center px-0",
                    item.label === "Overview" && "rounded-full",
                    item.label === "Music Box" && !isActive && "bg-[#fbf8ff] text-[#603ab7]",
                    isActive ? "rounded-full bg-berry text-white shadow-sm hover:bg-berry-hover hover:text-white" : item.label === "Music Box" ? "hover:bg-[#f3ebff]" : "text-neutral-600 hover:bg-white hover:text-[#1b1b1f]"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-neutral-500")} />
                  <span className={collapsed ? "sr-only" : undefined}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className={cn("space-y-1.5 border-t border-[#eeeaf2] pt-3", collapsed && "border-0 pt-0")}>
            {!collapsed && <p className="px-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400">Coming soon</p>}
            <nav aria-label="Coming soon tools" className="space-y-1">
              {DASHBOARD_NAV_ITEMS.filter((item) => !item.available).map(({ label, icon: Icon }) => (
                <div key={label} aria-disabled="true" title={collapsed ? label : undefined} onMouseEnter={(event) => collapsed && showNavTooltip(event.currentTarget, label)} onMouseLeave={() => setNavTooltip(null)} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium text-neutral-400", collapsed && "justify-center px-0")}>
                  <Icon className="h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                  <span className={collapsed ? "sr-only" : undefined}>{label}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className={cn("space-y-4 border-t border-[#e8e7ed] pt-4", collapsed && "space-y-3")}>
        <div className="space-y-2">
          {!collapsed && <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Workspace</p>}
          <div className="space-y-1.5">
            {SECONDARY_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  aria-current={isActive ? "page" : undefined}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  onMouseEnter={(event) => collapsed && showNavTooltip(event.currentTarget, item.label)}
                  onMouseLeave={() => setNavTooltip(null)}
                  onFocus={(event) => collapsed && showNavTooltip(event.currentTarget, item.label)}
                  onBlur={() => setNavTooltip(null)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition hover:bg-white",
                    collapsed && "justify-center px-0",
                    isActive ? "rounded-full bg-berry text-white shadow-sm hover:bg-berry-hover hover:text-white" : "text-neutral-600 hover:text-[#1b1b1f]"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-neutral-500")} />
                  <span className={collapsed ? "sr-only" : undefined}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <Link
          href="/billing"
          title={collapsed ? "Upgrade plan" : undefined}
          className={cn(
            "flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#7130dc] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5f26bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7130dc]/40 focus-visible:ring-offset-2",
            collapsed && "mx-auto h-10 min-h-10 w-10 px-0",
          )}
        >
          <Rocket className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className={collapsed ? "sr-only" : undefined}>Upgrade plan</span>
        </Link>
      </div>
    </aside>
    {collapsed && navTooltip && createPortal(
      <div role="tooltip" className="pointer-events-none fixed z-[100] -translate-y-1/2 whitespace-nowrap rounded-lg bg-[#211638] px-2.5 py-1.5 text-xs font-medium text-white shadow-lg" style={{ left: navTooltip.left, top: navTooltip.top }}>
        {navTooltip.label}
      </div>,
      document.body,
    )}
    </>
  );
}
