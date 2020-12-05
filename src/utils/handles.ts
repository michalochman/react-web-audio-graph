import { useCallback } from "react";
import { Connection, Edge } from "react-flow-renderer";
import { useNodeContext } from "context/NodeContext";

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
export function useOnConnect() {
  const { nodes } = useNodeContext();

  return useCallback(
    (connection: Edge | Connection) => {
      console.log("Connection created", connection);

      if (!connection.source || !connection.target || !connection.targetHandle) {
        return;
      }

      const source = nodes[connection.source];
      const target = nodes[connection.target];
      const targetHandle = connection.targetHandle;

      // connect AudioNode
      if (targetHandle === "input") {
        source.connect(target);
      }
      // connect AudioParam
      else {
        // @ts-ignore
        source.connect(target[targetHandle]);
      }
    },
    [nodes]
  );
}

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
export function useOnEdgeRemove() {
  const { nodes } = useNodeContext();

  return useCallback(
    (edge: Edge) => {
      console.log("Connection removed", edge);

      if (!edge.source || !edge.target || !edge.targetHandle) {
        return;
      }

      const source = nodes[edge.source];
      const target = nodes[edge.target];
      const targetHandle = edge.targetHandle;

      // connect AudioNode
      if (targetHandle === "input") {
        source.disconnect(target);
      }
      // connect AudioParam
      else {
        // @ts-ignore
        source.disconnect(target[targetHandle]);
      }
    },
    [nodes]
  );
}

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
export function useOnNodeRemove() {
  const { nodes } = useNodeContext();

  return useCallback(
    (nodeId: string) => {
      console.log("Node removed", nodeId, nodes);

      const node = nodes[nodeId];

      if (!node) {
        return;
      }

      node.disconnect();
    },
    [nodes]
  );
}
