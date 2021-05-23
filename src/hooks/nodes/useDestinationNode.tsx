import { useNode } from "context/NodeContext";

function useDestinationNode(id: string) {
  // AudioNode
  return useNode(id, context => context.destination);
}

export default useDestinationNode;
