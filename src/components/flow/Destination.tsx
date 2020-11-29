import React from "react";
import { Handle, Node, Position } from "react-flow-renderer";

type Props = Node;

const Destination = ({ id }: Props) => {
  return (
    <div className="customNode" title={id}>
      <Handle id="input" position={Position.Left} type="target" />

      <div>input</div>
    </div>
  );
};

export default Destination;
