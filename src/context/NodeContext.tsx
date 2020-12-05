import { createContext, useContext, useEffect } from "react";

export type NodeContextType = {
  addNode: (id: string, node: AudioNode) => void;
  nodes: Record<string, AudioNode>;
  removeNode: (id: string) => void;
  removeNodes: () => void;
};

export const NodeContext = createContext<NodeContextType>(null!);

export function useNodeContext() {
  return useContext(NodeContext);
}

export function useNode(id: string, node: AudioNode) {
  const { addNode, removeNode } = useNodeContext();

  useEffect(() => {
    addNode(id, node);
    return () => {
      removeNode(id);
    };
  }, [addNode, node, id, removeNode]);
}
