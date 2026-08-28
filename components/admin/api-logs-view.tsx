"use client";

import { useState } from "react";
import { Terminal, Copy } from "lucide-react";

interface ApiLog {
  id: string;
  method: "GET" | "POST" | "DELETE";
  endpoint: string;
  statusCode: number;
  latency: string;
  user: string;
  timestamp: string;
}

const INITIAL_LOGS: ApiLog[] = [
  {
    id: "log_1",
    method: "POST",
    endpoint: "/api/video/dubbing",
    statusCode: 200,
    latency: "118 ms",
    user: "amara@nollywoodfilm.com",
    timestamp: "18:42:12",
  },
  {
    id: "log_2",
    method: "POST",
    endpoint: "/api/tts/generate",
    statusCode: 200,
    latency: "94 ms",
    user: "tunde@afrobeatstudio.ng",
    timestamp: "18:41:50",
  },
  {
    id: "log_3",
    method: "GET",
    endpoint: "/api/voices/models",
    statusCode: 200,
    latency: "24 ms",
    user: "nia@swahilipodcast.ke",
    timestamp: "18:41:10",
  },
  {
    id: "log_4",
    method: "POST",
    endpoint: "/api/music/compose",
    statusCode: 200,
    latency: "340 ms",
    user: "kofi@accracreative.gh",
    timestamp: "18:40:22",
  },
];

export function ApiLogsView() {
  const [logs] = useState<ApiLog[]>(INITIAL_LOGS);

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <h3 className="font-bold text-darktext text-base">API Request Logs</h3>
          <p className="text-xs text-neutral-500">Live HTTP request activity.</p>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-xl p-4 font-mono text-xs text-neutral-300 space-y-2 overflow-x-auto">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center justify-between gap-4 py-1 border-b border-neutral-800 text-[11px]">
            <div className="flex items-center gap-2.5">
              <span className="text-neutral-500">{log.timestamp}</span>
              <span className="font-bold text-pink-400">{log.method}</span>
              <span className="text-neutral-200">{log.endpoint}</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400">
              <span>{log.user}</span>
              <span className="text-emerald-400 font-semibold">200 OK</span>
              <span>{log.latency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
