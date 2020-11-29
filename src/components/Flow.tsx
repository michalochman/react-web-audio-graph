import React, { useState } from "react";
import ReactFlow, { addEdge, Background, Connection, Controls, Edge, Elements } from "react-flow-renderer";
import Analyser from "components/flow/Analyser";
import Destination from "components/flow/Destination";
import Gain from "components/flow/Gain";
import Oscillator from "components/flow/Oscillator";
import { useNodeContext } from "context/NodeContext";

interface Props {
  children: React.ReactNode[];
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
};

// TODO consider sending elements as props and couple AudioNodes with ReactFlow nodes
function Flow({ children }: Props) {
  const { addNode } = useNodeContext();

  // Takes AudioNodes provided as children and creates ReactFlow nodes
  const nodes: Elements =
    children?.filter(React.isValidElement).map((child: any) => {
      const type = (child?.type as React.FC).displayName ?? "default";

      return {
        id: `${type}-${child.props.id}`,
        type: type,
        data: child.props,
        // TODO provide this in props
        position: {
          x: 20,
          y: 20,
        },
      };
    }) ?? [];

  const [edges, setEdges] = useState<Elements>([]);

  const onConnect = (params: Edge | Connection) => setEdges(els => addEdge(params, els));

  return (
    <>
      <div style={flowWrapperStyle}>
        <ReactFlow
          elements={[...nodes, ...edges]}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          snapToGrid
          snapGrid={[10, 10]}
        >
          <Background gap={10} />
          <Controls />
        </ReactFlow>
      </div>

      {/* AudioNodes render nothing, but are instantiated and available to reference by ID */}
      {React.Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          ref: (node: any) => {
            const type = (child?.type as React.FC).displayName ?? "default";
            const id = `${type}-${child.props.id}`;
            addNode(id, node);
          },
        });
      })}
    </>
  );
}

export default Flow;
