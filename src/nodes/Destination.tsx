import React, { useContext, useEffect } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";

type Props = Node;

const Destination = ({ id }: Props) => {
  // AudioNode
  const context = useContext(AudioContext);
  const node = context.destination;
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  return (
    <div className="customNode" title={id}>
      <Handle id="input" position={Position.Left} type="target" />

      <div>input</div>
    </div>
  );
};

export default Destination;
