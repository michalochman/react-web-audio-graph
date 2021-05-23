import React, { useCallback } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import Note from "components/Note";
import useConstantSourceNode from "hooks/nodes/useConstantSourceNode";
import { getNoteFrequency } from "utils/notes";
import "./Keyboard.css";

const keysOptions = [16, 28, 40, 64, 88];
const keyTwelfthOffset = -3;
const keyBlack = "key key-black";
const keyWhite = "key key-white";

function Keyboard({ data, id, type }: NodeProps) {
  const { keys = 16, octave = 2, onChange } = data;

  // Interface
  const gateNode = useConstantSourceNode(`${id}_gate`, {});
  const frequencyNode = useConstantSourceNode(`${id}_frequency`, {});

  const setNote = useCallback(
    (octave: number, twelfth: number) => {
      const { context } = frequencyNode;
      const noteFrequency = getNoteFrequency(octave, twelfth);
      frequencyNode.offset.setTargetAtTime(noteFrequency, context.currentTime, 0.015);
    },
    [frequencyNode]
  );
  const playNote = useCallback(() => void (gateNode.offset.value = 1), [gateNode]);
  const stopNote = useCallback(() => void (gateNode.offset.value = 0), [gateNode]);

  // AudioNode
  useNode(
    id,
    () => ({
      frequency: frequencyNode,
      gate: gateNode,
      input: undefined,
      output: undefined,
    }),
    [frequencyNode, gateNode]
  );

  return (
    <Node id={id} outputs={["frequency", "gate"]} title={`Keyboard`} type={type}>
      <div className="customNode_editor nodrag">
        <div className="customNode_item">
          <div className="keyboard" onMouseDown={playNote} onMouseLeave={stopNote} onMouseUp={stopNote}>
            {Array(keys)
              .fill(null)
              .map((_, keyIndex) => {
                const keyTwelfth = (((keyIndex + keyTwelfthOffset) % 12) + 12) % 12;
                const keyOctave = octave + Math.floor((keyIndex + keyTwelfthOffset) / 12);
                const keyClassName = [1, 3, 6, 8, 10].includes(keyTwelfth) ? keyBlack : keyWhite;

                return (
                  <button
                    className={keyClassName}
                    key={`${keyOctave}_${keyTwelfth}`}
                    onMouseEnter={() => setNote(keyOctave, keyTwelfth)}
                  >
                    <Note octave={keyOctave} twelfth={keyTwelfth} />
                  </button>
                );
              })}
          </div>
        </div>
        <div className="customNode_item">
          <input
            min={1}
            max={6}
            onChange={e => onChange({ octave: +e.target.value })}
            style={{ width: "50%" }}
            title="Octave"
            type="number"
            value={octave}
          />
          <select
            onChange={e => onChange({ keys: +e.target.value })}
            style={{ width: "50%" }}
            title="Keys"
            value={keys}
          >
            {keysOptions.map(keys => (
              <option key={keys} value={keys}>
                {keys}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Node>
  );
}

export default React.memo(Keyboard);
