import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "nodes/Node";

const Delay = ({ data, id, selected, type }: NodeProps) => {
  console.log("Delay render", data, id, selected);
  const { delayTime = 1, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<DelayNode>(() => context.createDelay(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.delayTime.value = delayTime), [node, delayTime]);

  return (
    <Node id={id} inputs={["input", "delayTime"]} outputs={["output"]} type={type}>
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
};

export default React.memo(Delay);
