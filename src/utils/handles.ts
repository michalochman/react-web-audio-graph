import { useCallback } from "react";
import { Connection, Edge } from "react-flow-renderer";
import { useNodeContext } from "context/NodeContext";
import { nodeCleanup } from "components/Nodes";

function getChannelIndex(handle: string): number {
  return +(handle.match(/-(\d+)$/)?.[1] ?? 0);
}

interface ResolvedConnection {
  inputIndex?: number;
  outputIndex?: number;
  source: AudioNode;
  target: AudioNode | AudioParam;
}

function resolveConnection(
  connection: Edge | Connection,
  getNode: (id: string) => AudioNode
): ResolvedConnection | never {
  if (!connection.source || !connection.target || !connection.sourceHandle || !connection.targetHandle) {
    throw new Error("Invalid connection");
  }

  const connectToNode = connection.targetHandle.startsWith("input");
  const source = getNode(connection.source);
  const target = getNode(connection.target);

  return {
    inputIndex: connectToNode ? getChannelIndex(connection.targetHandle) : undefined,
    outputIndex: getChannelIndex(connection.sourceHandle),
    source: source,
    target: connectToNode
      ? target
      : // @ts-ignore
        target[connection.targetHandle],
  };
}

export function connectNodes(connection: Edge | Connection, getNode: (id: string) => AudioNode) {
  try {
    const { inputIndex, outputIndex, source, target } = resolveConnection(connection, getNode);
    if (inputIndex != null) {
      // @ts-ignore
      source.connect(target, outputIndex, inputIndex);
    } else {
      // @ts-ignore
      source.connect(target, outputIndex);
    }
  } catch (e) {
    console.error(e);
  }
}

export function disconnectNodes(connection: Edge | Connection, getNode: (id: string) => AudioNode) {
  try {
    const { inputIndex, outputIndex, source, target } = resolveConnection(connection, getNode);
    if (inputIndex != null) {
      // @ts-ignore
      source.disconnect(target, outputIndex, inputIndex);
    } else {
      // @ts-ignore
      source.disconnect(target, outputIndex);
    }
  } catch (e) {
    console.error(e);
  }
}

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
export function useOnConnect() {
  const { getNode } = useNodeContext();

  return useCallback((connection: Edge | Connection) => connectNodes(connection, getNode), [getNode]);
}

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
export function useOnEdgeRemove() {
  const { getNode } = useNodeContext();

  return useCallback((edge: Edge) => disconnectNodes(edge, getNode), [getNode]);
}

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
export function useOnNodeRemove() {
  const { getNode } = useNodeContext();

  return useCallback((nodeId: string) => nodeCleanup(getNode(nodeId)), [getNode]);
}
