import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";

function XorGate({ id, type }: NodeProps) {
  useAudioWorkletNode(id, "xor-gate-processor", { numberOfInputs: 2 });

  return <Node id={id} inputs={["input-0", "input-1"]} outputs={["output"]} title="Gate: XOR" type={type} />;
}

export default React.memo(XorGate);
