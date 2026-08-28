"use client";

import { useState } from "react";
import { ToggleLeft, ToggleRight, CheckCircle2 } from "lucide-react";

interface VoiceEngine {
  id: string;
  name: string;
  dialect: string;
  flag: string;
  latency: string;
  enabled: boolean;
}

const INITIAL_VOICES: VoiceEngine[] = [
  {
    id: "v_yo",
    name: "Yoruba Engine",
    dialect: "Yoruba (Nigeria 🇳🇬)",
    flag: "https://flagcdn.com/w40/ng.png",
    latency: "118 ms",
    enabled: true,
  },
  {
    id: "v_ig",
    name: "Igbo Engine",
    dialect: "Igbo (Nigeria 🇳🇬)",
    flag: "https://flagcdn.com/w40/ng.png",
    latency: "124 ms",
    enabled: true,
  },
  {
    id: "v_ha",
    name: "Hausa Engine",
    dialect: "Hausa (Nigeria 🇳🇬)",
    flag: "https://flagcdn.com/w40/ng.png",
    latency: "135 ms",
    enabled: true,
  },
  {
    id: "v_sw",
    name: "Swahili Engine",
    dialect: "Swahili (Kenya 🇰🇪)",
    flag: "https://flagcdn.com/w40/ke.png",
    latency: "140 ms",
    enabled: true,
  },
  {
    id: "v_pd",
    name: "Pidgin Engine",
    dialect: "Pidgin (Nigeria 🇳🇬)",
    flag: "https://flagcdn.com/w40/ng.png",
    latency: "110 ms",
    enabled: true,
  },
];

export function VoiceModelsStatus() {
  const [voices, setVoices] = useState<VoiceEngine[]>(INITIAL_VOICES);

  const toggleEngine = (id: string) => {
    setVoices((prev) =>
      prev.map((v) => (v.id === id ? { ...v, enabled: !v.enabled } : v))
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <h3 className="font-bold text-darktext text-base">African Voice Fleet</h3>
          <p className="text-xs text-neutral-500">Inference latency & toggle status.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {voices.map((v) => (
          <div
            key={v.id}
            className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
              v.enabled ? "bg-white border-neutral-200" : "bg-neutral-50 border-neutral-200 opacity-60"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <img src={v.flag} alt="flag" className="w-4 h-3 object-cover rounded-xs border" />
                <span className="font-semibold text-xs text-darktext">{v.name}</span>
              </div>
              <div className="text-[11px] text-neutral-500 font-mono">Latency: {v.latency}</div>
            </div>

            <button onClick={() => toggleEngine(v.id)}>
              {v.enabled ? (
                <ToggleRight className="w-6 h-6 text-berry" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-neutral-400" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
