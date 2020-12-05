import React from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";

interface Props {
  children?: React.ReactNode;
  id: NodeProps["id"];
  inputs?: string[];
  outputs?: string[];
  title?: React.ReactNode;
  type: NodeProps["type"];
}

function Node({ children, id, inputs, outputs, title, type }: Props) {
  return (
    <div className="customNode" title={id}>
      <div className="customNode_header">{title ?? type}</div>
      <div className="customNode_body">
        {inputs && (
          <div className="customNode_inputs">
            {inputs.map(input => (
              <div key={input} className="customNode_item">
                <Handle id={input} position={Position.Left} type="target" />
                {input}
              </div>
            ))}
          </div>
        )}
        {outputs && (
          <div className="customNode_outputs">
            {outputs.map(output => (
              <div key={output} className="customNode_item">
                <Handle id={output} position={Position.Right} type="source" />
                {output}
              </div>
            ))}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default React.memo(Node);
