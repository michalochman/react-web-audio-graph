import React, { useEffect, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { useOnOutputConnect } from "utils/handles";
import { useNode } from "context/NodeContext";

type Props = Node;

const Gain = ({ id }: Props) => {
  const node = useNode<GainNode>(id);
  const onOutputConnect = useOnOutputConnect();

  const [gain, setGain] = useState(node.gain.value);
  useEffect(() => {
    node.gain.value = gain;
  }, [gain, node]);

  return (
    <div className="customNode" title={id}>
      <Handle id="input" position={Position.Left} style={{ top: "33%" }} type="target" />
      <Handle id="gain" position={Position.Left} style={{ top: "66%" }} type="target" />

      <Handle id="output" onConnect={onOutputConnect} position={Position.Right} style={{ top: "33%" }} type="source" />

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
