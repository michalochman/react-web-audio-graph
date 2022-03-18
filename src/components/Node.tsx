import React, { useCallback, useMemo } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import produce from "immer";
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
  const { nodes, onChangeElementFactory, setNodes } = useProject();
  const contextMenu = useContextMenu();
  const node = nodes.find(node => node.id === id);
  const handleStyle = useMemo(
    () => ({
      background: `#${id.slice(-6)}`,
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
    setNodes(nodes => [...nodes, newNode]);
    contextMenu.hide();
  }, [contextMenu, onChangeElementFactory, node, setNodes, type]);
  const moveNode = useCallback(
    (parentNode?: string) => {
      if (!node) {
        throw new Error("Node does not exist - this should never happen");
      }

      setNodes(
        produce(draft => {
          const nodeIndex = draft.findIndex(({ id }) => id === node.id);
          const updatedNnode = draft.splice(nodeIndex, 1)[0];
          draft.push({
            ...updatedNnode,
            extent: "parent",
            parentNode: parentNode,
            position: { x: 0, y: 0 },
          });
        })
      );
      contextMenu.hide();
    },
    [contextMenu, node, setNodes]
  );

  const onClick = useCallback(() => {
    contextMenu.hide();
  }, [contextMenu]);

  const subFlows = nodes.filter(node => node.type === "SubFlow");

  const onContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      contextMenu.setRect({ width: 0, height: 0, top: event.clientY, right: 0, bottom: 0, left: event.clientX });
      contextMenu.show(
        <ul className="contextMenu">
          <li onClick={cloneNode}>Clone</li>
          <li>
            Move to SubFlow
            {subFlows.length > 0 && (
              <>
                <span>&#x276F;</span>
                <ul className="contextMenu sub">
                  {subFlows.map(subFlow => (
                    <li key={subFlow.id} onClick={() => moveNode(subFlow.id)}>
                      {subFlow.data?.title ?? subFlow.id}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </li>
          <li onClick={() => moveNode(undefined)}>Remove from SubFlow</li>
        </ul>
      );
    },
    [cloneNode, contextMenu, moveNode, subFlows]
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
