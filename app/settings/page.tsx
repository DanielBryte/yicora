"use client";

import { useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { User, Mail, Shield, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("Amara Chukwu");
  const [email, setEmail] = useState("amara@yicora.com");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-darktext tracking-tight">Account Settings</h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Manage your personal profile, credentials, and default language preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-sm space-y-6">
          {saved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile settings saved successfully!</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-600 uppercase mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm text-darktext focus:outline-none focus:ring-2 focus:ring-berry/30"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex justify-end">
            <button
              type="submit"
              className="px-7 py-3 rounded-full bg-berry hover:bg-berry-hover text-white text-xs font-bold shadow-md active:scale-95 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
