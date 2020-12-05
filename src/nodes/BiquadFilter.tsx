import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "nodes/Node";

const BiquadFilter = ({ data, id, selected, type: nodeType }: NodeProps) => {
  console.log("BiquadFilter render", data, id, selected);
  const { detune = 0, gain = 0, frequency = 350, Q = 1, onChange, type = "lowpass" } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<BiquadFilterNode>(() => context.createBiquadFilter(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.detune.value = detune), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency), [node, frequency]);
  useEffect(() => void (node.gain.value = gain), [node, gain]);
  useEffect(() => void (node.Q.value = Q), [node, Q]);
  useEffect(() => void (node.type = type), [node, type]);

  return (
    <Node
      id={id}
      inputs={["input", "detune", "frequency", "gain", "Q"]}
      outputs={["output"]}
      title={`Filter: ${type}`}
      type={nodeType}
    >
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              min={-100}
              max={100}
              onChange={e => onChange({ detune: +e.target.value })}
              step={1}
              type="range"
              value={detune}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              min={0}
              max={22050}
              onChange={e => onChange({ frequency: +e.target.value })}
              type="number"
              value={frequency}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              min={-40}
              max={40}
              onChange={e => onChange({ gain: +e.target.value })}
              step={0.1}
              type="range"
              value={gain}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              min={0.0001}
              max={1000}
              onChange={e => onChange({ Q: +e.target.value })}
              type="number"
              value={Q}
            />
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
              <option value="lowpass">lowpass</option>
              <option value="highpass">highpass</option>
              <option value="bandpass">bandpass</option>
              <option value="lowshelf">lowshelf</option>
              <option value="highshelf">highshelf</option>
              <option value="peaking">peaking</option>
              <option value="notch">notch</option>
              <option value="allpass">allpass</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
};

export default React.memo(BiquadFilter);
