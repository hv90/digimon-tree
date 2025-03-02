"use client";

import { defineCustomElements } from "graph-ui/loader";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DigimonContextProvider } from "@/contexts/DigimonContext";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Link from "next/link";
import Image from "next/image";
import loveIcon from "@/assets/img/pixel-art-heart-icon-free.png";
import Footer from "@/components/Footer";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  const Results = dynamic(() => import("../components/Results"), {
    ssr: false,
  });

  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <DigimonContextProvider>
        <Header>
          <Search />
        </Header>
        <main className="w-full h-full row-start-2">
          <Results />
        </main>
        <Footer />
      </DigimonContextProvider>
    </QueryClientProvider>
  );
}
