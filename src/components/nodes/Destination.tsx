import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function Destination({ id, type }: NodeProps) {
  // AudioNode
  useNode(id, context => context.destination);

  return <Node id={id} inputs={["input"]} type={type} />;
}

export default React.memo(Destination);
