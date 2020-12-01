import React, { useContext, useEffect, useMemo, useState } from "react";
import { Handle, Node, Position } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Visualiser from "./Visualiser";

type Props = Node;

export type DataGetter = "getByteFrequencyData" | "getByteTimeDomainData";

const Analyser = ({ id }: Props) => {
  const [dataGetter, setDataGetter] = useState<DataGetter>("getByteTimeDomainData");
  const [fftSizeExp, setFftSizeExp] = useState(11);

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<AnalyserNode>(() => context.createAnalyser(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.fftSize = Math.pow(2, fftSizeExp)), [node, fftSizeExp]);

  return (
    <div className="customNode" title={id}>
      <Handle id="input" position={Position.Left} type="target" />

      <div>input</div>

      <div>
        fftSize:{" "}
        <input
          className="nodrag"
          type="range"
          max="11"
          min="5"
          onChange={e => setFftSizeExp(+e.target.value)}
          step={1}
          value={fftSizeExp}
        />
        {Math.pow(2, fftSizeExp)}
      </div>
      <div>
        type:
        <select onChange={e => setDataGetter(e.target.value as DataGetter)} value={dataGetter}>
          <option value="getByteFrequencyData">Frequency</option>
          <option value="getByteTimeDomainData">Time Domain</option>
        </select>
      </div>

      <Visualiser node={node} dataGetter={dataGetter} height={64} width={256} />
    </div>
  );
};

export default Analyser;
