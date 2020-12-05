import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "nodes/Node";

function Gain({ data, id, selected, type }: NodeProps) {
  const { gain = 1, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<GainNode>(() => context.createGain(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.gain.value = gain), [node, gain]);

  return (
    <Node id={id} inputs={["input", "gain"]} outputs={["output"]} title={`Gain: ${gain}`} type={type}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="1"
              min="-1"
              step="0.01"
              onChange={e => onChange({ gain: +e.target.value })}
              value={gain}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Gain);
