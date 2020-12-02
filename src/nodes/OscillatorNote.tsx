import React, { useContext, useEffect, useMemo } from "react";
import { NodeProps } from "react-flow-renderer";
import { AudioContext } from "context/AudioContext";
import { useNodeContext } from "context/NodeContext";
import { getNoteFrequency, getNoteName } from "utils/notes";
import Node from "nodes/Node";

const OscillatorNote = ({ data, id, selected, type: nodeType }: NodeProps) => {
  console.log("OscillatorNote render", data, id, selected);
  const { detune = 0, octave = 4, onChange, twelfth = 0, type = "sine" } = data;
  const frequency = getNoteFrequency(octave, twelfth);
  const note = getNoteName(octave, twelfth);

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
  useEffect(() => void (node.frequency.value = frequency), [node, frequency]);
  useEffect(() => void (node.type = type ?? "sine"), [node, type]);

  return (
    <Node id={id} inputs={["detune"]} outputs={["output"]} type={nodeType}>
      {selected && (
        <div className="customNode_editor">
          <div className="customNode_item">
            <input
              className="nodrag"
              min={-100}
              max={100}
              onChange={e => onChange({ detune: +e.target.value })}
              step={1}
              type="number"
              value={detune}
            />
          </div>
          <div className="customNode_item">
            <div>
              <button onClick={() => onChange({ octave: (11 + octave - 1) % 11 })}>-</button>
              <button onClick={() => onChange({ octave: (octave + 1) % 11 })}>+</button>
              octave: {octave}
              <br />
              <button onClick={() => onChange({ twelfth: (12 + twelfth - 1) % 12 })}>-</button>
              <button onClick={() => onChange({ twelfth: (twelfth + 1) % 12 })}>+</button>
              twelfth:
              {twelfth}
              <br />
              {note} @ {frequency.toFixed(2)} Hz
            </div>
          </div>
          <div className="customNode_item">
            <select onChange={e => onChange({ type: e.target.value })} value={type}>
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
};

export default React.memo(OscillatorNote);
