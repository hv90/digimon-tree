import { useDigimonContext } from "@/contexts/DigimonContext";
import { useCallback, useEffect } from "react";

export interface IPlayerState {
  playVideoAt: (...args: unknown[]) => unknown;
  playVideo: (...args: unknown[]) => unknown;
  nextVideo: (...args: unknown[]) => unknown;
  previousVideo: (...args: unknown[]) => unknown;
  pauseVideo: (...args: unknown[]) => unknown;
  stopVideo: (...args: unknown[]) => unknown;
  mute: (...args: unknown[]) => unknown;
  unMute: (...args: unknown[]) => unknown;
}
export const useYouTubePlayer = () => {
  const { setPlayerInstance } = useDigimonContext();

  const onYouTubeIframeAPIReady = useCallback(() => {
    if (window.YT) {
      try {
        const player = new window["YT"].Player(
          document.getElementById("player"),
          {
            playerVars: {
              listType: "playlist",
              list: "PLGntPRWLY54JZLSSqxe_1Mr5wR01L3qMr",
            },
            events: {
              onReady: () => {
                console.log("Player is ready");
                setPlayerInstance(player);
              },
              onStateChange: (event: unknown) => {
                console.log("Player state changed", event);
              },
            },
          }
        );
      } catch {
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    if (!window["YT"]) {
      const script = document.getElementById("youtube_iframe");
      if (script) {
        script.onload = onYouTubeIframeAPIReady;
      }
    } else {
      onYouTubeIframeAPIReady();
    }
  }, []);
};
