import { useEffect } from "react";
import { useNode } from "context/NodeContext";
import { TOscillatorType } from "utils/audioContext";

interface Options {
  detune?: number;
  frequency?: number;
  type?: TOscillatorType;
}

function useOscillatorNode(id: string, { detune = 0, frequency = 440, type = "sine" }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createOscillator());
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  // AudioParam
  useEffect(() => void (node.detune.value = detune), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency), [node, frequency]);
  useEffect(() => void (node.type = type), [node, type]);

  return node;
}

export default useOscillatorNode;
