import React, { useMemo, useRef } from "react";
import { NodeContext, NodeContextType } from "context/NodeContext";

interface Props {
  children: React.ReactNode;
}

export function nodeCleanup(node: AudioNode) {
  (node as any).stop?.();
  node.disconnect();
}

function Nodes({ children }: Props) {
  const nodes = useRef<NodeContextType["nodes"]>({});
  const context: NodeContextType = useMemo(
    () => ({
      addNode: (id, node) => {
        nodes.current[id] = node;
      },
      getNode: id => nodes.current[id],
      nodes: nodes.current,
      removeNode: id => {
        nodeCleanup(nodes.current[id]);
        delete nodes.current[id];
      },
    }),
    []
  );

  return (
    <div>
      <NodeContext.Provider value={context}>{children}</NodeContext.Provider>
    </div>
  );
}

export default Nodes;
