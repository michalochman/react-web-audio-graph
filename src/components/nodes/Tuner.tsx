import React, { useEffect, useMemo, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { useThrottleFn } from "ahooks";
import Node from "components/Node";
import useAudioWorkletNode from "hooks/nodes/useAudioWorkletNode";
import { PitchMethod } from "worklets/pitch-detector-processor.types";
import { findClosestNote, getNoteFrequency, getNoteName } from "utils/notes";
import Note from "components/Note";
import RadialGauge from "components/RadialGauge";

// https://en.wikipedia.org/wiki/Just-noticeable_difference#Music_production_applications
const NEAR_PERFECT_CENTS = 5;
const JUST_NOTICABLE_CENTS = 10;
const HALF_STEP_CENTS = 100;

function frequencyRange(frequency: number, cents: number) {
  const delta = Math.pow(2, cents / 1200);
  return [frequency * (2 - delta), frequency * delta];
}

function Tuner({ id, type }: NodeProps) {
  const [pitch, setPitch] = useState(0);

  // AudioNode
  const node = useAudioWorkletNode(
    id,
    "pitch-detector-processor",
    { processorOptions: { bufferSize: 4096, hopSizeFactor: 4, method: PitchMethod.default } },
    []
  );

  // AudioWorklet messages
  const { run: handleMessage } = useThrottleFn(event => setPitch(event.data), { leading: true, wait: 100 });
  useEffect(() => {
    node.port.onmessage = handleMessage;
  }, [node, handleMessage]);

  const [octave, twelfth, cents] = findClosestNote(pitch);
  const noteFrequency = getNoteFrequency(octave, twelfth);
  const quarterStepRange = frequencyRange(noteFrequency, HALF_STEP_CENTS / 2);
  const justNoticableRange = frequencyRange(noteFrequency, JUST_NOTICABLE_CENTS);
  const nearPerfectRange = frequencyRange(noteFrequency, NEAR_PERFECT_CENTS);
  const highlights = useMemo(
    () => [
      { from: justNoticableRange[0], to: justNoticableRange[1], color: "#dd0" },
      { from: nearPerfectRange[0], to: nearPerfectRange[1], color: "#0d0" },
    ],
    [noteFrequency]
  );

  return (
    <Node id={id} inputs={["input"]} title={<Note cents={cents} octave={octave} twelfth={twelfth} />} type={type}>
      <div
        className="customNode_item"
        style={{
          alignItems: "flex-start",
          display: "flex",
          height: 120,
          overflow: "hidden",
        }}
      >
        <RadialGauge
          minValue={quarterStepRange[0]}
          maxValue={quarterStepRange[1]}
          value={pitch}
          highlights={highlights}
          highlightsWidth={5}
          majorTicks={[
            getNoteName(twelfth - 1, octave),
            getNoteName(twelfth, octave),
            getNoteName(twelfth + 1, octave),
          ]}
          minorTicks={0}
          startAngle={105}
          ticksAngle={150}
          height={200}
          width={200}
          valueBox={false}
          borders={false}
          colorMajorTicks="black"
          colorNeedle="red"
          colorNeedleEnd="red"
          colorNeedleCircleInner="black"
          colorNeedleCircleInnerEnd="black"
          colorNumbers="black"
          colorPlate="transparent"
          needleType="line"
          needleEnd={0}
          needleStart={110}
          needleWidth={1}
          needleCircleSize={5}
          needleCircleOuter={false}
        />
      </div>
    </Node>
  );
}

export default React.memo(Tuner);
