"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { LayoutDashboard, Video, Mic, Music, FolderKanban, CreditCard, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Video Dubbing", href: "/video", icon: Video },
  { label: "AI Voice", href: "/voice", icon: Mic },
  { label: "AI Music Box", href: "/music", icon: Music },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Billing & Credits", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-neutral-200/80 flex flex-col justify-between p-5 min-h-screen shrink-0 hidden md:flex">
      <div className="space-y-8">
        <div className="px-2">
          <Logo />
        </div>

        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-sm transition-all",
                  isActive
                    ? "bg-burgundy text-white font-semibold shadow-md"
                    : "text-neutral-600 hover:text-darktext hover:bg-neutral-100"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-pink-300" : "text-neutral-500")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-neutral-200">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-neutral-600 hover:text-red-600 hover:bg-red-50 font-medium text-sm transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Studio</span>
        </Link>
      </div>
    </aside>
  );
}
