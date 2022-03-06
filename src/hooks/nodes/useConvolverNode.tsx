import { useEffect } from "react";
import { useNode } from "context/NodeContext";

interface Options {
  normalize?: boolean;
}

function useConvolverNode(id: string, { normalize = true }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createConvolver());

  // AudioParam
  useEffect(() => void (node.normalize = normalize), [node, normalize]);

  return node;
}

export default useConvolverNode;
