import React, { useCallback, useEffect, useMemo } from "react";
import { AudioContext } from "context/AudioContext";

interface Props {
  children: React.ReactNode;
}

function Audio({ children }: Props) {
  const context = useMemo(() => new window.AudioContext(), []);

  useEffect(() => {
    if (context.state !== "suspended") {
      context.suspend();
    }
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
