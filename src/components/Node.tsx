import React, { useCallback, useMemo } from "react";
import { Elements, Handle, Node as FlowNode, NodeProps, Position } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { GRID_SIZE } from "components/Flow";
import { useContextMenu } from "context/ContextMenuContext";
import { useProject } from "context/ProjectContext";

interface Props extends Omit<React.HTMLProps<HTMLDivElement>, "id" | "title"> {
  children?: React.ReactNode;
  id: NodeProps["id"];
  inputs?: string[];
  outputs?: string[];
  title?: React.ReactNode;
  type: NodeProps["type"];
}

function Node({ children, id, inputs, outputs, title, type, ...props }: Props) {
  const { elements, onChangeElementFactory, setElements } = useProject();
  const contextMenu = useContextMenu();
  const node = elements.find(node => node.id === id) as FlowNode;
  const handleStyle = useMemo(
    () => ({
      background: `#${id.substr(-6)}`,
    }),
    [id]
  );

  const cloneNode = useCallback(() => {
    if (!node) {
      throw new Error("Node does not exist - this should never happen");
    }

    const id = `${type}-${uuidv4()}`;
    const onChange = onChangeElementFactory(id);
    const newNode = {
      id,
      data: { ...node.data, onChange },
      type: node.type,
      position: {
        x: node.position.x + GRID_SIZE,
        y: node.position.y + GRID_SIZE,
      },
    };
    setElements((elements: Elements) => [...elements, newNode]);
    contextMenu.hide();
  }, [contextMenu, onChangeElementFactory, node, setElements, type]);

  const onClick = useCallback(() => {
    contextMenu.hide();
  }, [contextMenu]);

  const onContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      contextMenu.setRect({ width: 0, height: 0, top: event.clientY, right: 0, bottom: 0, left: event.clientX });
      contextMenu.show(
        <ul className="contextMenu">
          <li onClick={cloneNode}>Clone</li>
        </ul>
      );
    },
    [cloneNode, contextMenu]
  );

  return (
    <div className="customNode" title={id} onClick={onClick} onContextMenu={onContextMenu} {...props}>
      <div className="customNode_header">{title ?? type}</div>
      <div className="customNode_body">
        {inputs && (
          <div className="customNode_inputs">
            {inputs.map(input => (
              <div key={input} className="customNode_item">
                <Handle id={input} position={Position.Left} style={handleStyle} type="target" />
                {input}
              </div>
            ))}
          </div>
        )}
        {outputs && (
          <div className="customNode_outputs">
            {outputs.map(output => (
              <div key={output} className="customNode_item">
                <Handle id={output} position={Position.Right} style={handleStyle} type="source" />
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
