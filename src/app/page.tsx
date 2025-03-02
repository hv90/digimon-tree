"use client";

import { defineCustomElements } from "graph-ui/loader";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DigimonContextProvider } from "@/contexts/DigimonContext";
import Header from "@/components/Header";
import Search from "@/components/Search";

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  const Results = dynamic(() => import("../components/Results"), { ssr: false });

  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <DigimonContextProvider>
        <Header>
          <Search />
        </Header>
        <main className="w-full h-full pb-8 row-start-2">
          <Results />
        </main>
        <footer></footer>
      </DigimonContextProvider>
    </QueryClientProvider>
  );
}
