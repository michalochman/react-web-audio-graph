import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  isEdge,
  isNode,
  removeElements,
  Background,
  Connection,
  Controls,
  Edge,
  Elements,
  Node as ReactFlowNode,
  OnConnectStartParams,
  OnLoadParams as ReactFlowInstance,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import ADSR from "components/nodes/ADSR";
import Analyser from "components/nodes/Analyser";
import AndGate from "components/nodes/AndGate";
import AudioBufferSource from "components/nodes/AudioBufferSource";
import BiquadFilter from "components/nodes/BiquadFilter";
import ChannelMerger from "components/nodes/ChannelMerger";
import ChannelSplitter from "components/nodes/ChannelSplitter";
import Comparator from "components/nodes/Comparator";
import ConstantSource from "components/nodes/ConstantSource";
import Delay from "components/nodes/Delay";
import DelayEffect from "components/nodes/DelayEffect";
import Destination from "components/nodes/Destination";
import DynamicsCompressor from "components/nodes/DynamicsCompressor";
import Equalizer from "components/nodes/Equalizer";
import FlowContextMenu from "components/FlowContextMenu";
import Gain from "components/nodes/Gain";
import Gate from "components/nodes/Gate";
import InputSwitch from "components/nodes/InputSwitch";
import Keyboard from "components/nodes/Keyboard";
import Meter from "components/nodes/Meter";
import Metronome from "components/nodes/Metronome";
import Noise from "components/nodes/Noise";
import NotGate from "components/nodes/NotGate";
import OrGate from "components/nodes/OrGate";
import Oscillator from "components/nodes/Oscillator";
import OscillatorNote from "components/nodes/OscillatorNote";
import OutputSwitch from "components/nodes/OutputSwitch";
import Quantizer from "components/nodes/Quantizer";
import Rectifier from "components/nodes/Rectifier";
import SampleAndHold from "components/nodes/SampleAndHold";
import Sign from "components/nodes/Sign";
import StereoPanner from "components/nodes/StereoPanner";
import Transformer from "components/nodes/Transformer";
import WaveShaper from "components/nodes/WaveShaper";
import XorGate from "components/nodes/XorGate";
import { useContextMenu } from "context/ContextMenuContext";
import { AnyAudioNode, useNodeContext } from "context/NodeContext";
import { useProject } from "context/ProjectContext";
import { useOnConnect, useOnEdgeRemove, useOnNodeRemove } from "utils/handles";

const nodeTypes = {
  ADSR: ADSR,
  Analyser: Analyser,
  AndGate: AndGate,
  AudioBufferSource: AudioBufferSource,
  BiquadFilter: BiquadFilter,
  ChannelMerger: ChannelMerger,
  ChannelSplitter: ChannelSplitter,
  Comparator: Comparator,
  ConstantSource: ConstantSource,
  Delay: Delay,
  DelayEffect: DelayEffect,
  Destination: Destination,
  DynamicsCompressor: DynamicsCompressor,
  Equalizer: Equalizer,
  Gain: Gain,
  Gate: Gate,
  InputSwitch: InputSwitch,
  Keyboard: Keyboard,
  Meter: Meter,
  Metronome: Metronome,
  Noise: Noise,
  NotGate: NotGate,
  OrGate: OrGate,
  Oscillator: Oscillator,
  OscillatorNote: OscillatorNote,
  OutputSwitch: OutputSwitch,
  Quantizer: Quantizer,
  Rectifier: Rectifier,
  SampleAndHold: SampleAndHold,
  Sign: Sign,
  StereoPanner: StereoPanner,
  Transformer: Transformer,
  WaveShaper: WaveShaper,
  XorGate: XorGate,
};

function getEdgeWithColor(params: Edge | Connection) {
  if (!params.source) {
    return params;
  }

  return Object.assign({}, params, {
    style: {
      stroke: `#${params.source.substr(-6)}`,
    },
  });
}

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
}

export const GRID_SIZE = 10;

function snapToGrid(position: number) {
  return Math.floor(position / GRID_SIZE) * GRID_SIZE;
}

