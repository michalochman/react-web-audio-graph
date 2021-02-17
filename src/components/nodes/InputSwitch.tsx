import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import Toggle from "components/controls/Toggle";

interface InputSwitchNode extends ComplexAudioNode<undefined, GainNode> {
  A: GainNode;
  B: GainNode;
}

function InputSwitch({ data, id, selected, type: nodeType }: NodeProps) {
  const { input = "A", onChange } = data;

  // AudioNode
  const node = (useNode(id, context => {
    const output = context.createGain();
    const A = context.createGain();
    const B = context.createGain();

    A.connect(output);
    B.connect(output);

    return {
      A,
      B,
      input: undefined,
      output,
    };
  }) as unknown) as InputSwitchNode;

  // AudioParam
  useEffect(() => {
    if (input === "A") {
      node.A.gain.setTargetAtTime(1, node.A.context.currentTime, 0.015);
      node.B.gain.setTargetAtTime(0, node.A.context.currentTime, 0.015);
    } else {
      node.A.gain.setTargetAtTime(0, node.A.context.currentTime, 0.015);
      node.B.gain.setTargetAtTime(1, node.A.context.currentTime, 0.015);
    }
  }, [node, input]);

  const toggleInput = useCallback(() => onChange({ input: input === "A" ? "B" : "A" }), [onChange, input]);

  return (
    <Node id={id} inputs={["A", "B"]} outputs={["output"]} title={`Input: ${input}`} type={nodeType}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <Toggle checked={input === "A"} labelOff="B" labelOn="A" onChange={toggleInput} />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(InputSwitch);
