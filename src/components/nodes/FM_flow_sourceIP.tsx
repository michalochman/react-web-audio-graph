import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function FM_flow_sourceIP({ data, id, selected, type: nodeType }: NodeProps) {
  const { event = "INCOMMING_FLOW" } = data;

  // AudioNode
  const node = useNode(id, context => {
    // Will create buffer with 5 seconds of noise
    const node = context.createBufferSource();
    node.loop = true;

    return node;
  });

  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  console.log(event);
  return <Node id={id} outputs={["IP Address"]} type={nodeType} />;
}

export default React.memo(FM_flow_sourceIP);
