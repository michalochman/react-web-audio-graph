import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import Toggle from "components/controls/Toggle";

interface OutputSwitchNode extends ComplexAudioNode<GainNode, undefined> {
  A: GainNode;
  B: GainNode;
}

function OutputSwitch({ data, id, selected, type: nodeType }: NodeProps) {
  const { onChange, output = "A" } = data;

  // AudioNode
  const node = (useNode(id, context => {
    const input = context.createGain();
    const A = context.createGain();
    const B = context.createGain();

    input.connect(A);
    input.connect(B);

    return {
      A,
      B,
      input,
      output: undefined,
    };
  }) as unknown) as OutputSwitchNode;

  // AudioParam
  useEffect(() => {
    if (output === "A") {
      node.A.gain.setTargetAtTime(1, node.A.context.currentTime, 0.015);
      node.B.gain.setTargetAtTime(0, node.A.context.currentTime, 0.015);
    } else {
      node.A.gain.setTargetAtTime(0, node.A.context.currentTime, 0.015);
      node.B.gain.setTargetAtTime(1, node.A.context.currentTime, 0.015);
    }
  }, [node, output]);

  const toggleOutput = useCallback(() => onChange({ output: output === "A" ? "B" : "A" }), [onChange, output]);

  return (
    <Node id={id} inputs={["input"]} outputs={["A", "B"]} title={`Output: ${output}`} type={nodeType}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <Toggle checked={output === "A"} labelOff="B" labelOn="A" onChange={toggleOutput} />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(OutputSwitch);
