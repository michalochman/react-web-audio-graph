import React, { useCallback, useMemo } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  children: React.ReactNode;
}

function Audio({ children }: Props) {
  const context = useMemo(() => {
    const context = new window.AudioContext();
    if (context.state !== "suspended") {
      context.suspend();
    }

    return context;
  }, []);

  const resume = useCallback(() => {
    if (context.state === "suspended") {
      context.resume();
    }
  }, [context]);

  return (
    <div onClick={resume}>
      <AudioContext.Provider value={context}>{children}</AudioContext.Provider>
    </div>
  );
}

export default Audio;
