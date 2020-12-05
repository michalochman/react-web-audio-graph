import React, { useContext, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

// TODO add option to change number of inputs, now it only works in stereo
function ChannelMerger({ id, type }: NodeProps) {
  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<ChannelMergerNode>(() => context.createChannelMerger(2), [context]);
  useNode(id, node);

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
