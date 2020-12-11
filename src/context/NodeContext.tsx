import { createContext, DependencyList, useContext, useEffect, useMemo } from "react";
import { useStoreState } from "react-flow-renderer";
import { connectNodes } from "utils/handles";
import { AudioContext } from "context/AudioContext";

export type NodeContextType = {
  addNode: (id: string, node: AudioNode) => void;
  getNode: (id: string) => AudioNode;
  nodes: Record<string, AudioNode>;
  removeNode: (id: string) => void;
};

interface NodeFactory<T extends AudioNode> {
  (context: AudioContext): T;
}

export const NodeContext = createContext<NodeContextType>(null!);

export function useNodeContext() {
  return useContext(NodeContext);
}

export function useNode<T extends AudioNode>(
  id: string,
  nodeFactory: NodeFactory<T>,
  dependencies: DependencyList = []
) {
  const context = useContext(AudioContext);
  const { addNode, getNode, removeNode } = useNodeContext();
  const edges = useStoreState(store => store.edges);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const node = useMemo<T>(() => nodeFactory(context), dependencies);

  useEffect(() => {
    addNode(id, node);

    // try reconnecting
    edges.filter(edge => edge.source === id || edge.target === id).forEach(edge => connectNodes(edge, getNode));

    return () => {
      removeNode(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNode, getNode, node, id, removeNode]);

  return node;
}
