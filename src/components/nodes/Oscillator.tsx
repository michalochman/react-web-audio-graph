import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";

function Oscillator({ data, id, selected, type: nodeType }: NodeProps) {
  const { detune = 0, frequency = 440, onChange, type = "sine" } = data;
  const frequencyDetuned = frequency * Math.pow(2, detune / 1200);

  // AudioNode
  const node = useNode(id, context => context.createOscillator());
  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  // AudioParam
  useEffect(() => void (node.detune.value = detune ?? 0), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency ?? 440), [node, frequency]);
  useEffect(() => void (node.type = type ?? "sine"), [node, type]);

  return (
    <Node
      id={id}
      inputs={["detune", "frequency"]}
      outputs={["output"]}
      title={`${frequencyDetuned.toFixed(2)} Hz ${type}`}
      type={nodeType}
    >
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              max={100}
              min={-100}
              onChange={e => onChange({ detune: +e.target.value })}
              step={1}
              style={{ width: "100%" }}
              title={`Detune: ${detune} cents`}
              type="range"
              value={detune}
            />
          </div>
          <div className="customNode_item">
            <input
              max={20000}
              min={0}
              onChange={e => onChange({ frequency: +e.target.value })}
              title="Frequency"
              type="number"
              value={frequency}
            />
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} title="Wave" value={type}>
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
