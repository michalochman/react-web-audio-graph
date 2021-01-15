import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function ConstantSource({ data, id, selected, type }: NodeProps) {
  const { offset = 1, onChange } = data;

  // AudioNode
  const node = useNode(id, context => context.createConstantSource());
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  // AudioParam
  useEffect(() => (node.offset.value = offset), [node, offset]);

  return (
    <Node id={id} outputs={["output"]} title={`Constant: ${offset}`} type={type}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              onChange={e => onChange({ offset: +e.target.value })}
              style={{ width: "100%" }}
              title="Offset"
              type="number"
              value={offset}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(ConstantSource);
