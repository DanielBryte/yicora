import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Urbanist } from "next/font/google";
import { AuthCodeListener } from "@/components/shared/auth-code-listener";
import "./globals.css";

const urbanist = Urbanist({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YiCORA - AI Localization & Creative Infrastructure for Africa",
  description:
    "YiCORA helps African creators, filmmakers, musicians, brands and media companies create, translate and transform content across languages and audiences.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-offwhite text-darktext">
        <Suspense fallback={null}>
          <AuthCodeListener />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
