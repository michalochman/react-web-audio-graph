import { useEffect } from "react";
import { useNode } from "context/NodeContext";

interface Options {
  attack?: number;
  knee?: number;
  ratio?: number;
  release?: number;
  threshold?: number;
}

function useDynamicsCompressorNode(
  id: string,
  { attack = 0.003, knee = 30, ratio = 12, release = 0.25, threshold = -24 }: Options
) {
  // AudioNode
  const node = useNode(id, context => context.createDynamicsCompressor());

  // AudioParam
  useEffect(() => void (node.threshold.value = threshold), [node, threshold]);
  useEffect(() => void (node.knee.value = knee), [node, knee]);
  useEffect(() => void (node.ratio.value = ratio), [node, ratio]);
  useEffect(() => void (node.attack.value = attack), [node, attack]);
  useEffect(() => void (node.release.value = release), [node, release]);

  return node;
}

export default useDynamicsCompressorNode;
