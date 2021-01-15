import React, { useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Visualiser from "./Visualiser";
import Node from "components/Node";

export enum DataType {
  Frequency = "Frequency",
  TimeDomain = "Time Domain",
}

function Analyser({ data, id, selected, type: nodeType }: NodeProps) {
  const { fftSizeExp = 11, onChange, paused = false, type = DataType.TimeDomain } = data;

  // AudioNode
  const node = useNode(id, context => context.createAnalyser());

  // AudioParam
  useEffect(() => void (node.fftSize = Math.pow(2, fftSizeExp)), [node, fftSizeExp]);

  return (
    <Node id={id} inputs={["input", "fftSize"]} outputs={["output"]} title={`Analyser: ${type}`} type={nodeType}>
      <div className="customNode_item">
        <Visualiser type={type} node={node} paused={paused} height={64} width={256} />
      </div>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              type="range"
              max="15"
              min="5"
              onChange={e => onChange({ fftSizeExp: +e.target.value })}
              step={1}
              value={fftSizeExp}
            />
            {Math.pow(2, fftSizeExp)}
          </div>
          <div className="customNode_item" style={{ justifyContent: "space-between" }}>
            <select onChange={e => onChange({ type: e.target.value })} title="Type" value={type}>
              <option value={DataType.Frequency}>{DataType.Frequency}</option>
              <option value={DataType.TimeDomain}>{DataType.TimeDomain}</option>
            </select>
            <label>
              <input checked={paused} onChange={e => onChange({ paused: !paused })} title="Pause" type="checkbox" />
              Paused
            </label>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Analyser);
