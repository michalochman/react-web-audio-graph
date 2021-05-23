import { useEffect } from "react";
import { useNode } from "context/NodeContext";

interface Options {
  offset?: number;
}

function useConstantSourceNode(id: string, { offset = 0 }: Options) {
  // AudioNode
  const node = useNode(id, context => context.createConstantSource());
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  // AudioParam
  useEffect(() => void (node.offset.value = offset), [node, offset]);

  return node;
}

export default useConstantSourceNode;
