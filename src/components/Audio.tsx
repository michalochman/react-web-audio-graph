/* eslint-disable import/no-webpack-loader-syntax */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AudioContext } from "context/AudioContext";

import EnvelopeWorkletProcessor from "worklet-loader!worklets/envelope-processor.worklet.ts";
import GateWorkletProcessor from "worklet-loader!worklets/gate-processor.worklet.ts";

interface Props {
  children: React.ReactNode;
}

function Audio({ children }: Props) {
  const [ready, setReady] = useState(false);

  const context = useMemo(() => {
    try {
      if (!window.AudioContext) {
        // @ts-ignore
        window.AudioContext = window.webkitAudioContext;
      }

      return new window.AudioContext();
    } catch {}
  }, []);

  useEffect(() => {
    const awaitAudioWorkletProcessors = async (context: AudioContext) => {
      await Promise.all([
        context.audioWorklet.addModule(EnvelopeWorkletProcessor),
        context.audioWorklet.addModule(GateWorkletProcessor),
      ]);
      setReady(true);
    };

    if (context) {
      awaitAudioWorkletProcessors(context);
    }
  }, [context]);

  const resume = useCallback(() => {
    if (context?.state === "suspended") {
      context.resume();
    }
  }, [context]);

  if (!context) {
    return <div>Sorry, but the Web Audio API is not supported by your browser.</div>;
  }

  if (!ready) {
    // TODO add loader
    return null;
  }

  return (
    <div onClick={resume}>
      <AudioContext.Provider value={context}>{children}</AudioContext.Provider>
    </div>
  );
}

export default Audio;
