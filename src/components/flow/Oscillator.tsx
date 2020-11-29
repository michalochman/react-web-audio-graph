import React, { useEffect, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { useOnOutputConnect } from "utils/handles";
import { useNode } from "context/NodeContext";

type Props = Node;

const Oscillator = ({ data, id }: Props) => {
  const node = useNode<OscillatorNode>(id);
  const onOutputConnect = useOnOutputConnect();

  const [frequency, setFrequency] = useState(node.frequency.value);
  useEffect(() => {
    node.frequency.value = frequency;
  }, [frequency]);

  const [type, setType] = useState(node.type);
  useEffect(() => {
    node.type = type;
  }, [type]);

  return (
    <div className="customNode" title={id}>
      <Handle id="detune" type="target" position={Position.Left} style={{ top: "40%" }} />
      <Handle id="frequency" type="target" position={Position.Left} style={{ top: "60%" }} />
      <Handle id="type" type="target" position={Position.Left} style={{ top: "80%" }} />

      <Handle id="output" onConnect={onOutputConnect} position={Position.Right} style={{ top: "20%" }} type="source" />

      <div style={{ textAlign: "right" }}>
        <span>output</span>
      </div>

      {/* TODO temporarily for easier testing of notes */}
      {data.children ? (
        data.children
      ) : (
        <>
          <div>detune: {(data.detune ?? 0).toFixed(2)}</div>
          <div>
            frequency:{" "}
            <input
              className="nodrag"
              min={0}
              max={20000}
              onChange={e => setFrequency(+e.target.value)}
              type="number"
              value={frequency}
            />{" "}
            Hz
          </div>
          <div>
            type:
            <select onChange={e => setType(e.target.value as OscillatorType)} value={type}>
              <option value="sawtooth">sawtooth</option>
              <option value="square">square</option>
              <option value="sine">sine</option>
              <option value="triangle">triangle</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default Oscillator;
