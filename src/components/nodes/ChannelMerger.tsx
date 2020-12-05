import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "components/nodes/Node";

// TODO add option to change number of inputs, now it only works in stereo
function ChannelMerger({ id, type }: NodeProps) {
  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<ChannelMergerNode>(() => context.createChannelMerger(2), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  return (
    <Node
      id={id}
      inputs={Array(node.numberOfInputs)
        .fill(0)
        .map((_, channel) => `input-${channel}`)}
      outputs={["output"]}
      type={type}
    />
  );
}

export default React.memo(ChannelMerger);
