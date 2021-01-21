import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function Comparator({ id, type }: NodeProps) {
  // AudioNode
  useNode(id, context => new AudioWorkletNode(context, "comparator-processor", { numberOfInputs: 2 }));

  return <Node id={id} inputs={["input-0", "input-1"]} outputs={["output"]} title="Comparator" type={type} />;
}

export default React.memo(Comparator);
