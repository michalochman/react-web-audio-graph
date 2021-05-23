import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import Toggle from "components/controls/Toggle";
import useGainNode from "hooks/nodes/useGainNode";

function InputSwitch({ data, id, selected, type: nodeType }: NodeProps) {
  const { input = "A", onChange } = data;

  // Interface
  const outputNode = useGainNode(`${id}_output`, {});
  // Inputs
  const inputANode = useGainNode(`${id}_inputA`, {});
  const inputBNode = useGainNode(`${id}_inputB`, {});

  // Connections
  useEffect(() => {
    inputANode.connect(outputNode);
    inputBNode.connect(outputNode);
  }, [inputANode, inputBNode, outputNode]);

  const toggleInput = useCallback(() => onChange({ input: input === "A" ? "B" : "A" }), [onChange, input]);
  useEffect(() => {
    if (input === "A") {
      inputANode.gain.setTargetAtTime(1, inputANode.context.currentTime, 0.015);
      inputBNode.gain.setTargetAtTime(0, inputBNode.context.currentTime, 0.015);
    } else {
      inputANode.gain.setTargetAtTime(0, inputANode.context.currentTime, 0.015);
      inputBNode.gain.setTargetAtTime(1, inputBNode.context.currentTime, 0.015);
    }
  }, [input, inputANode, inputBNode]);

  // AudioNode
  useNode(
    id,
    () => ({
      input: undefined,
      A: inputANode,
      B: inputBNode,
      output: outputNode,
    }),
    [inputANode, inputBNode, outputNode]
  );

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
