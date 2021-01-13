/* eslint-disable import/no-webpack-loader-syntax */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AudioContext } from "context/AudioContext";

import AndGateWorkletProcessor from "worklet-loader!worklets/and-gate-processor.worklet.ts";
import EnvelopeWorkletProcessor from "worklet-loader!worklets/envelope-processor.worklet.ts";
import GateWorkletProcessor from "worklet-loader!worklets/gate-processor.worklet.ts";
import RectifierWorkletProcessor from "worklet-loader!worklets/rectifier-processor.worklet.ts";
import NotGateWorkletProcessor from "worklet-loader!worklets/not-gate-processor.worklet.ts";
import OrGateWorkletProcessor from "worklet-loader!worklets/or-gate-processor.worklet.ts";
import SignWorkletProcessor from "worklet-loader!worklets/sign-processor.worklet.ts";
import TransformerWorkletProcessor from "worklet-loader!worklets/transformer-processor.worklet.ts";
import XorGateWorkletProcessor from "worklet-loader!worklets/xor-gate-processor.worklet.ts";

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
        context.audioWorklet.addModule(AndGateWorkletProcessor),
        context.audioWorklet.addModule(EnvelopeWorkletProcessor),
        context.audioWorklet.addModule(GateWorkletProcessor),
        context.audioWorklet.addModule(NotGateWorkletProcessor),
        context.audioWorklet.addModule(OrGateWorkletProcessor),
        context.audioWorklet.addModule(RectifierWorkletProcessor),
        context.audioWorklet.addModule(SignWorkletProcessor),
        context.audioWorklet.addModule(TransformerWorkletProcessor),
        context.audioWorklet.addModule(XorGateWorkletProcessor),
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
