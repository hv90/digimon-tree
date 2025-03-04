import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digimon Tree - Visualizing Digimon Evolution",
  description:
    "Explore the evolution of Digimon through a visual and audio interface with the Digimon Tree project.",
  keywords: [
    "Digimon",
    "Digivolution",
    "React",
    "Next.js",
    "Visualize Digimon",
    "Evolution Tree",
    "Frontend Development",
    "TypeScript",
  ],
  openGraph: {
    title: "Digimon Tree - Visualizing Digimon Evolution",
    description:
      "Explore the evolution of Digimon through a visual and audio interface with the Digimon Tree project.",
    url: "https://digimon-tree.netlify.app/",
    images: [
      {
        url: "https://digimon-tree.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.534975c4.png&w=75&q=75",
        width: 75,
        height: 75,
        alt: "Digimon Evolution Tree",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digimon Tree - Visualizing Digimon Evolution",
    description:
      "Explore the evolution of Digimon through a visual and audio interface with the Digimon Tree project.",
    images: [
      {
        url: "https://digimon-tree.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.534975c4.png&w=75&q=75",
        width: 75,
        height: 75,
        alt: "Digimon Evolution Tree",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-blue-100 dark:bg-zinc-900 md:overflow-y-hidden`}
      >
        <div className="flex justify-items-center max-h-screen h-screen font-[family-name:var(--font-geist-sans)]">
          <div className="w-full h-screen grid grid-rows-[1fr_1fr_1fr] 2xl:grid-rows-[minmax(150px,200px)_1fr_200px] gap-2 px-8 items-center md:items-start">
            {children}
          </div>
        </div>
        <script
          id="youtube_iframe"
          src="https://www.youtube.com/iframe_api"
          async={true}
        ></script>
      </body>
    </html>
  );
}
