"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
  height?: number;
}

export function Logo({ className, variant = "dark", height = 32 }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  const logoSrc = variant === "light" ? "/logo-white.svg" : "/logo.svg";

  return (
    <Link href="/" className={cn("flex items-center gap-2 group shrink-0", className)}>
      {!imgError ? (
        <img
          src={logoSrc}
          alt="YiCORA Logo"
          style={{ height: `${height}px` }}
          className="w-auto object-contain transition-transform group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback if user replaces file with custom format or non-existent path */
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-berry to-burgundy flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            Y
          </div>
          <span
            className={cn(
              "font-bold text-xl tracking-tight transition-colors font-heading",
              variant === "dark" ? "text-darktext group-hover:text-berry" : "text-white group-hover:text-pink-300"
            )}
          >
            YiCORA
          </span>
        </div>
      )}
    </Link>
  );
}
