import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function StereoPanner({ data, id, selected, type }: NodeProps) {
  const { pan = 0, onChange } = data;
  const title = `Stereo: ${Math.abs(pan * 100).toFixed(0)}% ${pan > 0 ? "Right" : pan < 0 ? "Left" : ""}`;

  // AudioNode
  const node = useNode(id, context => context.createStereoPanner());

  // AudioParam
  useEffect(() => void (node.pan.value = pan), [node, pan]);

  return (
    <Node id={id} inputs={["input", "pan"]} outputs={["output"]} title={title} type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              max="1"
              min="-1"
              onChange={e => onChange({ pan: +e.target.value })}
              step="0.01"
              title={title}
              type="range"
              value={pan}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(StereoPanner);
