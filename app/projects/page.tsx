"use client";

import { useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { StatusBadge, StatusType } from "@/components/shared/status-badge";
import { Search, Video, Mic, Music, ArrowUpRight, Clapperboard, FolderKanban, CheckCircle2, Activity, X } from "lucide-react";
import Link from "next/link";

interface ProjectCardData {
  id: string;
  title: string;
  type: "video" | "voice" | "music";
  status: StatusType;
  thumbnailUrl: string;
  createdAt: string;
}

const ALL_PROJECTS: ProjectCardData[] = [
  {
    id: "proj_vid_01",
    title: "Nollywood Documentary Yoruba Dub",
    type: "video",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=80",
    createdAt: "August 26, 2026",
  },
  {
    id: "proj_mus_02",
    title: "Lagos Dreams & Golden Sun (Afrobeats)",
    type: "music",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80",
    createdAt: "August 26, 2026",
  },
  {
    id: "proj_voi_03",
    title: "Fintech App Onboarding Script (Igbo)",
    type: "voice",
    status: "processing",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    createdAt: "August 25, 2026",
  },
  {
    id: "proj_vid_04",
    title: "Tech Review Hausa Localization",
    type: "video",
    status: "queued",
    thumbnailUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&auto=format&fit=crop&q=80",
    createdAt: "August 24, 2026",
  },
  {
    id: "proj_mus_05",
    title: "Highlife Guitar DNA Transformation",
    type: "music",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=80",
    createdAt: "August 22, 2026",
  },
  {
    id: "proj_voi_06",
    title: "Swahili Educational Audio Lesson",
    type: "voice",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=80",
    createdAt: "August 20, 2026",
  },
];

export function UnifiedProjectsPage() {
  const [filterType, setFilterType] = useState<"all" | "video" | "voice" | "music">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = ALL_PROJECTS.filter((p) => {
    if (filterType !== "all" && p.type !== filterType) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const completedCount = ALL_PROJECTS.filter((project) => project.status === "completed").length;
  const activeCount = ALL_PROJECTS.filter((project) => project.status === "processing" || project.status === "queued").length;

  const icons = {
    video: Video,
    voice: Mic,
    music: Music,
  };

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Workspace · Projects</p>
            <h1 className="text-2xl font-bold tracking-tight text-darktext sm:text-3xl">Projects</h1>
            <p className="mt-1 text-sm text-neutral-500">Find and continue your video, voice, and music work.</p>
          </div>
          <Link href="/video" className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-berry px-4 text-sm font-semibold text-white hover:bg-berry-hover">
            <Clapperboard className="h-4 w-4" />
            <span>Create video dub</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "All projects", value: ALL_PROJECTS.length, icon: FolderKanban },
            { label: "Completed", value: completedCount, icon: CheckCircle2 },
            { label: "In progress", value: activeCount, icon: Activity },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f2edfb] text-[#5d3ab7]"><Icon className="h-4 w-4" /></span>
              <div><p className="text-xs font-medium text-neutral-500">{label}</p><p className="text-lg font-semibold leading-6 text-darktext">{value}</p></div>
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200/80 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All Projects" },
              { id: "video", label: "Video Dubs" },
              { id: "voice", label: "AI Voices" },
              { id: "music", label: "Music Box" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as "all" | "video" | "voice" | "music")}
                aria-pressed={filterType === tab.id}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  filterType === tab.id
                    ? "bg-burgundy text-white shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Status Filter */}
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1 lg:w-72 lg:flex-none">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                aria-label="Search projects"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label="Filter projects by status"
              className="min-h-10 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm font-medium text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="processing">Processing</option>
              <option value="queued">Queued</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Card Grid */}
        {filtered.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white px-6 text-center">
            <Search className="h-6 w-6 text-neutral-400" />
            <h2 className="mt-3 text-base font-semibold text-darktext">No projects found</h2>
            <p className="mt-1 text-sm text-neutral-500">Try another search or clear your filters.</p>
            <button type="button" onClick={() => { setSearchQuery(""); setFilterType("all"); setFilterStatus("all"); }} className="mt-4 inline-flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50">
              <X className="h-4 w-4" /> Clear filters
            </button>
          </div>
        ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((proj) => {
            const Icon = icons[proj.type];
            return (
              <Link
                key={proj.id}
                href={`/${proj.type}/${proj.id}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/80 bg-white transition-colors hover:border-[#d6c8ec]"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-neutral-100">
                    <img
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/20 bg-black/75 px-2.5 py-1 text-[11px] font-semibold capitalize text-white">
                        <Icon className="w-3.5 h-3.5 text-pink-300" />
                        <span>{proj.type}</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <StatusBadge status={proj.status} />
                    </div>
                  </div>

                  <div className="space-y-2 p-4">
                    <h3 className="line-clamp-1 text-sm font-semibold text-darktext transition-colors group-hover:text-berry">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-medium text-neutral-500">Created {proj.createdAt}</p>
                  </div>
                </div>

                <div className="flex justify-end px-4 pb-4">
                  <span className="text-xs font-semibold text-berry group-hover:underline flex items-center gap-1">
                    <span>Open Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default UnifiedProjectsPage;
