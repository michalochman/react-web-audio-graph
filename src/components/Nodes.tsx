import React, { useMemo, useRef } from "react";
import { AnyAudioNode, NodeContext, NodeContextType, isComplexAudioNode } from "context/NodeContext";
import { AudioWorkletNode } from "utils/audioContext";

interface Props {
  children: React.ReactNode;
}

export function nodeCleanup(node: AnyAudioNode) {
  if (isComplexAudioNode(node)) {
    (node.input as any)?.stop?.();
    (node.output as any)?.stop?.();
    node.input?.disconnect();
    node.output?.disconnect();
  } else {
    (node as any).stop?.();
    node.disconnect();

    if (node instanceof AudioWorkletNode!) {
      node.port.postMessage("stop");
    }
  }
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
