import Image from "next/image";
import digivice from "@/assets/img/digivice.png";
import ButtonMask from "../ui/ButtonMask";
import digiEggCracking from "@/assets/img/digiegg-cracking.gif";
import digiviceShining from "@/assets/img/digivice-shining.gif";
import { Button } from "../ui/button";
import {
  Diamond,
  Minus,
  MoveUp,
  MoveDown,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  VolumeX,
} from "lucide-react";
import { RefObject, useState } from "react";
import { useYouTubePlayer } from "@/hooks/useYoutubeIframeApi";
import { Fade, Tooltip } from "@mui/material";
import { TDigimon } from "@/types/digimon";
import { useDigimonContext } from "@/contexts/DigimonContext";
import lightModePicture from "@/assets/img/Meramon.png";
import darkModePicture from "@/assets/img/Starmon.png";
import { toggleTheme } from "@/utils/theme";

const Digivice: React.FC<{
  playerDivRef: RefObject<HTMLDivElement | null>;
  onNextEvolutionClick?: () => void;
  onPriorEvolutionClick?: () => void;
  evolutionFilter: string;
  digimonResults?: TDigimon;
}> = ({
  playerDivRef,
  onNextEvolutionClick,
  onPriorEvolutionClick,
  evolutionFilter,
  digimonResults,
}) => {
  const { playVideo, pauseVideo, nextVideo, previousVideo } =
    useYouTubePlayer(playerDivRef);

  const { evolution, setEvolution, setIsDarkMode, isDarkMode } =
    useDigimonContext();

  const [musicCount, setMusicCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [digiviceInfoFilter, setDigiviceInfoFilter] = useState<
    "main" | "fields" | "description" | "skills"
  >("main");

  const isSpeakingCheck = () => {
    if (isSpeaking) {
      setIsSpeaking(false);
      window.speechSynthesis.cancel();
      return true;
    }
    return false;
  };

  const handlePlayPauseDescription = () => {
    if (isSpeakingCheck()) {
    } else {
      try {
        setIsSpeaking(true);
        const speech = (
          (
            digimonResults?.descriptions.find(
              (description) => description.language.toLowerCase() === "en_us"
            )?.description ?? ""
          ).match(new RegExp(`(.{1,${250}})([.]|$)`, "g")) ?? []
        )
          .map((chunk) => chunk.trim())
          .map((chunk) => new SpeechSynthesisUtterance(chunk));

        speech.forEach(
          (chunk, index) =>
            (chunk.onend =
              index + 1 !== speech.length
                ? () => {
                    window.speechSynthesis.speak(speech[index + 1]);
                  }
                : null)
        );

        window.speechSynthesis.cancel();

        window.speechSynthesis.speak(speech[0]);
      } catch (e) {
        console.error("error: ", e);
      }
    }
  };

  const handlePlayPauseAction = () => {
    isSpeakingCheck();

    if (isPlaying) {
      setIsPlaying(false);
      pauseVideo();
    } else {
      setIsPlaying(true);
      playVideo();
    }
  };

  const handlePreviousVideo = () => {
    isSpeakingCheck();

    if (musicCount > 0) {
      setMusicCount((before) => before - 1);
    }
    setIsPlaying(true);
    previousVideo();
  };

  const handleNextVideo = () => {
    isSpeakingCheck();

    if (musicCount < 8) {
      setMusicCount((before) => before + 1);
    }
    setIsPlaying(true);
    nextVideo();
  };

  console.log('dark mode: ', isDarkMode)

  return (
    <div
      key={isDarkMode + ""}
      className="flex items-center justify-center w-full md:w-5/6 h-full"
    >
      <div className="relative max-h-[calc(100vh-200px)]">
        <Image
          className="landscape:w-auto w-[clamp(250px,_100%,_300px)] xl:w-full"
          style={{ maxHeight: "inherit" }}
          alt="digivice"
          src={digivice}
        />
        <div
          className="landscape:w-auto w-[clamp(250px,_100%,_300px)] xl:w-full absolute top-0 "
          style={{ maxHeight: "inherit" }}
        >
          <Image className="w-full invisible" alt="digivice" src={digivice} />
          <div className="h-full w-full absolute top-0 z-2">
            <div className="w-full invisible bg-yellow-300 h-1/3" />
            <div className="w-1/2 m-auto h-1/3">
              <div className="w-full h-4/6">
                <div className="w-full text-black text-center font-mono max-h-full overflow-x-hidden overflow-y-auto overscroll-none scrollbar scrollbar-thumb-blue-100 scrollbar-track-transparent xl:text-xs 2xl:text-lg">
                  {evolution === null && (
                    <>
                      <p>
                        <strong className="break-words">
                          {digimonResults?.name}
                        </strong>
                      </p>
                      {digiviceInfoFilter === "description" &&
                        "speechSynthesis" in window && (
                          <Button
                            className="hover:bg-blue-100"
                            variant={"ghost"}
                            size={"icon"}
                            onClick={handlePlayPauseDescription}
                          >
                            {isSpeaking ? <VolumeX /> : <Volume1 />}
                          </Button>
                        )}
                      <br />
                    </>
                  )}
                  {evolution !== null ? (
                    <>
                      <>
                        Condition to
                        {evolutionFilter === "next" ? (
                          <div className="grid-cols-1 grid-rows-3 break-words">
                            <strong>{digimonResults?.name}</strong>
                            <div className="flex justify-center">
                              <MoveDown />
                            </div>
                            <strong>{evolution.digimon}</strong>
                          </div>
                        ) : (
                          <div className="grid-cols-1 grid-rows-3 break-words">
                            <strong>{digimonResults?.name}</strong>
                            <div className="flex justify-center">
                              <MoveUp />
                            </div>
                            <strong>{evolution.digimon}</strong>
                          </div>
                        )}
                        :
                      </>
                      <>
                        {evolution.condition.length === 0 ? (
                          <p className="flex justify-center">
                            <Minus />
                          </p>
                        ) : (
                          <p>{evolution.condition}</p>
                        )}
                      </>
                    </>
                  ) : (
                    <>
                      {digiviceInfoFilter === "main" && (
                        <>
                          <p>
                            &lt;
                            {digimonResults?.levels
                              .map((level) => level.level)
                              .join(", ")}
                            &gt;
                          </p>
                          <p>Year: {digimonResults?.releaseDate}</p>
                          <p>
                            [
                            {digimonResults?.attributes
                              .map((attribute) => attribute.attribute)
                              .join(", ")}
                            ]
                          </p>
                          <p>
                            [
                            {digimonResults?.types
                              .map((type) => type.type)
                              .join(", ")}
                            ]
                          </p>
                        </>
                      )}
                      {digiviceInfoFilter === "fields" && (
                        <div className="flex justify-center flex-wrap">
                          {digimonResults?.fields.map((field) => (
                            <Tooltip title={field.field} key={field.id}>
                              <div className=" h-1/3 flex justify-center">
                                <img
                                  className=" h-1/3 mr-3 mb-3"
                                  src={field.image}
                                  alt={field.field}
                                />
                              </div>
                            </Tooltip>
                          ))}
                        </div>
                      )}
                      {/* <br /> */}
                      {digiviceInfoFilter === "description" && (
                        <>
                          <p>
                            {
                              digimonResults?.descriptions.find(
                                (description) =>
                                  description.language.toLowerCase() === "en_us"
                              )?.description
                            }
                          </p>
                        </>
                      )}
                      {/* <br /> */}
                      {digiviceInfoFilter === "skills" && (
                        <ul className="text-start ml-3">
                          {digimonResults?.skills.map((skill) => (
                            <li key={skill.id}>
                              <strong className="flex items-center">
                                <Diamond
                                  strokeWidth={3}
                                  className="mr-2 w-1/12"
                                />
                                {skill.translation.length > 0
                                  ? skill.translation
                                  : skill.skill}
                              </strong>
                              <p>{skill.description}</p>
                              <br />
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                  {
                    /* evolution === null &&  */ <>
                      <br />
                      <p className="break-words">
                        {/* From: */}[
                        {
                          digimonResults?.descriptions.find(
                            (description) =>
                              description.language.toLowerCase() === "en_us"
                          )?.origin
                        }
                        ]
                      </p>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
          <Button
            style={{
              bottom: "34.7%",
              left: "27.1%",
              borderRadius: "20%",
              width: "10%",
              height: "2.5%",
            }}
            variant={"default"}
            size={"icon"}
            className="bg-blue-100 hover:bg-blue-100 opacity-70 hover:opacity-75 absolute overflow-hidden flex justify-center text-green-foreground"
            onClick={() => {
              setEvolution(null);
              setDigiviceInfoFilter("main");
            }}
            disabled={evolution === null && digiviceInfoFilter === "main"}
          >
            1
          </Button>
          <Button
            style={{
              bottom: "34.7%",
              left: "39.1%",
              borderRadius: "20%",
              width: "10%",
              height: "2.5%",
            }}
            variant={"default"}
            size={"icon"}
            className="bg-blue-100 hover:bg-blue-100 opacity-70 hover:opacity-75 absolute overflow-hidden flex justify-center text-green-foreground"
            onClick={() => {
              setEvolution(null);
              setDigiviceInfoFilter("fields");
            }}
            disabled={evolution === null && digiviceInfoFilter === "fields"}
          >
            2
          </Button>
          <Button
            style={{
              bottom: "34.7%",
              left: "51%",
              borderRadius: "20%",
              width: "10%",
              height: "2.5%",
            }}
            variant={"default"}
            size={"icon"}
            className="bg-blue-100 hover:bg-blue-100 opacity-70 hover:opacity-75 absolute overflow-hidden flex justify-center text-green-foreground"
            onClick={() => {
              setEvolution(null);
              setDigiviceInfoFilter("description");
            }}
            disabled={
              evolution === null && digiviceInfoFilter === "description"
            }
          >
            3
          </Button>
          <Button
            style={{
              bottom: "34.7%",
              left: "62.5%",
              borderRadius: "20%",
              width: "10%",
              height: "2.5%",
            }}
            variant={"default"}
            size={"icon"}
            className="bg-blue-100 hover:bg-blue-100 opacity-70 hover:opacity-75 absolute overflow-hidden flex justify-center text-green-foreground"
            onClick={() => {
              setEvolution(null);
              setDigiviceInfoFilter("skills");
            }}
            disabled={evolution === null && digiviceInfoFilter === "skills"}
          >
            4
          </Button>

          <Button
            style={{
              bottom: "25.3%",
              left: "16%",
              // aspectRatio: 1,
              width: "13.6667%",
              height: "7.6667%",
            }}
            variant={"default"}
            size={"icon"}
            className="absolute overflow-hidden flex justify-center rounded-full "
            onClick={onPriorEvolutionClick}
            disabled={evolutionFilter === "prior"}
          >
            <ButtonMask
              className="absolute"
              style={{
                // aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                className="object-cover"
                unoptimized
                alt="button"
                src={digiEggCracking}
              />
            </ButtonMask>
          </Button>
          <Button
            disabled={evolutionFilter === "next"}
            onClick={onNextEvolutionClick}
            style={{
              bottom: "25.3%",
              right: "16%",
              // aspectRatio: 1,
              width: "13.6667%",
              height: "7.6667%",
            }}
            variant={"default"}
            size={"icon"}
            className="absolute overflow-hidden flex justify-center rounded-full "
          >
            <ButtonMask
              className="absolute"
              style={{
                // aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                className="object-cover"
                unoptimized
                alt="button"
                src={digiviceShining}
              />
            </ButtonMask>
          </Button>

          <Button
            onClick={handlePlayPauseAction}
            style={{
              bottom: "14.3%",
              right: "37%",
              // aspectRatio: 1,
              width: "25.6667%",
              height: "14.6667%",
              // backgroundColor: "hsl(222deg 47% 11% / 75%)",
            }}
            variant={"default"}
            size={"icon"}
            className="absolute overflow-hidden flex justify-center items-center rounded-full bg-[hsla(222,47%,11%,75%)] hover:bg-[hsla(222,47%,11%,90%)]"
          >
            <span className="glow"></span>
            <ButtonMask
              className="absolute items-center justify-center"
              style={{
                // aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <>
                <Fade className="absolute text-white !size-1/4" in={!isPlaying}>
                  <Play />
                </Fade>

                <Fade className="absolute text-white !size-1/4" in={isPlaying}>
                  <Pause />
                </Fade>
              </>
            </ButtonMask>
          </Button>
          <Button
            onClick={handlePreviousVideo}
            disabled={musicCount === 0}
            style={{
              bottom: "14%",
              left: "16%",
              // aspectRatio: 1,
              width: "13.6667%",
              height: "7.6667%",
            }}
            variant={"default"}
            size={"icon"}
            className="absolute overflow-hidden flex justify-center rounded-full bg-[hsla(222,47%,11%,75%)] hover:bg-[hsla(222,47%,11%,90%)]"
          >
            <ButtonMask
              className="absolute items-center"
              style={{
                // aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <SkipBack className="!size-1/3 text-white" />
            </ButtonMask>
          </Button>
          <Button
            disabled={musicCount === 7}
            onClick={handleNextVideo}
            style={{
              bottom: "14%",
              right: "16%",
              // aspectRatio: 1,
              width: "13.6667%",
              height: "7.6667%",
            }}
            variant={"default"}
            size={"icon"}
            className="absolute overflow-hidden flex justify-center rounded-full bg-[hsla(222,47%,11%,75%)] hover:bg-[hsla(222,47%,11%,90%)]"
          >
            <ButtonMask
              className="absolute items-center"
              style={{
                // aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <SkipForward className="!size-1/3 text-white" />
            </ButtonMask>
          </Button>

          <Button
            disabled={isDarkMode}
            onClick={() => {
              toggleTheme(() => {
                setIsDarkMode(true);
              });
            }}
            style={{
              bottom: "4.1%",
              left: "34.25%",
              // aspectRatio: 1,
              width: "11%",
              height: "6%",
            }}
            variant={"default"}
            size={"icon"}
            className="absolute overflow-hidden  opacity-70 hover:opacity-75 flex justify-center rounded-full"
          >
            <ButtonMask
              className="absolute items-center"
              style={{
                // aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <Image alt="dark mode" src={darkModePicture} />
            </ButtonMask>
          </Button>
          <Button
            disabled={!isDarkMode}
            onClick={() => {
              toggleTheme(() => {
                setIsDarkMode(false);
              });
            }}
            style={{
              bottom: "4.1%",
              right: "34.25%",
              // aspectRatio: 1,
              width: "11%",
              height: "6%",
            }}
            variant={"default"}
            size={"icon"}
            className="absolute overflow-hidden  opacity-70 hover:opacity-75 flex justify-center rounded-full"
          >
            <ButtonMask
              className="absolute items-center"
              style={{
                // aspectRatio: 1,
                width: "100%",
                height: "100%",
              }}
            >
              <Image alt="dark mode" src={lightModePicture} />
            </ButtonMask>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Digivice;
