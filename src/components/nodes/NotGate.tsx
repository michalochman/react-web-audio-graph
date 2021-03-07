import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { AudioWorkletNode } from "utils/audioContext";

function NotGate({ id, type }: NodeProps) {
  // AudioNode
  useNode(id, context => new AudioWorkletNode!(context, "not-gate-processor"));

  return <Node id={id} inputs={["input"]} outputs={["output"]} title="Gate: NOT" type={type} />;
}

export default React.memo(NotGate);
