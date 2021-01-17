import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function FM_drop_flow({ data, id, type }: NodeProps) {
  const { event = "PUSH" } = data;

  // AudioNode
  useNode(id, context => context.destination);

  return <Node id={id} inputs={["bool"]} type={type} />;
}

export default React.memo(FM_drop_flow);
