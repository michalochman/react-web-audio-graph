import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function StereoPanner({ data, id, selected, type }: NodeProps) {
  const { pan = 0, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<StereoPannerNode>(() => context.createStereoPanner(), [context]);
  useNode(id, node);

  // AudioParam
  useEffect(() => void (node.pan.value = pan), [node, pan]);

  return (
    <Node
      id={id}
      inputs={["input", "pan"]}
      outputs={["output"]}
      title={`Stereo: ${Math.abs(pan * 100).toFixed(0)}% ${pan > 0 ? "Right" : pan < 0 ? "Left" : ""}`}
      type={type}
    >
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="1"
              min="-1"
              step="0.01"
              onChange={e => onChange({ pan: +e.target.value })}
              value={pan}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(StereoPanner);
