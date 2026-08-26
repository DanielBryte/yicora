"use client";

import { useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { StatusBadge, StatusType } from "@/components/shared/status-badge";
import { Search, Filter, Video, Mic, Music, ArrowUpRight } from "lucide-react";
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

  const icons = {
    video: Video,
    voice: Mic,
    music: Music,
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-darktext tracking-tight">Project Library</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage, filter, and export all your video dubbing, voice, and music generations.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                onClick={() => setFilterType(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
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
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => {
            const Icon = icons[proj.type];
            return (
              <Link
                key={proj.id}
                href={`/${proj.type}/${proj.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 relative overflow-hidden bg-neutral-100">
                    <img
                      src={proj.thumbnailUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold capitalize border border-white/10">
                        <Icon className="w-3.5 h-3.5 text-pink-300" />
                        <span>{proj.type}</span>
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <StatusBadge status={proj.status} />
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-bold text-darktext text-base group-hover:text-berry transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-medium">Created {proj.createdAt}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex justify-end">
                  <span className="text-xs font-semibold text-berry group-hover:underline flex items-center gap-1">
                    <span>Open Studio</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UnifiedProjectsPage;
