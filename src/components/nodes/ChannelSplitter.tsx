import React, { useContext, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { channelCounts } from "utils/channels";

function ChannelSplitter({ data, id, selected, type }: NodeProps) {
  const { onChange, outputs = 2 } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<ChannelSplitterNode>(() => context.createChannelSplitter(outputs), [context, outputs]);
  useNode(id, node);

  return (
    <Node
      id={id}
      inputs={["input"]}
      outputs={Array(node.numberOfOutputs)
        .fill(0)
        .map((_, channel) => `output-${channel}`)}
      type={type}
    >
      {selected && (
        <div className="customNode_editor">
          <div
            className="customNode_item"
            style={{
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            {Object.keys(channelCounts).map(channelCount => (
              <label key={channelCount}>
                <input
                  checked={outputs === +channelCount}
                  className="nodrag"
                  onChange={e => onChange({ outputs: +e.target.value })}
                  type="radio"
                  value={+channelCount}
                />{" "}
                {/* @ts-ignore */}
                {channelCounts[channelCount]}
              </label>
            ))}
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(ChannelSplitter);
