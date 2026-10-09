import Link from "next/link";
import { StatusBadge, StatusType } from "@/components/shared/status-badge";
import { Video, Mic, Music, ArrowUpRight } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  type: "video" | "voice" | "music";
  status: StatusType;
  thumbnailUrl?: string;
  createdAt: string;
}

const SAMPLE_PROJECTS: ProjectItem[] = [
  {
    id: "proj_mus_01",
    title: "Afrobeats Summer Anthem",
    type: "music",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    createdAt: "10 mins ago",
  },
  {
    id: "proj_mus_02",
    title: "Amapiano Brand Theme",
    type: "music",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&auto=format&fit=crop&q=80",
    createdAt: "2 hours ago",
  },
];

export function RecentProjects({ projects = SAMPLE_PROJECTS }: { projects?: ProjectItem[] }) {
  const icons = {
    video: Video,
    voice: Mic,
    music: Music,
  };

  return (
    <div className="space-y-4 rounded-[28px] border border-neutral-200/80 bg-white p-5 shadow-[0_12px_28px_rgba(23,19,31,0.04)] sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold tracking-[-0.03em] text-darktext">Recent Projects</h2>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 transition hover:text-violet-800"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
              <th className="px-2 py-3">Project</th>
              <th className="px-2 py-3">Type</th>
              <th className="px-2 py-3">Status</th>
              <th className="px-2 py-3">Created</th>
              <th className="px-2 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {projects.map((proj) => {
              const Icon = icons[proj.type];
              const projectLink = `/${proj.type}/${proj.id}`;

              return (
                <tr key={proj.id} className="group transition-colors hover:bg-violet-50/50">
                  <td className="px-2 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
                        {proj.thumbnailUrl ? (
                          <img src={proj.thumbnailUrl} alt={proj.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-violet-100 text-sm font-bold text-violet-700">
                            Y
                          </div>
                        )}
                      </div>
                      <span className="line-clamp-1 font-semibold text-darktext transition-colors group-hover:text-violet-700">
                        {proj.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-2 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-xl bg-neutral-100 px-2.5 py-1.5 text-xs font-medium capitalize text-neutral-700">
                      <Icon className="h-3.5 w-3.5 text-neutral-500" />
                      <span>{proj.type}</span>
                    </span>
                  </td>
                  <td className="px-2 py-3.5">
                    <StatusBadge status={proj.status} />
                  </td>
                  <td className="px-2 py-3.5 text-neutral-500">{proj.createdAt}</td>
                  <td className="px-2 py-3.5 text-right">
                    <Link
                      href={projectLink}
                      className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3.5 py-1.5 text-xs font-medium text-neutral-700 transition hover:bg-violet-600 hover:text-white"
                    >
                      <span>Open</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
