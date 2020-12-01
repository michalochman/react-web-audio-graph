import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  isEdge,
  removeElements,
  Background,
  Connection,
  Controls,
  Edge,
  Elements,
  isNode,
} from "react-flow-renderer";
import { usePopper } from "react-popper";
import { v4 as uuidv4 } from "uuid";
import Analyser from "nodes/Analyser";
import BiquadFilter from "nodes/BiquadFilter";
import Destination from "nodes/Destination";
import Gain from "nodes/Gain";
import Oscillator from "nodes/Oscillator";
import OscillatorNote from "nodes/OscillatorNote";
import { useOnConnect, useOnEdgeRemove, useOnNodeRemove } from "utils/handles";

const flowWrapperStyle: React.CSSProperties = {
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
};

const nodeTypes = {
  Analyser: Analyser,
  BiquadFilter: BiquadFilter,
  Destination: Destination,
  Gain: Gain,
  Oscillator: Oscillator,
  OscillatorNote: OscillatorNote,
};

function Flow() {
  const [showPopper, setShowPopper] = React.useState(false);
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();
  const [virtualReference, setVirtualReference] = React.useState<any>(null);
  const { styles, attributes } = usePopper(virtualReference, popperElement, {
    placement: "bottom-start",
  });

  const [nodes, setNodes] = useState<Elements>([]);
  const [edges, setEdges] = useState<Elements>([]);
  const elements = [...nodes, ...edges];

  const onElementsConnect = useOnConnect();
  const onEdgeRemove = useOnEdgeRemove();
  const onNodeRemove = useOnNodeRemove();

  const onConnect = (params: Edge | Connection) => setEdges(elements => addEdge(params, elements));
  const onElementsRemove = (elementsToRemove: Elements) => {
    const edgesToRemove = elementsToRemove.filter(isEdge);
    const nodesToRemove = elementsToRemove.filter(isNode);

    edgesToRemove.forEach(edge => onEdgeRemove(edge));
    nodesToRemove.forEach(node => onNodeRemove(node.id));

    setEdges(elements => removeElements(elementsToRemove, elements));
    setNodes(elements => removeElements(elementsToRemove, elements));
  };
  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    onEdgeRemove(oldEdge);
    setEdges(elements => removeElements([oldEdge], elements));
    setEdges(elements => addEdge(newConnection, elements));
    onElementsConnect(newConnection);
  };

  const onPaneClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    setShowPopper(!!popperElement?.contains(event.target as Node));
  };

  const onPaneContextMenu = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.preventDefault();
    setShowPopper(true);
    setVirtualReference({
      getBoundingClientRect: () => ({
        top: Math.floor(event.clientY / 10) * 10,
        left: Math.floor(event.clientX / 10) * 10,
        height: 0,
        width: 0,
      }),
    });
  };

  const addNode = useCallback(
    (type: string) => {
      const position = {
        x: virtualReference.getBoundingClientRect().left,
        y: virtualReference.getBoundingClientRect().top,
      };
      const node = {
        id: `${type}-${uuidv4()}`,
        data: {},
        type,
        position,
      };
      setNodes(nodes => [...nodes, node]);
      setShowPopper(false);
    },
    [virtualReference]
  );

  return (
    <div style={flowWrapperStyle}>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onElementsRemove={onElementsRemove}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        paneMoveable={false}
        snapToGrid
        snapGrid={[10, 10]}
        // TODO figure out why this is needed for flow container not to cover context menu
        style={{ zIndex: 0 }}
      >
        <Background gap={10} />
        <Controls />
      </ReactFlow>
      {/* TODO extract as ContextMenu component */}
      {showPopper && (
        <div ref={node => node && setPopperElement(node)} style={styles.popper} {...attributes.popper}>
          <ul className="contextMenu">
            <li onClick={() => addNode("Analyser")}>Add Analyser</li>
            <li onClick={() => addNode("BiquadFilter")}>Add Biquad Filter</li>
            <li onClick={() => addNode("Destination")}>Add Destination</li>
            <li onClick={() => addNode("Gain")}>Add Gain</li>
            <li onClick={() => addNode("Oscillator")}>Add Oscillator</li>
            <li onClick={() => addNode("OscillatorNote")}>Add Oscillator Note</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Flow;
