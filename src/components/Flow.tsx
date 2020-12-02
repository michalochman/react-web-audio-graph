import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  isEdge,
  isNode,
  removeElements,
  useStoreState,
  Background,
  Connection,
  Controls,
  Edge,
  Elements,
  Node as ReactFlowNode,
} from "react-flow-renderer";
import { usePopper } from "react-popper";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import Analyser from "nodes/Analyser";
import BiquadFilter from "nodes/BiquadFilter";
import ConstantSource from "nodes/ConstantSource";
import Delay from "nodes/Delay";
import Destination from "nodes/Destination";
import DynamicsCompressor from "nodes/DynamicsCompressor";
import Gain from "nodes/Gain";
import Oscillator from "nodes/Oscillator";
import OscillatorNote from "nodes/OscillatorNote";
import { useOnConnect, useOnEdgeRemove, useOnNodeRemove } from "utils/handles";

interface Props {
  elements: Elements;
}

const nodeTypes = {
  Analyser: Analyser,
  BiquadFilter: BiquadFilter,
  ConstantSource: ConstantSource,
  Delay: Delay,
  Destination: Destination,
  DynamicsCompressor: DynamicsCompressor,
  Gain: Gain,
  Oscillator: Oscillator,
  OscillatorNote: OscillatorNote,
};

function Flow({ elements: initialElements }: Props) {
  const [showPopper, setShowPopper] = React.useState(false);
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();
  const [virtualReference, setVirtualReference] = React.useState<any>(null);
  const { styles, attributes } = usePopper(virtualReference, popperElement, {
    placement: "bottom-start",
  });
  const transform = useStoreState(store => store.transform);

  const [elements, setElements] = useState<Elements>(initialElements);

  const onElementsConnect = useOnConnect();
  const onEdgeRemove = useOnEdgeRemove();
  const onNodeRemove = useOnNodeRemove();

  const createOnChange = (id: string) => (data: Record<string, any>): void => {
    setElements(
      produce((draft: Elements) => {
        const node = draft.filter(isNode).find(element => element.id === id);
        if (!node) {
          return;
        }
        Object.keys(data).forEach(property => (node.data[property] = data[property]));
      })
    );
  };

  const onLoad = () => {
    // Attach onChange to nodes
    setElements(
      produce((draft: Elements) => {
        draft.filter(isNode).forEach(node => {
          node.data.onChange = createOnChange(node.id);
        });
      })
    );

    // Wait for nodes to render and handle connections
    // FIXME This should be handled on changes to ReactFlowRenderer state instead.
    setTimeout(() => {
      const edges = elements.filter(isEdge);
      edges.forEach(edge => onElementsConnect(edge));
    }, 0);
  };

  const onConnect = (params: Edge | Connection) => {
    setElements(elements => addEdge(params, elements));
    onElementsConnect(params);
  };
  const onElementsRemove = useCallback(
    (elementsToRemove: Elements) => {
      elementsToRemove.filter(isEdge).forEach(edge => onEdgeRemove(edge));
      elementsToRemove.filter(isNode).forEach(node => onNodeRemove(node.id));

      setElements(elements => removeElements(elementsToRemove, elements));
    },
    [onEdgeRemove, onNodeRemove]
  );
  const onEdgeUpdate = (oldEdge: Edge, newConnection: Connection) => {
    onEdgeRemove(oldEdge);
    setElements(elements => removeElements([oldEdge], elements));
    setElements(elements => addEdge(newConnection, elements));
    onElementsConnect(newConnection);
  };

  const onNodeDragStop = (event: React.MouseEvent<Element, MouseEvent>, draggedNode: ReactFlowNode) => {
    setElements(
      produce((draft: Elements) => {
        const node = draft.filter(isNode).find(element => element.id === draggedNode.id);
        if (!node) {
          return;
        }
        node.position = draggedNode.position;
      })
    );
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
      const id = `${type}-${uuidv4()}`;
      const onChange = createOnChange(id);
      const position = {
        x: (virtualReference.getBoundingClientRect().left - transform[0]) / transform[2],
        y: (virtualReference.getBoundingClientRect().top - transform[1]) / transform[2],
      };
      const node = {
        id,
        data: { onChange },
        type,
        position,
      };
      setElements(elements => [...elements, node]);
      setShowPopper(false);
    },
    [transform, virtualReference]
  );

  return (
    <>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgeUpdate={onEdgeUpdate}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onNodeDragStop={onNodeDragStop}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        onlyRenderVisibleElements={false}
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
            <li onClick={() => addNode("ConstantSource")}>Add Constant Source</li>
            <li onClick={() => addNode("Delay")}>Add Delay</li>
            <li onClick={() => addNode("Destination")}>Add Destination</li>
            <li onClick={() => addNode("DynamicsCompressor")}>Add Dynamics Compressor</li>
            <li onClick={() => addNode("Gain")}>Add Gain</li>
            <li onClick={() => addNode("Oscillator")}>Add Oscillator</li>
            <li onClick={() => addNode("OscillatorNote")}>Add Oscillator Note</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default React.memo(Flow);
