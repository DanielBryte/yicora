"use client";

import { useState } from "react";
import { ToggleLeft, ToggleRight, Save } from "lucide-react";

export function SystemSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowSignups, setAllowSignups] = useState(true);
  const [enableFaceChanger, setEnableFaceChanger] = useState(true);
  const [enableVoiceClone, setEnableVoiceClone] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div>
          <h3 className="font-bold text-darktext text-base">System Settings</h3>
          <p className="text-xs text-neutral-500">Configure system access and tool flags.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-xl bg-berry hover:bg-berry-hover text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{saved ? "Saved!" : "Save"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3">
          <h4 className="font-semibold text-xs text-darktext">Access Controls</h4>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 text-xs">
            <div>
              <div className="font-medium text-darktext">Maintenance Mode</div>
              <div className="text-[11px] text-neutral-500">Pause video & voice processing</div>
            </div>
            <button onClick={() => setMaintenanceMode(!maintenanceMode)}>
              {maintenanceMode ? (
                <ToggleRight className="w-7 h-7 text-amber-600" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-neutral-400" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 text-xs">
            <div>
              <div className="font-medium text-darktext">Allow Registrations</div>
              <div className="text-[11px] text-neutral-500">Enable new user signups</div>
            </div>
            <button onClick={() => setAllowSignups(!allowSignups)}>
              {allowSignups ? (
                <ToggleRight className="w-7 h-7 text-berry" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-neutral-400" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3">
          <h4 className="font-semibold text-xs text-darktext">Feature Flags</h4>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 text-xs">
            <div>
              <div className="font-medium text-darktext">AI Face Changer</div>
              <div className="text-[11px] text-neutral-500">Lip-sync visual alignment</div>
            </div>
            <button onClick={() => setEnableFaceChanger(!enableFaceChanger)}>
              {enableFaceChanger ? (
                <ToggleRight className="w-7 h-7 text-berry" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-neutral-400" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 text-xs">
            <div>
              <div className="font-medium text-darktext">AI Voice Clone</div>
              <div className="text-[11px] text-neutral-500">Custom voice training</div>
            </div>
            <button onClick={() => setEnableVoiceClone(!enableVoiceClone)}>
              {enableVoiceClone ? (
                <ToggleRight className="w-7 h-7 text-berry" />
              ) : (
                <ToggleLeft className="w-7 h-7 text-neutral-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
