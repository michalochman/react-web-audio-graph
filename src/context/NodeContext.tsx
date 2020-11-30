import { createContext, useContext } from "react";

export type NodeContextType = {
  addNode: (id: string, node: AudioNode) => void;
  nodes: Record<string, AudioNode>;
};

export const NodeContext = createContext<NodeContextType>(null!);

export function useNodeContext() {
  return useContext(NodeContext);
}

export function useNode<Node extends AudioNode>(id: string): Node {
  const context = useNodeContext();

  return context.nodes[id] as Node;
}
