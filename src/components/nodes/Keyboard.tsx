import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { ComplexAudioNode, useNode } from "context/NodeContext";
import Node from "components/Node";
import { getNoteFrequency } from "utils/notes";
import "./Keyboard.css";

const keyBlack = "key key-black";
const keyWhite = "key key-white";

interface KeyboardNode extends ComplexAudioNode<undefined, undefined> {
  gate: ConstantSourceNode;
  frequency: ConstantSourceNode;
}

function Keyboard({ data, id, type }: NodeProps) {
  const { octave = 2, onChange } = data;

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
      <div className="customNode_item nodrag">
        <div className="keyboard" onMouseDown={playNote} onMouseLeave={stopNote} onMouseUp={stopNote}>
          <button className={keyWhite} onMouseEnter={() => setNote(octave - 1, 9)}>
            1
          </button>
          <button className={keyBlack} onMouseEnter={() => setNote(octave - 1, 10)}>
            2
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave - 1, 11)}>
            3
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave, 0)}>
            4
          </button>
          <button className={keyBlack} onMouseEnter={() => setNote(octave, 1)}>
            5
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave, 2)}>
            6
          </button>
          <button className={keyBlack} onMouseEnter={() => setNote(octave, 3)}>
            7
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave, 4)}>
            8
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave, 5)}>
            9
          </button>
          <button className={keyBlack} onMouseEnter={() => setNote(octave, 6)}>
            10
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave, 7)}>
            11
          </button>
          <button className={keyBlack} onMouseEnter={() => setNote(octave, 8)}>
            12
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave, 9)}>
            13
          </button>
          <button className={keyBlack} onMouseEnter={() => setNote(octave, 10)}>
            14
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave, 11)}>
            15
          </button>
          <button className={keyWhite} onMouseEnter={() => setNote(octave + 1, 0)}>
            16
          </button>
        </div>
      </div>
      <div className="customNode_item">
        <input
          className="nodrag"
          min={1}
          max={6}
          onChange={e => onChange({ octave: +e.target.value })}
          type="number"
          value={octave}
        />
      </div>
    </Node>
  );
}

export default React.memo(Keyboard);
