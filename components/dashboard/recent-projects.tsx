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
    id: "proj_vid_01",
    title: "Nollywood Documentary Yoruba Dub",
    type: "video",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&auto=format&fit=crop&q=80",
    createdAt: "10 mins ago",
  },
  {
    id: "proj_mus_02",
    title: "Afrobeats Summer Anthem (Amapiano DNA)",
    type: "music",
    status: "completed",
    thumbnailUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
    createdAt: "2 hours ago",
  },
  {
    id: "proj_voi_03",
    title: "Fintech App Onboarding Script (Igbo)",
    type: "voice",
    status: "processing",
    thumbnailUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    createdAt: "5 hours ago",
  },
  {
    id: "proj_vid_04",
    title: "Tech Review Hausa Localization",
    type: "video",
    status: "queued",
    thumbnailUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300&auto=format&fit=crop&q=80",
    createdAt: "1 day ago",
  },
];

export function RecentProjects({ projects = SAMPLE_PROJECTS }: { projects?: ProjectItem[] }) {
  const icons = {
    video: Video,
    voice: Mic,
    music: Music,
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-darktext tracking-tight">Recent Projects</h2>
        <Link
          href="/projects"
          className="text-xs font-semibold text-berry hover:underline flex items-center gap-1"
        >
          <span>View All Projects</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-neutral-400 uppercase text-[10px] tracking-wider font-semibold">
              <th className="py-3 px-2">Project</th>
              <th className="py-3 px-2">Type</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Created</th>
              <th className="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {projects.map((proj) => {
              const Icon = icons[proj.type];
              const projectLink = `/${proj.type}/${proj.id}`;

              return (
                <tr key={proj.id} className="group hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-neutral-200">
                        {proj.thumbnailUrl ? (
                          <img src={proj.thumbnailUrl} alt={proj.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-burgundy/10 text-burgundy font-bold">
                            Y
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-darktext group-hover:text-berry transition-colors line-clamp-1">
                        {proj.title}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-medium capitalize">
                      <Icon className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{proj.type}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-2">
                    <StatusBadge status={proj.status} />
                  </td>
                  <td className="py-3.5 px-2 text-neutral-500">{proj.createdAt}</td>
                  <td className="py-3.5 px-2 text-right">
                    <Link
                      href={projectLink}
                      className="px-3.5 py-1.5 rounded-full bg-neutral-100 group-hover:bg-berry group-hover:text-white text-neutral-700 text-xs font-medium transition-colors inline-flex items-center gap-1"
                    >
                      <span>Open</span>
                      <ArrowUpRight className="w-3 h-3" />
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
