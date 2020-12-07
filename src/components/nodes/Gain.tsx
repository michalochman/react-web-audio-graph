import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function Gain({ data, id, selected, type }: NodeProps) {
  const { gain = 1, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<GainNode>(() => context.createGain(), [context]);
  useNode(id, node);

  // AudioParam
  useEffect(() => {
    node.gain.setValueAtTime(node.gain.value, context.currentTime);
    node.gain.linearRampToValueAtTime(gain, context.currentTime + 0.01);
  }, [context, node, gain]);

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
