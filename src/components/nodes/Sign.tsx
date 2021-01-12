import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function Sign({ id, type }: NodeProps) {
  // AudioNode
  useNode(id, context => new AudioWorkletNode(context, "sign-processor"));

  return <Node id={id} inputs={["input"]} outputs={["output"]} title="Sign" type={type} />;
}

export default React.memo(Sign);
