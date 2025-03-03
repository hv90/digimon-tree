import { RefObject, useCallback, useEffect, useState } from "react";

export const useYouTubePlayer = (
  playerRef: RefObject<HTMLDivElement | null>
) => {
  const [playerInstance, setPlayerInstance] = useState<{
    playVideoAt:  (...args: unknown[]) => unknown;
    playVideo:  (...args: unknown[]) => unknown;
    nextVideo:  (...args: unknown[]) => unknown;
    previousVideo:  (...args: unknown[]) => unknown;
    pauseVideo:  (...args: unknown[]) => unknown;
    stopVideo:  (...args: unknown[]) => unknown;
    mute:  (...args: unknown[]) => unknown;
    unMute:  (...args: unknown[]) => unknown;
  } | null>(null);

  const onYouTubeIframeAPIReady = useCallback(() => {
    if (playerRef.current && window.YT) {
      try {
        const player = new window["YT"].Player(playerRef.current, {
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
        });
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

  const playPlaylist = (index?: number) => {
    if (playerInstance) {
      if (typeof index === "number") {
        playerInstance.playVideoAt(index); // Reproduzir vídeo específico da playlist
      } else {
        playerInstance.playVideo(); // Reproduzir playlist a partir do início
      }
    }
  };

  const nextVideo = () => {
    if (playerInstance) {
      playerInstance.nextVideo(); // Próximo vídeo da playlist
    }
  };

  const previousVideo = () => {
    if (playerInstance) {
      playerInstance.previousVideo(); // Vídeo anterior da playlist
    }
  };

  const playVideo = () => {
    if (playerInstance) {
      playerInstance.playVideo();
    }
  };

  const pauseVideo = () => {
    if (playerInstance) {
      playerInstance.pauseVideo();
    }
  };

  const stopVideo = () => {
    if (playerInstance) {
      playerInstance.stopVideo();
    }
  };

  const muteVideo = () => {
    if (playerInstance) {
      playerInstance.mute();
    }
  };

  const unMuteVideo = () => {
    if (playerInstance) {
      playerInstance.unMute();
    }
  };

  return {
    playerInstance,
    playVideo,
    pauseVideo,
    stopVideo,
    muteVideo,
    unMuteVideo,
    playPlaylist,
    nextVideo,
    previousVideo,
  };
};
