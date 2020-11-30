import React, { useContext, useEffect, useMemo, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import { useOnConnect } from "utils/handles";

type Props = Node;

const Oscillator = ({ data, id }: Props) => {
  const [detune, setDetune] = useState<number>(data.detune ?? 0);
  const [frequency, setFrequency] = useState<number>(data.frequency ?? 440);
  const [type, setType] = useState<OscillatorType>(data.type ?? "sine");

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

  const onConnect = useOnConnect();

  return (
    <div className="customNode" title={id}>
      <Handle id="detune" type="target" position={Position.Left} style={{ top: "40%" }} />
      <Handle id="frequency" type="target" position={Position.Left} style={{ top: "60%" }} />
      <Handle id="type" type="target" position={Position.Left} style={{ top: "80%" }} />

      <Handle id="output" onConnect={onConnect} position={Position.Right} style={{ top: "20%" }} type="source" />

      <div style={{ textAlign: "right" }}>
        <span>output</span>
      </div>
      <div>
        detune:
        <input
          className="nodrag"
          min={-100}
          max={100}
          onChange={e => setDetune(+e.target.value)}
          step={1}
          type="number"
          value={detune}
        />
      </div>
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
    </div>
  );
};

export default Oscillator;
