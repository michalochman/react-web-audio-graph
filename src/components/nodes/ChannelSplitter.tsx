import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useChannelSplitterNode from "hooks/nodes/useChannelSplitterNode";
import { channelCounts } from "utils/channels";

function ChannelSplitter({ data, id, selected, type }: NodeProps) {
  const { onChange, outputs = 2 } = data;
  const node = useChannelSplitterNode(id, { outputs });

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
        <div className="customNode_editor nodrag">
          <div className="customNode_item" style={{ alignItems: "flex-start", flexDirection: "column" }}>
            {Object.keys(channelCounts).map(channelCount => (
              <label key={channelCount} title="Channel configuration">
                <input
                  checked={outputs === +channelCount}
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
