import { useEffect } from "react";
import { useNode } from "context/NodeContext";
import { TOverSampleType } from "utils/audioContext";

interface Options {
  curve?: Float32Array | null;
  oversample?: TOverSampleType;
}

function useWaveShaperNode(id: string, { curve = null, oversample = "none" }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createWaveShaper());

  // AudioParam
  useEffect(() => void (node.curve = curve), [node, curve]);
  useEffect(() => void (node.oversample = oversample), [node, oversample]);

  return node;
}

export default useWaveShaperNode;
