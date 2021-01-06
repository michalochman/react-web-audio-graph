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
  FlowTransform,
  Node as ReactFlowNode,
  OnLoadParams as ReactFlowInstance,
} from "react-flow-renderer";
import { usePopper } from "react-popper";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import Analyser from "components/nodes/Analyser";
import BiquadFilter from "components/nodes/BiquadFilter";
import ChannelMerger from "components/nodes/ChannelMerger";
import ChannelSplitter from "components/nodes/ChannelSplitter";
import ConstantSource from "components/nodes/ConstantSource";
import Delay from "components/nodes/Delay";
import DelayEffect from "components/nodes/DelayEffect";
import Destination from "components/nodes/Destination";
import DynamicsCompressor from "components/nodes/DynamicsCompressor";
import Envelope from "components/nodes/Envelope";
import Gain from "components/nodes/Gain";
import Gate from "components/nodes/Gate";
import Metronome from "components/nodes/Metronome";
import Noise from "components/nodes/Noise";
import Oscillator from "components/nodes/Oscillator";
import OscillatorNote from "components/nodes/OscillatorNote";
import StereoPanner from "components/nodes/StereoPanner";
import WaveShaper from "components/nodes/WaveShaper";
import { useOnConnect, useOnEdgeRemove, useOnNodeRemove } from "utils/handles";
import { AnyAudioNode, useNodeContext } from "context/NodeContext";

interface Props {
  elements: Elements;
  transform: FlowTransform;
}

const nodeTypes = {
  Analyser: Analyser,
  BiquadFilter: BiquadFilter,
  ChannelMerger: ChannelMerger,
  ChannelSplitter: ChannelSplitter,
  ConstantSource: ConstantSource,
  Delay: Delay,
  DelayEffect: DelayEffect,
  Destination: Destination,
  DynamicsCompressor: DynamicsCompressor,
  Envelope: Envelope,
  Gain: Gain,
  Gate: Gate,
  Metronome: Metronome,
  Noise: Noise,
  Oscillator: Oscillator,
  OscillatorNote: OscillatorNote,
  StereoPanner: StereoPanner,
  WaveShaper: WaveShaper,
};

async function waitForInitialNodes(initialElements: Elements, audioNodes: Record<string, AnyAudioNode>) {
  const nodesWithConnections = initialElements.filter(isEdge).reduce<Record<string, boolean>>((nodeIds, edge) => {
    nodeIds[edge.source] = true;
    nodeIds[edge.target] = true;
    return nodeIds;
  }, {});
  while (Object.keys(nodesWithConnections).length) {
    Object.keys(audioNodes).forEach(nodeId => {
      delete nodesWithConnections[nodeId];
    });
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}

const GRID_SIZE = 10;

function snapToGrid(position: number) {
  return Math.floor(position / GRID_SIZE) * GRID_SIZE;
}

function Flow({ elements: initialElements, transform: initialTransform }: Props) {
  const [showPopper, setShowPopper] = React.useState(false);
  const [popperElement, setPopperElement] = React.useState<HTMLDivElement>();
  const [virtualReference, setVirtualReference] = React.useState<any>(null);
  const { styles, attributes } = usePopper(virtualReference, popperElement, {
    placement: "bottom-start",
  });
  const transform = useStoreState(store => store.transform);

  const [elements, setElements] = useState<Elements>(initialElements);
  const { nodes: audioNodes } = useNodeContext();

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

  const getEdgeWithColor = (params: Edge | Connection) => {
    if (!params.source) {
      return params;
    }

    return Object.assign({}, params, {
      style: {
        stroke: `#${params.source.substr(-6)}`,
      },
    });
  };

  const onLoad = async (reactFlowInstance: ReactFlowInstance) => {
    reactFlowInstance.setTransform(initialTransform);

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
    await waitForInitialNodes(initialElements, audioNodes);
    const edges = initialElements.filter(isEdge);
    edges.forEach(edge => onElementsConnect(edge));
  };

  const onConnect = (params: Edge | Connection) => {
    setElements(elements => addEdge(getEdgeWithColor(params), elements));
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
    setElements(elements => addEdge(getEdgeWithColor(newConnection), elements));
    onElementsConnect(newConnection);
  };

  const onNodeDragStop = (event: React.MouseEvent<Element, MouseEvent>, draggedNode: ReactFlowNode) => {
    setElements(
      produce((draft: Elements) => {
        const node = draft.filter(isNode).find(element => element.id === draggedNode.id);
        if (!node) {
          return;
        }
        node.position = {
          x: snapToGrid(draggedNode.position.x),
          y: snapToGrid(draggedNode.position.y),
        };
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
        top: event.clientY,
        left: event.clientX,
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
        x: snapToGrid((virtualReference.getBoundingClientRect().left - transform[0]) / transform[2]),
        y: snapToGrid((virtualReference.getBoundingClientRect().top - transform[1]) / transform[2]),
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
        defaultPosition={[initialTransform.x, initialTransform.y]}
        defaultZoom={initialTransform.zoom}
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
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        // TODO figure out why this is needed for flow container not to cover context menu
        style={{ zIndex: 0 }}
      >
        <Background gap={GRID_SIZE} />
        <Controls />
      </ReactFlow>
      {/* TODO extract as ContextMenu component */}
      {showPopper && (
        <div ref={node => node && setPopperElement(node)} style={styles.popper} {...attributes.popper}>
          <ul className="contextMenu">
            <li onClick={() => addNode("Analyser")}>Add Analyser</li>
            <li onClick={() => addNode("BiquadFilter")}>Add Biquad Filter</li>
            <li onClick={() => addNode("ChannelMerger")}>Add Channel Merger</li>
            <li onClick={() => addNode("ChannelSplitter")}>Add Channel Splitter</li>
            <li onClick={() => addNode("ConstantSource")}>Add Constant Source</li>
            <li onClick={() => addNode("Delay")}>Add Delay</li>
            <li onClick={() => addNode("Destination")}>Add Destination</li>
            <li onClick={() => addNode("DynamicsCompressor")}>Add Dynamics Compressor</li>
            <li onClick={() => addNode("Envelope")}>Add Envelope</li>
            <li onClick={() => addNode("DelayEffect")}>Add DelayEffect</li>
            <li onClick={() => addNode("Gain")}>Add Gain</li>
            <li onClick={() => addNode("Gate")}>Add Gate</li>
            <li onClick={() => addNode("Metronome")}>Add Metronome</li>
            <li onClick={() => addNode("Noise")}>Add Noise</li>
            <li onClick={() => addNode("Oscillator")}>Add Oscillator</li>
            <li onClick={() => addNode("OscillatorNote")}>Add Oscillator Note</li>
            <li onClick={() => addNode("StereoPanner")}>Add Stereo Panner</li>
            <li onClick={() => addNode("WaveShaper")}>Add Wave Shaper</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default React.memo(Flow);
