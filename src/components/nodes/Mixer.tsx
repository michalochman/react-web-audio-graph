import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import useGainNode from "hooks/nodes/useGainNode";

// TODO mix as param
function DelayEffect({ data, id, selected, type }: NodeProps) {
  const { mix = 0.5, onChange } = data;

  // Interface
  const outputNode = useGainNode(`${id}_output`, {});
  // Inputs
  const inputANode = useGainNode(`${id}_inputA`, { gain: Math.cos(mix * 0.5 * Math.PI) });
  const inputBNode = useGainNode(`${id}_inputB`, { gain: Math.cos((1.0 - mix) * 0.5 * Math.PI) });
  // Mixing
  useEffect(() => {
    inputANode.connect(outputNode);
    inputBNode.connect(outputNode);
  }, [inputANode, inputBNode, outputNode]);

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
    <Node
      id={id}
      inputs={["A", "B"]}
      outputs={["output"]}
      title={`Mixer: ${((1 - mix) * 100).toFixed(0)}% A / ${(mix * 100).toFixed(0)}% B`}
      type={type}
    >
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              max="1"
              min="0"
              onChange={e => onChange({ mix: +e.target.value })}
              step="0.01"
              type="range"
              value={mix}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(DelayEffect);
