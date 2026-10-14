"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import DashboardLayout from "@/app/dashboard/layout";
import { CheckCircle2, ImagePlus, LoaderCircle, LockKeyhole, Mail, Save, User, X } from "lucide-react";

type Profile = { full_name: string; avatar_url: string | null; email: string };

async function readProfileResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("The profile service returned an unexpected response. Refresh the page and try again.");
  }
  return response.json();
}

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<Profile>({ full_name: "", avatar_url: null, email: "" });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/settings/profile", { cache: "no-store" })
      .then(async (response) => {
        const result = await readProfileResponse(response);
        if (!response.ok) throw new Error(result.error || "Could not load your profile.");
        if (active) setProfile(result.profile);
      })
      .catch((loadError) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Could not load your profile.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(null);
      return;
    }
    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [avatarFile]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    if (!(["image/jpeg", "image/png", "image/webp"] as string[]).includes(file.type)) {
      setError("Choose a JPG, PNG, or WebP image.");
      event.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Your profile photo must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }
    setAvatarFile(file);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const formData = new FormData();
      formData.set("fullName", profile.full_name.trim());
      if (avatarFile) formData.set("avatar", avatarFile);
      const response = await fetch("/api/settings/profile", { method: "PATCH", body: formData });
      const result = await readProfileResponse(response);
      if (!response.ok) throw new Error(result.error || "Could not save your profile.");
      setProfile(result.profile);
      setAvatarFile(null);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };

  const avatarSrc = avatarPreview || profile.avatar_url;
  const initials = profile.full_name.trim().charAt(0).toUpperCase() || profile.email.charAt(0).toUpperCase() || "Y";

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-darktext">Account Settings</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage your personal profile and account details.</p>
        </header>

        <section className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-base font-semibold text-darktext">Profile</h2>
            <p className="mt-1 text-sm text-neutral-500">Your profile photo and name are visible across your workspace.</p>
          </div>

          {loading ? (
            <div className="flex min-h-48 items-center justify-center text-[#7130dc]" role="status" aria-label="Loading profile">
              <LoaderCircle className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="max-w-2xl space-y-6">
              {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</div>}
              {saved && <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Profile saved.</div>}

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700" htmlFor="settings-avatar">Profile photo</label>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[#f2edfb] text-2xl font-bold text-[#603ab7] ring-1 ring-[#e8e1f2]">
                    {avatarSrc ? <Image src={avatarSrc} alt="Your profile photo" fill sizes="80px" unoptimized className="object-cover" /> : initials}
                  </div>
                  <div className="space-y-2">
                    <input ref={fileInputRef} id="settings-avatar" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleAvatarChange} className="sr-only" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7130dc]/40">
                      <ImagePlus className="h-4 w-4 text-[#7130dc]" /> {avatarSrc ? "Change photo" : "Upload photo"}
                    </button>
                    {avatarFile && <button type="button" onClick={() => setAvatarFile(null)} className="ml-2 inline-flex min-h-10 items-center gap-1 rounded-full px-3 text-sm font-medium text-neutral-500 hover:bg-neutral-100"><X className="h-4 w-4" /> Remove selection</button>}
                    <p className="text-xs text-neutral-500">JPG, PNG, or WebP. Maximum 5 MB.</p>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="settings-name" className="mb-1.5 block text-sm font-medium text-neutral-700">Full name</label>
                <div className="relative">
                  <User aria-hidden="true" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input id="settings-name" type="text" maxLength={80} value={profile.full_name} onChange={(event) => setProfile((current) => ({ ...current, full_name: event.target.value }))} className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-10 pr-4 text-sm text-darktext focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-berry/40" />
                </div>
              </div>

              <div>
                <label htmlFor="settings-email" className="mb-1.5 block text-sm font-medium text-neutral-700">Email address</label>
                <div className="relative">
                  <Mail aria-hidden="true" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                  <input id="settings-email" type="email" value={profile.email} readOnly aria-readonly="true" className="w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-50 py-3 pl-10 pr-10 text-sm text-neutral-600" />
                  <LockKeyhole aria-hidden="true" className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                </div>
                <p className="mt-1.5 text-xs text-neutral-500">Your sign-in email can’t be changed here.</p>
              </div>

              <button type="submit" disabled={saving} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#7130dc] px-5 text-sm font-semibold text-white transition hover:bg-[#5f26bd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7130dc]/40 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60">
                {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Saving…" : "Save changes"}
              </button>
            </form>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}
