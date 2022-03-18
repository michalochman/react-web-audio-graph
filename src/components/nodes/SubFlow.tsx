import React, { useCallback, useMemo } from "react";
import { Handle, Node, NodeProps, Position } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { GRID_SIZE } from "components/Flow";
import { useContextMenu } from "context/ContextMenuContext";
import { useProject } from "context/ProjectContext";
import FlowContextMenu from "components/FlowContextMenu";
import { useNode } from "context/NodeContext";

function snapToGrid(position: number) {
  return Math.floor(position / GRID_SIZE) * GRID_SIZE;
}

// TODO make sure this is added first to nodes list
// TODO adjust width/height
// TODO add input/output gain
// TODO add bypass
function SubFlow({ data, id, type }: NodeProps) {
  const { nodes, onChangeElementFactory, setNodes, transform } = useProject();
  const { inputs = 1, outputs = 1, title } = data;
  const contextMenu = useContextMenu();
  const node = nodes.find(node => node.id === id)!;
  const handleStyle = useMemo(
    () => ({
      background: `#${id.slice(-6)}`,
    }),
    [id]
  );

  // TODO more inputs/outputs
  // AudioNode
  useNode(
    id,
    context => {
      // TODO cleanup when decreasing inputs/outputs
      const inputNodes = Array(inputs)
        .fill(null)
        .reduce((inputNodes, _, input) => {
          const inputNode = context.createGain();
          inputNodes[`_input-of-input-${input}_`] = inputNode;
          inputNodes[`_output-of-input-${input}_`] = inputNode;
          return inputNodes;
        }, {});
      const outputNodes = Array(outputs)
        .fill(null)
        .reduce((outputNodes, _, output) => {
          const outputNode = context.createGain();
          outputNodes[`_input-of-output-${output}_`] = outputNode;
          outputNodes[`_output-of-output-${output}_`] = outputNode;
          return outputNodes;
        }, {});

      return {
        ...inputNodes,
        ...outputNodes,
        input: undefined,
        output: undefined,
      };
    },
    [inputs, outputs]
  );

  const addNode = useCallback(
    (type: string) => {
      const id = `${type}-${uuidv4()}`;
      const onChange = onChangeElementFactory(id);
      const position = {
        x: snapToGrid((contextMenu.getRect().left - transform.x - node.position.x) / transform.zoom),
        y: snapToGrid((contextMenu.getRect().top - transform.y - node.position.y) / transform.zoom),
      };
      const childNode: Node = {
        id,
        data: { onChange },
        extent: "parent",
        type,
        parentNode: node.id,
        position,
      };
      setNodes(nodes => [...nodes, childNode]);
      contextMenu.hide();
    },
    [contextMenu, node, onChangeElementFactory, setNodes, transform]
  );

  const onClick = useCallback(() => {
    contextMenu.hide();
  }, [contextMenu]);

  const onContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      contextMenu.setRect({ width: 0, height: 0, top: event.clientY, right: 0, bottom: 0, left: event.clientX });
      contextMenu.show(<FlowContextMenu addNode={addNode} />);
    },
    [addNode, contextMenu]
  );

  return (
    <div className="customNode subFlowNode" title={id} onClick={onClick} onContextMenu={onContextMenu}>
      <div className="customNode_header">{title ?? type}</div>
      <div className="customNode_body">
        {inputs > 0 && (
          <div className="customNode_inputs">
            {Array(inputs)
              .fill(null)
              .map((_, input) => (
                <div key={input} className="customNode_item">
                  <Handle id={`_input-of-input-${input}_`} position={Position.Left} style={handleStyle} type="target" />
                  &nbsp;
                  <Handle
                    id={`_output-of-input-${input}_`}
                    position={Position.Right}
                    style={{ ...handleStyle, left: 0, right: "auto" }}
                    type="source"
                  />
                </div>
              ))}
          </div>
        )}
        {outputs > 0 && (
          <div className="customNode_outputs">
            {Array(outputs)
              .fill(null)
              .map((_, output) => (
                <div key={output} className="customNode_item">
                  <Handle
                    id={`_input-of-output-${output}_`}
                    position={Position.Left}
                    style={{ ...handleStyle, left: "auto", right: 0 }}
                    type="target"
                  />
                  &nbsp;
                  <Handle
                    id={`_output-of-output-${output}_`}
                    position={Position.Right}
                    style={handleStyle}
                    type="source"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(SubFlow);
