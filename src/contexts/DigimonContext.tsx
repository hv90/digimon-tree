"use client";

import { TDigimon } from "@/types/digimon";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import digimonShortData from "@/assets/digimon_short_data.json";
import { IPlayerState } from "@/hooks/useYoutubeIframeApi";

type TDigiviceInfoFilter = "main" | "fields" | "description" | "skills";

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
  isPlaying: boolean;
  setIsPlaying: (a: boolean) => void;
  playerInstance: IPlayerState | null;
  setPlayerInstance: (a: IPlayerState | null) => void;
  musicCount: number;
  setMusicCount: Dispatch<SetStateAction<number>>;
  isSpeaking: boolean;
  setIsSpeaking: (a: boolean) => void;
  digiviceInfoFilter: TDigiviceInfoFilter;
  setDigiviceInfoFilter: (a: TDigiviceInfoFilter) => void;
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerInstance, setPlayerInstance] = useState<IPlayerState | null>(
    null
  );

  const [musicCount, setMusicCount] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [digiviceInfoFilter, setDigiviceInfoFilter] =
    useState<TDigiviceInfoFilter>("main");

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
        isPlaying,
        setIsPlaying,
        playerInstance,
        setPlayerInstance,
        digiviceInfoFilter,
        setDigiviceInfoFilter,
        isSpeaking,
        setIsSpeaking,
        musicCount,
        setMusicCount,
      }}
    >
      {children}
    </DigimonContext.Provider>
  );
};
