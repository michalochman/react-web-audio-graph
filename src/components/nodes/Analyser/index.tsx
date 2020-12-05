import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import Visualiser from "./Visualiser";
import Node from "components/nodes/Node";

export enum DataType {
  Frequency = "Frequency",
  TimeDomain = "Time Domain",
}

function Analyser({ data, id, selected, type: nodeType }: NodeProps) {
  const { fftSizeExp = 11, onChange, paused = false, type = DataType.TimeDomain } = data;

  // AudioNode
  const context = useContext(AudioContext);
  const node = useMemo<AnalyserNode>(() => context.createAnalyser(), [context]);
  const { addNode } = useNodeContext();
  useEffect(() => void addNode(id, node), [addNode, node, id]);

  // AudioParam
  useEffect(() => void (node.fftSize = Math.pow(2, fftSizeExp)), [node, fftSizeExp]);

  return (
    <Node id={id} inputs={["input", "fftSize"]} outputs={["output"]} title={`Analyser: ${type}`} type={nodeType}>
      <div className="customNode_item">
        <Visualiser type={type} node={node} paused={paused} height={64} width={256} />
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
          <div className="customNode_item" style={{ justifyContent: "space-between" }}>
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
              <option value={DataType.Frequency}>{DataType.Frequency}</option>
              <option value={DataType.TimeDomain}>{DataType.TimeDomain}</option>
            </select>
            <label
              style={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <input
                className="nodrag"
                type="checkbox"
                checked={paused}
                onChange={e => onChange({ paused: !paused })}
              />
              Paused
            </label>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Analyser);
