import { useCallback } from "react";
import { Connection, Edge } from "react-flow-renderer";
import { useNodeContext } from "context/NodeContext";

function getChannelIndex(handle: string): number {
  return +(handle.match(/-(\d+)$/)?.[1] ?? 0);
}

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
export function useOnConnect() {
  const { nodes } = useNodeContext();

  return useCallback(
    (connection: Edge | Connection) => {
      console.log("Connection created", connection);

      if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
        return;
      }

      const source = nodes[connection.source];
      const target = nodes[connection.target];
      const sourceHandle = connection.sourceHandle;
      const targetHandle = connection.targetHandle;
      const outputIndex = getChannelIndex(sourceHandle);
      const inputIndex = getChannelIndex(targetHandle);

      // connect AudioNode
      if (targetHandle.startsWith("input")) {
        source.connect(target, outputIndex, inputIndex);
      }
      // connect AudioParam
      else {
        // @ts-ignore
        source.connect(target[targetHandle], outputIndex);
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

      if (!edge.source || !edge.target || !edge.sourceHandle || !edge.targetHandle) {
        return;
      }

      const source = nodes[edge.source];
      const target = nodes[edge.target];
      const sourceHandle = edge.sourceHandle;
      const targetHandle = edge.targetHandle;
      const outputIndex = getChannelIndex(sourceHandle);
      const inputIndex = getChannelIndex(targetHandle);

      // disconnect AudioNode
      if (targetHandle.startsWith("input")) {
        source.disconnect(target, outputIndex, inputIndex);
      }
      // disconnect AudioParam
      else {
        // @ts-ignore
        source.disconnect(target[targetHandle], outputIndex);
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
