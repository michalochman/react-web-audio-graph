import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function FM_match_ip({ data, id, selected, type: nodeType }: NodeProps) {
  const { ipAddress = "0", onChange } = data;

  // AudioNode
  const node = useNode(id, context => {
    // Will create buffer with 5 seconds of noise
    const node = context.createBufferSource();

    return node;
  });

  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  return (
    <Node id={id} inputs={["IP Address"]} outputs={["bool"]} title={`FM_match_ip: ${ipAddress}`} type={nodeType}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input onChange={e => onChange({ ipAddress: e.target.value })} value={ipAddress} />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(FM_match_ip);
