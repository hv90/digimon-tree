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
  title: "Digimon Tree",
  description: "A digimon evolution visualizer",
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
          <div className="w-full h-screen grid grid-rows-[minmax(150px,_200px)_1fr] px-8 items-center md:items-start">
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
