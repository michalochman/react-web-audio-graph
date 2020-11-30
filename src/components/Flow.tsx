import React, { useState } from "react";
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
import Analyser from "nodes/Analyser";
import Destination from "nodes/Destination";
import Gain from "nodes/Gain";
import Oscillator from "nodes/Oscillator";
import OscillatorNote from "nodes/OscillatorNote";
import { useOnEdgeRemove, useOnNodeRemove } from "utils/handles";

interface Props {
  edges: Elements;
  nodes: Elements;
}

const flowWrapperStyle: React.CSSProperties = {
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
};

const nodeTypes = {
  Analyser: Analyser,
  Destination: Destination,
  Gain: Gain,
  Oscillator: Oscillator,
  OscillatorNote: OscillatorNote,
};

function Flow({ edges: initialEdges, nodes: initialNodes }: Props) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const elements = [...nodes, ...edges];

  const onEdgeRemove = useOnEdgeRemove();
  const onNodeRemove = useOnNodeRemove();

  const onConnect = (params: Edge | Connection) => setEdges(elements => addEdge(params, elements));
  const onElementsRemove = (elementsToRemove: Elements) => {
    const elementIdsToRemove = elementsToRemove.map(el => el.id);
    const edgesToRemove = edges.filter(isEdge).filter(edge => elementIdsToRemove.includes(edge.id));
    const nodesToRemove = edges.filter(isNode).filter(node => elementIdsToRemove.includes(node.id));

    edgesToRemove.forEach(edge => onEdgeRemove(edge));
    nodesToRemove.forEach(node => onNodeRemove(node.id));

    setEdges(elements => removeElements(elementsToRemove, elements));
    setNodes(elements => removeElements(elementsToRemove, elements));
  };

  return (
    <div style={flowWrapperStyle}>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        snapToGrid
        snapGrid={[10, 10]}
      >
        <Background gap={10} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
