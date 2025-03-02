"use client";

import { useDigimonContext } from "@/contexts/DigimonContext";
import digimonShortData from "@/assets/digimon_short_data.json";
import { router } from "@/utils/router";
import { TDigiVolution } from "@/types/digimon";
import { useEffect, useRef, useState } from "react";
import Digivice from "../Digivice";
import "./style.css";
import { toggleTheme } from "@/utils/theme";

const Results: React.FC = () => {
  const {
    digimonResults,
    setDigimonId,
    setCurrentDigimonName,
    setIsDarkMode,
    isDarkMode,
    setEvolution,
    isLoading,
    setIsLoading,
  } = useDigimonContext();

  const [filterEvolutionDirection, setFilterEvolutionDirection] = useState<
    "prior" | "next"
  >("next");

  const playerDivRef = useRef<HTMLDivElement>(null);

  const onClickHandler = (clickedNodeId: number) => {
    if (clickedNodeId) {
      const url = new URL(window.location.origin);
      url.searchParams.append("id", clickedNodeId.toString());
      router.push(url.toString());
      const result = digimonShortData.find(
        (digimonData) => digimonData.id.toString() === clickedNodeId.toString()
      );
      if (result) setCurrentDigimonName(result.name);

      setDigimonId(clickedNodeId.toString());
      setTimeout(() => {
        setEvolution(null);
      }, 500);
    }
  };

  const onBlurHandler = () => {
    const container = document.getElementById("mynetwork");
    if (container) {
      container.style.cursor = "default";
    }
    // setEvolution(null);
  };

  const onHoverHandler = (hoveredNodeId: number) => {
    if (digimonResults) {
      const container = document.getElementById("mynetwork");
      if (container) {
        container.style.cursor = "pointer";
      }

      const evolution = (
        filterEvolutionDirection === "next"
          ? digimonResults.nextEvolutions
          : digimonResults.priorEvolutions
      ).find((digimon) => digimon.id === hoveredNodeId);

      setEvolution(
        evolution
          ? {
              condition: evolution.condition,
              digimon: evolution.digimon,
            }
          : null
      );
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    setTimeout(() => {
      if (localTheme && localTheme === "dark") {
        toggleTheme(() => {
          setIsDarkMode(true);
        });
      } else {
        toggleTheme(() => {
          setIsDarkMode(false);
        });
      }
      // setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="w-full h-full md:max-h-[calc(100vh-200px)] relative bg-foreground dark:bg-black">
      <div className="w-full h-full flex flex-col-reverse md:flex-row md:justify-center">
        {isLoading ? (
          <div className="animate-pulse w-3/4">
            <div className="bg-gray-300 h-full w-full"></div>
          </div>
        ) : (
          <div className="circuit w-full md:w-1/2 xl:w-3/4 h-1/2 md:h-full">
            {digimonResults && (
              <custom-graph
                key={
                  digimonResults.name + filterEvolutionDirection + isDarkMode
                }
                class="h-full w-3/4"
                fnHover={onHoverHandler}
                fnTouchStart={onHoverHandler}
                fnBlur={onBlurHandler}
                fnTouchEnd={onBlurHandler}
                fnClick={onClickHandler}
                nodes={[
                  {
                    id: 0,
                    image: digimonResults.images[0].href,
                    label: digimonResults.name,
                    shape: "circularImage",
                  },
                  ...(filterEvolutionDirection === "next"
                    ? digimonResults.nextEvolutions
                    : digimonResults.priorEvolutions
                  )
                    .reduce((stack, currData) => {
                      if (!stack.some((data) => data.id === currData.id)) {
                        stack.push(currData);
                      }
                      return stack;
                    }, [] as TDigiVolution)
                    .map((evolution) => {
                      const result = {
                        id: evolution.id,
                        image: evolution.image,
                        label: evolution.digimon,
                        shape: "circularImage" as "circularImage",
                      };
                      return result;
                    }),
                ]}
                edges={(filterEvolutionDirection === "next"
                  ? digimonResults.nextEvolutions
                  : digimonResults.priorEvolutions
                ).map((evolution) => ({
                  from: 0,
                  to: evolution.id,
                }))}
                options={{
                  interaction: {
                    hover: true,
                  },
                  nodes: {
                    borderWidth: 3, // Largura da borda
                    borderWidthSelected: 5, // Largura da borda quando selecionado
                    color: {
                      border: "#2B7CE9", // Cor da borda
                      background: "#FFFFFF", // Cor de fundo (se aplicável)
                      highlight: {
                        border: "#2B7CE9",
                        background: "#D2E5FF",
                      },
                      hover: {
                        border: "#2B7CE9",
                        background: "#D2E5FF",
                      },
                    },
                    font: {
                      color: isDarkMode ? "rgb(255 255 170)" : "rgb(31 41 55)",
                    },
                    shapeProperties: {
                      useImageSize: false, // Usar tamanho original da imagem
                      interpolation: true, // Se false, a imagem não é redimensionada de forma suave
                    },
                  },
                }}
              ></custom-graph>
            )}
          </div>
        )}
        <div className="w-full md:w-1/2 xl:w-1/4 h-1/2 md:h-full flex justify-center items-center select-none">
          {isLoading ? (
            <div className="animate-pulse w-full h-full">
              <div className="bg-gray-700 h-full w-full"></div>
            </div>
          ) : (
            <Digivice
              digimonResults={digimonResults}
              evolutionFilter={filterEvolutionDirection}
              onNextEvolutionClick={() => {
                if (filterEvolutionDirection === "prior") {
                  setFilterEvolutionDirection("next");
                }
              }}
              onPriorEvolutionClick={() => {
                if (filterEvolutionDirection === "next") {
                  setFilterEvolutionDirection("prior");
                }
              }}
              playerDivRef={playerDivRef}
            />
          )}
        </div>
      </div>
      <div className="absolute md:bottom-0 w-full md:w-1/6 2xl:w-1/4 h-1/3 xl:h-1/2 flex items-start md:items-end select-none">
        <div className="w-full h-2/3" ref={playerDivRef} id="player" />
      </div>
    </div>
  );
};

export default Results;
