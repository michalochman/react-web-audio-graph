import React, { useContext, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { channelCounts } from "utils/channels";

function ChannelMerger({ data, id, selected, type }: NodeProps) {
  const { inputs = 2, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<ChannelMergerNode>(() => context.createChannelMerger(inputs), [context, inputs]);
  useNode(id, node);

  return (
    <Node
      id={id}
      inputs={Array(node.numberOfInputs)
        .fill(0)
        .map((_, channel) => `input-${channel}`)}
      outputs={["output"]}
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
                  checked={inputs === +channelCount}
                  className="nodrag"
                  onChange={e => onChange({ inputs: +e.target.value })}
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

export default React.memo(ChannelMerger);
