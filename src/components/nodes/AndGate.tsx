import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { AudioWorkletNode } from "utils/audioContext";

function AndGate({ id, type }: NodeProps) {
  // AudioNode
  useNode(id, context => new AudioWorkletNode!(context, "and-gate-processor", { numberOfInputs: 2 }));

  return <Node id={id} inputs={["input-0", "input-1"]} outputs={["output"]} title="Gate: AND" type={type} />;
}

export default React.memo(AndGate);
