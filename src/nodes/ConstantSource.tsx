import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "nodes/Node";

const ConstantSource = ({ data, id, selected, type }: NodeProps) => {
  console.log("ConstantSource render", data, id, selected);
  const { offset = 1, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<ConstantSourceNode>(() => context.createConstantSource(), [context]);
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => (node.offset.value = offset), [node, offset]);

  return (
    <Node id={id} outputs={["output"]} title={`Constant: ${offset}`} type={type}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              type="number"
              onChange={e => onChange({ offset: +e.target.value })}
              style={{ width: "100%" }}
              value={offset}
            />
          </div>
        </div>
      )}
    </Node>
  );
};

export default React.memo(ConstantSource);
