import React, { useContext, useEffect, useMemo, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import { useOnConnect } from "utils/handles";

type Props = Node;

const BiquadFilter = ({ data, id }: Props) => {
  const [detune, setDetune] = useState<number>(data.detune ?? 0);
  const [gain, setGain] = useState<number>(data.gain ?? 0);
  const [frequency, setFrequency] = useState<number>(data.frequency ?? 350);
  const [q, setQ] = useState<number>(data.q ?? 1);
  const [type, setType] = useState<BiquadFilterType>(data.type ?? "lowpass");

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<BiquadFilterNode>(() => context.createBiquadFilter(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.detune.value = detune), [node, detune]);
  useEffect(() => void (node.frequency.value = frequency), [node, frequency]);
  useEffect(() => void (node.gain.value = gain), [node, gain]);
  useEffect(() => void (node.Q.value = q), [node, q]);
  useEffect(() => void (node.type = type), [node, type]);

  const onConnect = useOnConnect();

  return (
    <div className="customNode" title={id}>
      <Handle id="input" position={Position.Left} style={{ top: "33%" }} type="target" />
      {/*<Handle id="gain" position={Position.Left} style={{ top: "66%" }} type="target" />*/}

      <Handle id="output" onConnect={onConnect} position={Position.Right} style={{ top: "10%" }} type="source" />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ paddingRight: 8 }}>input</span>
        <span>output</span>
      </div>
      <div>
        type:
        <select onChange={e => setType(e.target.value as BiquadFilterType)} value={type}>
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
      {["lowshelf", "highshelf", "peaking"].includes(type) && (
        <div>
          gain:{" "}
          <input
            className="nodrag"
            type="range"
            max="40"
            min="-40"
            onChange={e => setGain(+e.target.value)}
            step={0.01}
            value={gain}
          />
          {gain.toFixed(2)} dB
        </div>
      )}
      {["lowpass", "highpass", "bandpass", "peaking", "notch", "allpass"].includes(type) && (
        <div>
          Q:{" "}
          <input
            className="nodrag"
            type="range"
            max="1000"
            min="0.0001"
            onChange={e => setQ(+e.target.value)}
            step={0.0001}
            value={q}
          />
          {q.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default BiquadFilter;
