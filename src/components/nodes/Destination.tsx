import React, { useContext } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function Destination({ id, type }: NodeProps) {
  // AudioNode
  const context = useContext(AudioContext);
  const node = context.destination;
  useNode(id, node);

  return <Node id={id} inputs={["input"]} type={type} />;
}

export default React.memo(Destination);
