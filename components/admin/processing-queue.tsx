"use client";

import { useState } from "react";
import { Video, Mic, Music, CheckCircle2, Clock, RefreshCw } from "lucide-react";

interface QueueTask {
  id: string;
  type: "AI Video Dubbing" | "AI Text-to-Speech" | "AI Music Box";
  creator: string;
  language: string;
  status: "Completed" | "Processing" | "In Queue";
  timeAgo: string;
}

const INITIAL_QUEUE: QueueTask[] = [
  {
    id: "task_901",
    type: "AI Video Dubbing",
    creator: "Amara Chukwu",
    language: "Yoruba 🇳🇬",
    status: "Completed",
    timeAgo: "2m ago",
  },
  {
    id: "task_902",
    type: "AI Text-to-Speech",
    creator: "Tunde Bakare",
    language: "Hausa 🇳🇬",
    status: "Processing",
    timeAgo: "1m ago",
  },
  {
    id: "task_903",
    type: "AI Music Box",
    creator: "Kofi Mensah",
    language: "Pidgin 🇳🇬",
    status: "Completed",
    timeAgo: "5m ago",
  },
  {
    id: "task_904",
    type: "AI Video Dubbing",
    creator: "Nia Osei",
    language: "Swahili 🇰🇪",
    status: "In Queue",
    timeAgo: "Just now",
  },
];

export function ProcessingQueue() {
  const [tasks] = useState<QueueTask[]>(INITIAL_QUEUE);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <h3 className="font-bold text-darktext text-base">Task Processing Queue</h3>
          <p className="text-xs text-neutral-500">Live AI generation status.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-darktext">
          <thead className="text-neutral-500 font-semibold uppercase text-[10px] border-b border-neutral-200">
            <tr>
              <th className="py-2.5 px-3">Tool</th>
              <th className="py-2.5 px-3">Creator</th>
              <th className="py-2.5 px-3">Language</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-neutral-50 transition-colors">
                <td className="py-3 px-3 font-semibold text-darktext">
                  <div className="flex items-center gap-2">
                    {task.type === "AI Video Dubbing" && <Video className="w-3.5 h-3.5 text-berry" />}
                    {task.type === "AI Text-to-Speech" && <Mic className="w-3.5 h-3.5 text-blue-600" />}
                    {task.type === "AI Music Box" && <Music className="w-3.5 h-3.5 text-purple-600" />}
                    <span>{task.type}</span>
                  </div>
                </td>

                <td className="py-3 px-3 text-neutral-600 font-medium">{task.creator}</td>

                <td className="py-3 px-3 font-medium">{task.language}</td>

                <td className="py-3 px-3">
                  {task.status === "Completed" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Completed</span>
                    </span>
                  )}
                  {task.status === "Processing" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-pink-50 text-berry font-medium text-[11px]">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Processing</span>
                    </span>
                  )}
                  {task.status === "In Queue" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-medium text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>Queued</span>
                    </span>
                  )}
                </td>

                <td className="py-3 px-3 text-right text-neutral-400">{task.timeAgo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
