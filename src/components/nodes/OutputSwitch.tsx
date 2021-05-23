import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import Toggle from "components/controls/Toggle";
import useGainNode from "hooks/nodes/useGainNode";

function OutputSwitch({ data, id, selected, type: nodeType }: NodeProps) {
  const { onChange, output = "A" } = data;

  // Interface
  const inputNode = useGainNode(`${id}_input`, {});
  // Outputs
  const outputANode = useGainNode(`${id}_outputA`, {});
  const outputBNode = useGainNode(`${id}_outputB`, {});

  // Connections
  useEffect(() => {
    inputNode.connect(outputANode);
    inputNode.connect(outputBNode);
  }, [inputNode, outputANode, outputBNode]);

  const toggleOutput = useCallback(() => onChange({ output: output === "A" ? "B" : "A" }), [onChange, output]);
  useEffect(() => {
    if (output === "A") {
      outputANode.gain.setTargetAtTime(1, outputANode.context.currentTime, 0.015);
      outputBNode.gain.setTargetAtTime(0, outputBNode.context.currentTime, 0.015);
    } else {
      outputANode.gain.setTargetAtTime(0, outputANode.context.currentTime, 0.015);
      outputBNode.gain.setTargetAtTime(1, outputBNode.context.currentTime, 0.015);
    }
  }, [output, outputANode, outputBNode]);

  // AudioNode
  useNode(
    id,
    () => ({
      input: inputNode,
      A: outputANode,
      B: outputBNode,
      output: undefined,
    }),
    [inputNode, outputANode, outputBNode]
  );

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
