import type { Metadata } from "next";
import { Ubuntu, Ubuntu_Sans } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
  display: "swap",
});

const ubuntuSans = Ubuntu_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "YiCORA — AI Localization & Creative Infrastructure for Africa",
  description:
    "YiCORA helps African creators, filmmakers, musicians, brands and media companies create, translate and transform content across languages and audiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ubuntu.variable} ${ubuntuSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-offwhite text-darktext">
        {children}
      </body>
    </html>
  );
}
