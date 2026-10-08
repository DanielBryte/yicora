"use client";

import { useState } from "react";
import DashboardLayout from "@/app/dashboard/layout";
import { User, Mail, Save, CheckCircle2 } from "lucide-react";

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
      <div className="w-full space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-darktext tracking-tight">Account Settings</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your personal profile and account details.</p>
        </header>

        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-6">
          <div>
            <h2 className="text-base font-semibold text-darktext">Profile</h2>
            <p className="text-sm text-neutral-500 mt-1">The name and email associated with your YiCORA account.</p>
          </div>
          <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
            {saved && (
              <div role="status" className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Profile details saved.
              </div>
            )}
            <div>
              <label htmlFor="settings-name" className="block text-sm font-medium text-neutral-700 mb-1.5">Full name</label>
              <div className="relative">
                <User aria-hidden="true" className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input id="settings-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-lg text-sm text-darktext focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/40" />
              </div>
            </div>
            <div>
              <label htmlFor="settings-email" className="block text-sm font-medium text-neutral-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail aria-hidden="true" className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input id="settings-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-neutral-300 rounded-lg text-sm text-darktext focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/40" />
              </div>
              <p className="text-xs text-neutral-500 mt-1.5">Used for account notices and receipts.</p>
            </div>
            <div className="pt-2">
              <button type="submit" className="px-4 py-2.5 rounded-lg bg-berry hover:bg-berry-hover text-white text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/40 focus-visible:ring-offset-2 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save changes
              </button>
            </div>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}
