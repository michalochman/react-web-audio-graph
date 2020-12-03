import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "nodes/Node";

const StereoPanner = ({ data, id, selected, type }: NodeProps) => {
  console.log("StereoPanner render", data, id, selected);
  const { pan = 0, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<StereoPannerNode>(() => context.createStereoPanner(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.pan.value = pan), [node, pan]);

  return (
    <Node id={id} inputs={["input", "pan"]} outputs={["output"]} type={type}>
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
};

export default React.memo(StereoPanner);
