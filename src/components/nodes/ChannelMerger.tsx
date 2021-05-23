import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useChannelMergerNode from "hooks/nodes/useChannelMergerNode";
import { channelCounts } from "utils/channels";

function ChannelMerger({ data, id, selected, type }: NodeProps) {
  const { inputs = 2, onChange } = data;
  const node = useChannelMergerNode(id, { inputs });

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
        <div className="customNode_editor nodrag">
          <div className="customNode_item" style={{ alignItems: "flex-start", flexDirection: "column" }}>
            {Object.keys(channelCounts).map(channelCount => (
              <label key={channelCount} title="Channel configuration">
                <input
                  checked={inputs === +channelCount}
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
