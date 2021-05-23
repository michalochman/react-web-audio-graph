import { useEffect } from "react";
import { useNode } from "context/NodeContext";
import { TBiquadFilterType } from "utils/audioContext";

interface Options {
  detune?: number;
  frequency?: number;
  gain?: number;
  Q?: number;
  type?: TBiquadFilterType;
}

function useBiquadFilterNode(id: string, { detune = 0, frequency = 350, gain = 0, Q = 1, type = "lowpass" }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createBiquadFilter());

  // AudioParam
  useEffect(() => void (node.detune.value = detune), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency), [node, frequency]);
  useEffect(() => void (node.gain.value = gain), [node, gain]);
  useEffect(() => void (node.Q.value = Q), [node, Q]);
  useEffect(() => void (node.type = type), [node, type]);

  return node;
}

export default useBiquadFilterNode;
