import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import Note from "components/Note";
import { getNoteFrequency } from "utils/notes";
import "./Keyboard.css";

const keysOptions = [16, 28, 40, 64, 88];
const keyTwelfthOffset = -3;
const keyBlack = "key key-black";
const keyWhite = "key key-white";

interface KeyboardNode extends ComplexAudioNode<undefined, undefined> {
  gate: ConstantSourceNode;
  frequency: ConstantSourceNode;
}

function Keyboard({ data, id, type }: NodeProps) {
  const { keys = 16, octave = 2, onChange } = data;

  // AudioNode
  const node = (useNode(id, context => {
    // Interface
    const gate = context.createConstantSource();
    const frequency = context.createConstantSource();

    return {
      frequency,
      gate,
      input: undefined,
      output: undefined,
    };
  }) as unknown) as KeyboardNode;
  useEffect(() => {
    node.frequency.offset.value = 0;
    node.frequency.start();
    node.gate.offset.value = 0;
    node.gate.start();

    return () => {
      node.gate.disconnect();
      node.gate.stop();
      node.frequency.disconnect();
      node.frequency.stop();
    };
  }, [node]);

  const setNote = useCallback(
    (octave: number, twelfth: number) => {
      const { context } = node.frequency;
      const noteFrequency = getNoteFrequency(octave, twelfth);
      node.frequency.offset.setTargetAtTime(noteFrequency, context.currentTime, 0.015);
    },
    [node]
  );
  const playNote = useCallback(() => void (node.gate.offset.value = 1), [node]);
  const stopNote = useCallback(() => void (node.gate.offset.value = 0), [node]);

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
