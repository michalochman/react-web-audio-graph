import React from "react";
import { NodeProps } from "react-flow-renderer";
import Node from "components/Node";
import useDynamicsCompressorNode from "hooks/nodes/useDynamicsCompressorNode";

function DynamicsCompressor({ data, id, selected, type }: NodeProps) {
  const { attack = 0.003, knee = 30, onChange, ratio = 12, release = 0.25, threshold = -24 } = data;
  useDynamicsCompressorNode(id, { attack, knee, ratio, release, threshold });

  return (
    <Node
      id={id}
      inputs={["input", "threshold", "knee", "ratio", "attack", "release"]}
      outputs={["output"]}
      type={type}
    >
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              min="-100"
              max="0"
              onChange={e => onChange({ threshold: +e.target.value })}
              step="1"
              title={`Threshold: ${threshold} dB`}
              type="range"
              value={threshold}
            />
          </div>
          <div className="customNode_item">
            <input
              min="0"
              max="40"
              onChange={e => onChange({ knee: +e.target.value })}
              step="1"
              title={`Knee: ${knee} dB`}
              type="range"
              value={knee}
            />
          </div>
          <div className="customNode_item">
            <input
              min="1"
              max="20"
              onChange={e => onChange({ ratio: +e.target.value })}
              step="1"
              title={`Ratio: ${ratio} dB`}
              type="range"
              value={ratio}
            />
          </div>
          <div className="customNode_item">
            <input
              min="0"
              max="1"
              onChange={e => onChange({ attack: +e.target.value })}
              step="0.001"
              title={`Attack: ${attack} s`}
              type="range"
              value={attack}
            />
          </div>
          <div className="customNode_item">
            <input
              min="0"
              max="1"
              onChange={e => onChange({ release: +e.target.value })}
              step="0.001"
              title={`Release: ${release} s`}
              type="range"
              value={release}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(DynamicsCompressor);
