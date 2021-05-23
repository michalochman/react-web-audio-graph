import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";

function NotGate({ id, type }: NodeProps) {
  useAudioWorkletNode(id, "not-gate-processor");

  return <Node id={id} inputs={["input"]} outputs={["output"]} title="Gate: NOT" type={type} />;
}

export default React.memo(NotGate);
