import { createContext, useContext, useEffect } from "react";
import { useStoreState } from "react-flow-renderer";
import { connectNodes } from "utils/handles";

export type NodeContextType = {
  addNode: (id: string, node: AudioNode) => void;
  getNode: (id: string) => AudioNode;
  nodes: Record<string, AudioNode>;
  removeNode: (id: string) => void;
};

export const NodeContext = createContext<NodeContextType>(null!);

export function useNodeContext() {
  return useContext(NodeContext);
}

export function useNode(id: string, node: AudioNode) {
  const { addNode, getNode, removeNode } = useNodeContext();
  const edges = useStoreState(store => store.edges);

  useEffect(() => {
    addNode(id, node);

    // try reconnecting
    edges.filter(edge => edge.source === id || edge.target === id).forEach(edge => connectNodes(edge, getNode));

    return () => {
      removeNode(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNode, getNode, node, id, removeNode]);
}
