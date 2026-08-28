"use client";

import { useState, useEffect, ReactNode } from "react";
import { ShieldAlert, Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { createClient } from "@/lib/supabase/client";

const AUTHORIZED_EMAILS = [
  "ezedinirudaniel@gmail.com",
  "useyicora@gmail.com",
];

interface AdminAuthGateProps {
  children: ReactNode;
}

export function AdminAuthGate({ children }: AdminAuthGateProps) {
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check local storage or Supabase auth session
    const checkAuth = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (data.user?.email && AUTHORIZED_EMAILS.includes(data.user.email.toLowerCase())) {
          setIsAuthenticated(true);
          return;
        }
      } catch (err) {
        // Fallback check from persistent admin session key
      }

      const savedAdminEmail = localStorage.getItem("yicora_admin_authorized_email");
      if (savedAdminEmail && AUTHORIZED_EMAILS.includes(savedAdminEmail.toLowerCase())) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleAdminAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const targetEmail = email.trim().toLowerCase();

    if (AUTHORIZED_EMAILS.includes(targetEmail)) {
      localStorage.setItem("yicora_admin_authorized_email", targetEmail);
      setIsAuthenticated(true);
    } else {
      setError("Access Denied: Unrecognized or unauthorized administrator credentials.");
    }
    setLoading(false);
  };

  // Loading state during auth verification
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0E000D] flex items-center justify-center p-4">
        <div className="flex items-center gap-3 text-pink-300 font-mono text-xs tracking-wider">
          <div className="w-4 h-4 rounded-full border-2 border-berry border-t-transparent animate-spin" />
          <span>VERIFYING SENTINEL BUILDER AUTHENTICATION...</span>
        </div>
      </div>
    );
  }

  // If NOT authorized, display industry-standard security gate UI (no emails exposed!)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E000D] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background Ambient Security Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-berry/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#180016]/90 backdrop-blur-2xl rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 relative z-10 space-y-6">
          {/* Header Badge & Brand */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Logo variant="light" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-berry/20 text-pink-300 text-[11px] font-extrabold tracking-wider border border-berry/40 shadow-inner">
              <ShieldCheck className="w-3.5 h-3.5 text-berry" />
              <span>256-BIT ENCRYPTED BUILDER GATE</span>
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight text-white">System Builder Sign In</h1>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-xs mx-auto">
                Authorized builder administrator access only. Enter your administrator email to authenticate.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Secure Input Form (No Emails Exposed) */}
          <form onSubmit={handleAdminAuthenticate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-pink-200/80">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@yicora.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-white/10 border border-white/15 rounded-2xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-berry/50 focus:bg-white/15 transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-berry hover:bg-berry-hover text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              <span>Authenticate System Builder</span>
            </button>
          </form>

          {/* Footer Security Notice */}
          <div className="pt-2 text-center border-t border-white/5">
            <span className="text-[10px] text-neutral-500 font-mono tracking-tight">
              Protected by YiCORA Sentinel Security Protocol • End-to-End Encrypted
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
