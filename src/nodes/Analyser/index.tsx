import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Visualiser from "./Visualiser";
import Node from "nodes/Node";

export type DataGetter = "getByteFrequencyData" | "getByteTimeDomainData";

const Analyser = ({ data, id, selected, type }: NodeProps) => {
  console.log("Analyser render", data, id, selected);
  const { dataGetter = "getByteTimeDomainData", fftSizeExp = 11, onChange } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<AnalyserNode>(() => context.createAnalyser(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.fftSize = Math.pow(2, fftSizeExp)), [node, fftSizeExp]);

  return (
    <Node id={id} inputs={["input", "fftSize"]} outputs={["output"]} type={type}>
      <div className="customNode_item">
        <Visualiser node={node} dataGetter={dataGetter} height={64} width={256} />
      </div>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              type="range"
              max="11"
              min="5"
              onChange={e => onChange({ fftSizeExp: +e.target.value })}
              step={1}
              value={fftSizeExp}
            />
            {Math.pow(2, fftSizeExp)}
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ dataGetter: e.target.value })} value={dataGetter}>
              <option value="getByteFrequencyData">Frequency</option>
              <option value="getByteTimeDomainData">Time Domain</option>
            </select>
          </div>
        </div>
      )}
    </Node>
  );
};

export default React.memo(Analyser);
