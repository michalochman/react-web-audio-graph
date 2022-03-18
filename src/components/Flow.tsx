import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  OnConnectStartParams,
  useReactFlow,
  Viewport,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";
import ADSR from "components/nodes/ADSR";
import Analyser from "components/nodes/Analyser";
import AndGate from "components/nodes/AndGate";
import AudioBufferSource from "components/nodes/AudioBufferSource";
import BeatDetector from "components/nodes/BeatDetector";
import BiquadFilter from "components/nodes/BiquadFilter";
import ChannelMerger from "components/nodes/ChannelMerger";
import ChannelSplitter from "components/nodes/ChannelSplitter";
import Clipper from "components/nodes/Clipper";
import Comparator from "components/nodes/Comparator";
import ConstantSource from "components/nodes/ConstantSource";
import Convolver from "components/nodes/Convolver/Convolver";
import Delay from "components/nodes/Delay";
import DelayEffect from "components/nodes/DelayEffect";
import Destination from "components/nodes/Destination";
import DynamicsCompressor from "components/nodes/DynamicsCompressor";
import Equalizer from "components/nodes/Equalizer";
import FlowContextMenu from "components/FlowContextMenu";
import Gain from "components/nodes/Gain";
import Gate from "components/nodes/Gate";
import InputAudioStream from "components/nodes/InputAudioStream";
import InputSwitch from "components/nodes/InputSwitch";
import Keyboard from "components/nodes/Keyboard";
import Meter from "components/nodes/Meter";
import Metronome from "components/nodes/Metronome";
import Mixer from "components/nodes/Mixer";
import Noise from "components/nodes/Noise";
import NotGate from "components/nodes/NotGate";
import OrGate from "components/nodes/OrGate";
import Oscillator from "components/nodes/Oscillator";
import OscillatorNote from "components/nodes/OscillatorNote";
import OutputSwitch from "components/nodes/OutputSwitch";
import PitchDetector from "components/nodes/PitchDetector";
import Quantizer from "components/nodes/Quantizer";
import Rectifier from "components/nodes/Rectifier";
import SampleAndHold from "components/nodes/SampleAndHold";
import Sign from "components/nodes/Sign";
import StereoPanner from "components/nodes/StereoPanner";
import SubFlow from "components/nodes/SubFlow";
import Transformer from "components/nodes/Transformer";
import Tuner from "components/nodes/Tuner";
import WaveShaper from "components/nodes/WaveShaper";
import XorGate from "components/nodes/XorGate";
import XYPad from "components/nodes/XYPad";
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
  Clipper: Clipper,
  Comparator: Comparator,
  ConstantSource: ConstantSource,
  Convolver: Convolver,
  Delay: Delay,
  DelayEffect: DelayEffect,
  Destination: Destination,
  DynamicsCompressor: DynamicsCompressor,
  Equalizer: Equalizer,
  Gain: Gain,
  Gate: Gate,
  InputAudioStream: InputAudioStream,
  InputSwitch: InputSwitch,
  Keyboard: Keyboard,
  Meter: Meter,
  Metronome: Metronome,
  Mixer: Mixer,
  Noise: Noise,
  NotGate: NotGate,
  OrGate: OrGate,
  Oscillator: Oscillator,
  OscillatorNote: OscillatorNote,
  OutputSwitch: OutputSwitch,
  PitchDetector: PitchDetector,
  Quantizer: Quantizer,
  Rectifier: Rectifier,
  SampleAndHold: SampleAndHold,
  Sign: Sign,
  StereoPanner: StereoPanner,
  SubFlow: SubFlow,
  BeatDetector: BeatDetector,
  Transformer: Transformer,
  Tuner: Tuner,
  WaveShaper: WaveShaper,
  XorGate: XorGate,
  XYPad: XYPad,
};

function getEdgeWithColor(params: Edge | Connection) {
  if (!params.source) {
    return params;
  }

  return Object.assign({}, params, {
    style: {
      stroke: `#${params.source.slice(-6)}`,
    },
  });
}

async function waitForInitialNodes(initialEdges: Edge[], audioNodes: Record<string, AnyAudioNode>) {
  const nodesWithConnections = initialEdges.reduce<Record<string, boolean>>((nodeIds, edge) => {
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
  const {
    edges,
    nodes,
    onChangeElementFactory,
    onEdgesChange,
    onNodesChange,
    setEdges,
    setNodes,
    setTransform,
    transform,
  } = useProject();
  const { setViewport } = useReactFlow();
  const contextMenu = useContextMenu();
  const { nodes: audioNodes } = useNodeContext();
  const [tryingToConnect, setTryingToConnect] = useState<OnConnectStartParams | null>(null);

  const onElementsConnect = useOnConnect();
  const onEdgeRemove = useOnEdgeRemove();
  const onNodeRemove = useOnNodeRemove();

  const onInit = useCallback(
    async () => {
      setViewport(transform);

      // Attach onChange to nodes
      setNodes(
        produce(draft => {
          draft.forEach(node => void (node.data.onChange = onChangeElementFactory(node.id)));
        })
      );

      // Wait for nodes to render and handle connections
      // FIXME This should be handled on changes to ReactFlowRenderer state instead.
      await waitForInitialNodes(edges, audioNodes);
      edges.forEach(edge => onElementsConnect(edge));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const onMoveEnd = useCallback((event: any, transform: Viewport) => void setTransform(transform), [setTransform]);

  const onConnectStart = useCallback((e: any, params: OnConnectStartParams) => setTryingToConnect(params), []);
  const onConnectStop = useCallback(() => setTryingToConnect(null), []);
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      setEdges(edges => addEdge(getEdgeWithColor(params), edges));
      onElementsConnect(params);
    },
    [onElementsConnect, setEdges]
  );
  const onEdgesDelete = useCallback((edges: Edge[]) => edges.forEach(edge => onEdgeRemove(edge)), [onEdgeRemove]);
  const onNodesDelete = useCallback((nodes: Node[]) => nodes.forEach(node => onNodeRemove(node.id)), [onNodeRemove]);
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      const newEdge = getEdgeWithColor(newConnection);
      onEdgeRemove(oldEdge);
      setEdges(edges => applyEdgeChanges([{ id: oldEdge.id, type: "remove" }], addEdge(newEdge, edges)));
      onElementsConnect(newConnection);
    },
    [onEdgeRemove, onElementsConnect, setEdges]
  );

  const addNode = useCallback(
    (type: string) => {
      const id = `${type}-${uuidv4()}`;
      const data = { onChange: onChangeElementFactory(id) };
      const position = {
        x: snapToGrid((contextMenu.getRect().left - transform.x) / transform.zoom),
        y: snapToGrid((contextMenu.getRect().top - transform.y) / transform.zoom),
      };
      const zIndex = type === "SubFlow" ? -1 : undefined;
      const node = { id, data, type, position, zIndex };
      setNodes(nodes => [...nodes, node]);
      contextMenu.hide();
    },
    [contextMenu, onChangeElementFactory, setNodes, transform]
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
        edges={edges}
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectStop={onConnectStop}
        onEdgeUpdate={onEdgeUpdate}
        onEdgesChange={onEdgesChange}
        onEdgesDelete={onEdgesDelete}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onInit={onInit}
        onMoveEnd={onMoveEnd}
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
