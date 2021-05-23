import { useEffect } from "react";
import { useNode } from "context/NodeContext";

interface Options {
  gain?: number;
}

function useGainNode(id: string, { gain = 1 }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createGain());

  // AudioParam
  useEffect(() => void node.gain.setTargetAtTime(gain, node.context.currentTime, 0.015), [node, gain]);

  return node;
}

export default useGainNode;
