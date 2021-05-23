import { useEffect } from "react";
import { useNode } from "context/NodeContext";

interface Options {
  fftSizeExp?: number;
}

function useAnalyserNode(id: string, { fftSizeExp = 11 }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createAnalyser());

  // AudioParam
  useEffect(() => void (node.fftSize = Math.pow(2, fftSizeExp)), [node, fftSizeExp]);

  return node;
}

export default useAnalyserNode;
