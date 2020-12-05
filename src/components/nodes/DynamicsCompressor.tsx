import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "components/nodes/Node";

function DynamicsCompressor({ data, id, selected, type }: NodeProps) {
  const { attack = 0.003, knee = 30, onChange, ratio = 12, release = 0.25, threshold = -24 } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<DynamicsCompressorNode>(() => context.createDynamicsCompressor(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.threshold.value = threshold), [node, threshold]);
  useEffect(() => void (node.knee.value = knee), [node, knee]);
  useEffect(() => void (node.ratio.value = ratio), [node, ratio]);
  useEffect(() => void (node.attack.value = attack), [node, attack]);
  useEffect(() => void (node.release.value = release), [node, release]);

  return (
    <Node
      id={id}
      inputs={["input", "threshold", "knee", "ratio", "attack", "release"]}
      outputs={["output"]}
      type={type}
    >
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="0"
              min="-100"
              step="1"
              onChange={e => onChange({ threshold: +e.target.value })}
              value={threshold}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="40"
              min="0"
              step="1"
              onChange={e => onChange({ knee: +e.target.value })}
              value={knee}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="20"
              min="1"
              step="1"
              onChange={e => onChange({ ratio: +e.target.value })}
              value={ratio}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="1"
              min="0"
              step="0.001"
              onChange={e => onChange({ attack: +e.target.value })}
              value={attack}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="1"
              min="0"
              step="0.001"
              onChange={e => onChange({ release: +e.target.value })}
              value={release}
            />
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(DynamicsCompressor);
