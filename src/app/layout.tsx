// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/globals.css";
import React from "react";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Digimon Tree",
//   description: "A digimon evolution visualizer",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Digimon Tree - Visualizing Digimon Evolution</title>
        <meta
          name="description"
          content="Explore the evolution of Digimon through a visual and audio interface with the Digimon Tree project. Understand the complex evolution paths and more."
        />
        <meta
          name="keywords"
          content="Digimon, Digivolution, React, Next.js, Visualize Digimon, Evolution Tree, Frontend Development, TypeScript"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Digimon Tree - Visualizing Digimon Evolution"
        />
        <meta
          property="og:description"
          content="Explore the evolution of Digimon through a visual and audio interface with the Digimon Tree project. Understand the complex evolution paths and more."
        />
        <meta property="og:image" content="https://digimon-tree.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.534975c4.png&w=75&q=75" />
        <meta property="og:url" content="https://digimon-tree.netlify.app/" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Digimon Tree - Visualizing Digimon Evolution"
        />
        <meta
          name="twitter:description"
          content="Explore the evolution of Digimon through a visual and audio interface with the Digimon Tree project. Understand the complex evolution paths and more."
        />
        <meta name="twitter:image" content="https://digimon-tree.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.534975c4.png&w=75&q=75" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Digimon Tree",
              "description": "A visual and audio exploration of Digimon evolution.",
              "image": "https://digimon-tree.netlify.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.534975c4.png&w=75&q=75",
              "url": "https://digimon-tree.netlify.app/"
            }
          `}
        </script>
      </Head>
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
