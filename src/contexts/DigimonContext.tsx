"use client";

import { TDigimon } from "@/types/digimon";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import digimonShortData from "@/assets/digimon_short_data.json";

type TDigimonContext = {
  digimonResults?: TDigimon;
  setDigimonResults: (results: TDigimon) => void;
  digimonId: string;
  setDigimonId: (id: string) => void;
  currentDigimonName: string;
  setCurrentDigimonName: (name: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
  evolution: { condition: string; digimon: string } | null;
  setEvolution: (a: { condition: string; digimon: string } | null) => void;
  isLoading: boolean;
  setIsLoading: (a: boolean) => void;
};

const DigimonContext = createContext<TDigimonContext | undefined>(undefined);

export const useDigimonContext = () => {
  const context = useContext(DigimonContext);
  if (!context) {
    throw new Error(
      "useDigimonContext must be used inside a DigimonContextProvider"
    );
  }
  return context;
};

export const DigimonContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [digimonResults, setDigimonResults] = useState<TDigimon | undefined>(
    undefined
  );
  const [digimonId, setDigimonId] = useState("");
  const [currentDigimonName, setCurrentDigimonName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [evolution, setEvolution] = useState<{
    condition: string;
    digimon: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = useSearchParams()?.get("id");

  useEffect(() => {
    setTimeout(() => {
      const tempId = id ?? "1";
      setDigimonId(tempId);
      const result = digimonShortData.find(
        (digimonData) => digimonData.id.toString() === tempId
      );
      if (result) setCurrentDigimonName(result.name);
    });
  }, []);

  return (
    <DigimonContext.Provider
      value={{
        digimonResults,
        setDigimonResults,
        digimonId,
        setDigimonId,
        currentDigimonName,
        setCurrentDigimonName,
        isDarkMode,
        setIsDarkMode,
        evolution,
        setEvolution,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </DigimonContext.Provider>
  );
};
