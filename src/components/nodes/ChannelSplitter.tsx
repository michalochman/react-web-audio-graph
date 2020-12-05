import React, { useContext, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

// TODO add option to change number of outputs, now it only works in stereo
function ChannelSplitter({ id, type }: NodeProps) {
  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<ChannelSplitterNode>(() => context.createChannelSplitter(2), [context]);
  useNode(id, node);

  return (
    <Node
      id={id}
      inputs={["input"]}
      outputs={Array(node.numberOfOutputs)
        .fill(0)
        .map((_, channel) => `output-${channel}`)}
      type={type}
    />
  );
}

export default React.memo(ChannelSplitter);
