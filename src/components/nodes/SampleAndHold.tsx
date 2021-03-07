import React from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { AudioWorkletNode } from "utils/audioContext";
import { Parameters } from "worklets/sample-and-hold-processor.types";

function SampleAndHold({ id, type }: NodeProps) {
  // AudioNode
  useNode(id, context => {
    const sampleAndHold = new AudioWorkletNode!(context, "sample-and-hold-processor");

    return {
      [Parameters.HoldTime]: sampleAndHold.parameters.get(Parameters.HoldTime),
      input: sampleAndHold,
      output: sampleAndHold,
    };
  });

  return <Node id={id} inputs={["input", Parameters.HoldTime]} outputs={["output"]} title="Sample/Hold" type={type} />;
}

export default React.memo(SampleAndHold);
