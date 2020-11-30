import React, { useContext, useEffect, useMemo, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import { useOnConnect } from "utils/handles";

type Props = Node;

const Gain = ({ data, id }: Props) => {
  const [gain, setGain] = useState<number>(data.gain);

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<GainNode>(() => context.createGain(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.gain.value = gain), [node, gain]);

  const onConnect = useOnConnect();

  return (
    <div className="customNode" title={id}>
      <Handle id="input" position={Position.Left} style={{ top: "33%" }} type="target" />
      <Handle id="gain" position={Position.Left} style={{ top: "66%" }} type="target" />

      <Handle id="output" onConnect={onConnect} position={Position.Right} style={{ top: "33%" }} type="source" />

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
        gain:{" "}
        <input
          className="nodrag"
          type="range"
          max="1"
          min="0"
          onChange={e => setGain(+e.target.value)}
          step={0.01}
          value={gain}
        />
        {gain.toFixed(2)}
      </div>
    </div>
  );
};

export default Gain;
