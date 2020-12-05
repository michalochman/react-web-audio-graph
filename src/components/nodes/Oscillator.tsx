import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Node from "components/nodes/Node";

function Oscillator({ data, id, selected, type: nodeType }: NodeProps) {
  const { detune = 0, frequency = 440, onChange, type = "sine" } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<OscillatorNode>(() => context.createOscillator(), [context]);
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.detune.value = detune ?? 0), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency ?? 440), [node, frequency]);
  useEffect(() => void (node.type = type ?? "sine"), [node, type]);

  return (
    <Node
      id={id}
      inputs={["detune", "frequency"]}
      outputs={["output"]}
      title={`${frequency} Hz ${type}`}
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
              type="number"
              value={detune}
            />
          </div>
          <div className="customNode_item">
            <input
              className="nodrag"
              min={0}
              max={20000}
              onChange={e => onChange({ frequency: +e.target.value })}
              type="number"
              value={frequency}
            />
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
              <option value="sawtooth">sawtooth</option>
              <option value="square">square</option>
              <option value="sine">sine</option>
              <option value="triangle">triangle</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Oscillator);
