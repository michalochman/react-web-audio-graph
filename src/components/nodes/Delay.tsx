import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function Delay({ data, id, selected, type }: NodeProps) {
  const { delayTime = 1, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<DelayNode>(() => context.createDelay(), [context]);
  useNode(id, node);

  // AudioParam
  useEffect(() => void (node.delayTime.value = delayTime), [node, delayTime]);

  return (
    <Node id={id} inputs={["input", "delayTime"]} outputs={["output"]} title={`Delay: ${delayTime} s`} type={type}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              type="number"
              onChange={e => onChange({ delayTime: +e.target.value })}
              value={delayTime}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Delay);
