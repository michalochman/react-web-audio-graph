import React, { useCallback, useMemo } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  children: React.ReactNode;
}

function Audio({ children }: Props) {
  const context = useMemo(() => {
    try {
      if (!window.AudioContext) {
        // @ts-ignore
        window.AudioContext = window.webkitAudioContext;
      }

      return new window.AudioContext();
    } catch {}
  }, []);

  const resume = useCallback(() => {
    if (context?.state === "suspended") {
      context.resume();
    }
  }, [context]);

  if (!context) {
    return <div>Sorry, but the Web Audio API is not supported by your browser.</div>;
  }

  return (
    <div onClick={resume}>
      <AudioContext.Provider value={context}>{children}</AudioContext.Provider>
    </div>
  );
}

export default Audio;
