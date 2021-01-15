import React, { useCallback, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useNode } from "context/NodeContext";
import Node from "components/Node";
import { NoteSymbol, NoteValue } from "utils/notes";
import "fonts/bravura/bravura.css";

const noteStyle: React.CSSProperties = {
  fontFamily: "Bravura",
  fontSize: 20,
  height: 32,
  lineHeight: 2,
  padding: 0,
  width: 32,
};

function Metronome({ data, id, selected, type: nodeType }: NodeProps) {
  const { beatsPerMeasure = 4, beatsPerMinute = 120, notes = [NoteValue.Quarter], onChange } = data;

  // AudioNode
  const node = useNode(
    id,
    context => {
      const quarterNoteDurationInSeconds = 60 / beatsPerMinute;
      const quarterNoteFrequency = 880;
      const measureDurationInSeconds = quarterNoteDurationInSeconds * beatsPerMeasure;

      const buffer = context.createBuffer(1, context.sampleRate * measureDurationInSeconds, context.sampleRate);
      const channel = buffer.getChannelData(0);
      for (let note of notes) {
        const noteDurationInSeconds = (quarterNoteDurationInSeconds * NoteValue.Quarter) / note;
        const noteDurationInSamples = context.sampleRate * noteDurationInSeconds;
        const noteFrequency = (quarterNoteFrequency * note) / NoteValue.Quarter;
        const notesPerMeasure = (beatsPerMeasure * note) / NoteValue.Quarter;

        let phase = 0;
        let gain = 1;
        for (let i = 0; i < notesPerMeasure; i++) {
          for (let j = 0; j < noteDurationInSamples; j++) {
            const shouldAccent = i === 0;
            const frequency = shouldAccent ? noteFrequency * 1.33 : noteFrequency;
            const sample = j + Math.floor(i * noteDurationInSamples);
            const maxGain = 1 / notes.length;
            const gainAttack = Math.min(maxGain, j / (context.sampleRate * 0.015));

            channel[sample] += Math.sin(phase) * gain;
            phase = phase + (2 * Math.PI * frequency) / context.sampleRate;
            gain = Math.max(gainAttack - j / noteDurationInSamples, 0);
          }
        }
      }

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.loopEnd = measureDurationInSeconds;

      return source;
    },
    [beatsPerMeasure, notes.length, beatsPerMinute]
  );

  useEffect(() => {
    node.start();
    return () => node.stop();
  }, [node]);

  const toggleNote = useCallback(
    note => onChange({ notes: notes.includes(note) ? notes.filter((n: number) => n !== note) : notes.concat(note) }),
    [notes, onChange]
  );

  return (
    <Node id={id} outputs={["output"]} title={`Metronome: ${beatsPerMinute} BPM`} type={nodeType}>
      {selected && (
        <div className="customNode_editor nodrag">
          <div className="customNode_item">
            <input
              max={208}
              min={40}
              onChange={e => onChange({ beatsPerMinute: +e.target.value })}
              title="Beats Per Minute"
              type="number"
              value={beatsPerMinute}
            />
            <input
              max={8}
              min={1}
              onChange={e => onChange({ beatsPerMeasure: +e.target.value })}
              title="Beats Per Measure"
              type="number"
              value={beatsPerMeasure}
            />
          </div>
          <div className="customNode_item">
            <span style={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
              {[NoteValue.Whole, NoteValue.Half, NoteValue.Quarter, NoteValue.Eight, NoteValue.Sixteenth].map(note => (
                <button
                  key={note}
                  onClick={() => toggleNote(note)}
                  style={{ ...noteStyle, color: notes.includes(note) ? "#0d0" : "#d00" }}
                  title={`${NoteValue[note]} note`}
                >
                  {NoteSymbol[NoteValue[note] as any]}
                </button>
              ))}
            </span>
          </div>
        </div>
      )}
    </Node>
  );
}

export default React.memo(Metronome);
