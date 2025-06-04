import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LetterGlitch from "@/components/LetterGlitch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gabriel Bendix",
  description: "Portfolio website of Gabriel Bendix, a Computer Engineering Student",
  icons: {
    icon: "/images/favicon.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*Suppress Hydration Warning Quelled*/}
      <body suppressHydrationWarning={true}
        className={`${inter.className} antialiased bg-black text-white`}
      >
        {/* LetterGlitch fixed to fill viewport (z-index 0) */}
        <div className="fixed inset-0 w-full h-full z-0">
          <LetterGlitch
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>

        {/* Page content (children) on top of glitch (z-index 10) */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
