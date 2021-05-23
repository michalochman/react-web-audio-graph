import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useDestinationNode from "hooks/nodes/useDestinationNode";

function Destination({ id, type }: NodeProps) {
  useDestinationNode(id);

  return <Node id={id} inputs={["input"]} type={type} />;
}

export default React.memo(Destination);