function Flow() {
  const { elements, onChangeElementFactory, setElements, setTransform, transform } = useProject();
  const contextMenu = useContextMenu();
  const { nodes: audioNodes } = useNodeContext();
  const [tryingToConnect, setTryingToConnect] = useState<OnConnectStartParams | null>(null);

  const onElementsConnect = useOnConnect();
  const onEdgeRemove = useOnEdgeRemove();
  const onNodeRemove = useOnNodeRemove();

  const onLoad = useCallback(
    async (reactFlowInstance: ReactFlowInstance) => {
      reactFlowInstance.setTransform(transform);

      // Attach onChange to nodes
      setElements(
        produce((draft: Elements) => {
          draft.filter(isNode).forEach(node => {
            node.data.onChange = onChangeElementFactory(node.id);
          });
        })
      );

      // Wait for nodes to render and handle connections
      // FIXME This should be handled on changes to ReactFlowRenderer state instead.
      await waitForInitialNodes(elements, audioNodes);
      const edges = elements.filter(isEdge);
      edges.forEach(edge => onElementsConnect(edge));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onMoveEnd = useCallback(
    transform => {
      setTransform(transform);
    },
    [setTransform]
  );

  const onConnectStart = useCallback((e: React.MouseEvent, params: OnConnectStartParams) => {
    setTryingToConnect(params);
  }, []);
  const onConnectStop = useCallback((e: MouseEvent) => setTryingToConnect(null), []);
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setElements((elements: Elements) => addEdge(getEdgeWithColor(params), elements));
      onElementsConnect(params);
    },
    [onElementsConnect, setElements]
  );
  const onElementsRemove = useCallback(
    (elementsToRemove: Elements) => {
      elementsToRemove.filter(isEdge).forEach(edge => onEdgeRemove(edge));
      elementsToRemove.filter(isNode).forEach(node => onNodeRemove(node.id));

      setElements((elements: Elements) => removeElements(elementsToRemove, elements));
    },
    [onEdgeRemove, onNodeRemove, setElements]
  );
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      onEdgeRemove(oldEdge);
      setElements((elements: Elements) => removeElements([oldEdge], elements));
      setElements((elements: Elements) => addEdge(getEdgeWithColor(newConnection), elements));
      onElementsConnect(newConnection);
    },
    [onEdgeRemove, onElementsConnect, setElements]
  );

  const onNodeDragStop = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>, draggedNode: ReactFlowNode) => {
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
    },
    [setElements]
  );

  const addNode = useCallback(
    (type: string) => {
      const id = `${type}-${uuidv4()}`;
      const onChange = onChangeElementFactory(id);
      const position = {
        x: snapToGrid((contextMenu.getRect().left - transform.x) / transform.zoom),
        y: snapToGrid((contextMenu.getRect().top - transform.y) / transform.zoom),
      };
      const node = {
        id,
        data: { onChange },
        type,
        position,
      };
      setElements((elements: Elements) => [...elements, node]);
      contextMenu.hide();
    },
    [contextMenu, onChangeElementFactory, setElements, transform]
  );

  const onPaneClick = useCallback(() => {
    contextMenu.hide();
  }, [contextMenu]);

  const onPaneContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      event.preventDefault();
      contextMenu.setRect({ width: 0, height: 0, top: event.clientY, right: 0, bottom: 0, left: event.clientX });
      contextMenu.show(<FlowContextMenu addNode={addNode} />);
    },
    [addNode, contextMenu]
  );

  return (
    <>
      <ReactFlow
        data-connecting-handletype={tryingToConnect ? tryingToConnect.handleType : undefined}
        defaultPosition={[transform.x, transform.y]}
        defaultZoom={transform.zoom}
        elements={elements}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectStop={onConnectStop}
        onEdgeUpdate={onEdgeUpdate}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onMoveEnd={onMoveEnd}
        onNodeDragStop={onNodeDragStop}
        onPaneClick={onPaneClick}
        onPaneContextMenu={onPaneContextMenu}
        onlyRenderVisibleElements={false}
        selectNodesOnDrag={false}
        snapToGrid
        snapGrid={[GRID_SIZE, GRID_SIZE]}
        // TODO figure out why this is needed for flow container not to cover context menu
        style={{ zIndex: 0 }}
      >
        <Background gap={GRID_SIZE} />
        <Controls />
      </ReactFlow>
    </>
  );
}

export default React.memo(Flow);
