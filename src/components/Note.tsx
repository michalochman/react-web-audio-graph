import React from "react";
import { getNoteFrequency, getNoteName } from "utils/notes";

interface Props {
  detune: number;
  octave: number;
  twelfth: number;
}

const modifierStyles: React.CSSProperties = {
  display: "inline-block",
  textAlign: "center",
  width: 7,
};
const octaveStyles: React.CSSProperties = {
  ...modifierStyles,
  verticalAlign: "sub",
};
const accidentalStyles: React.CSSProperties = {
  ...modifierStyles,
  transform: "translateX(-100%)",
  verticalAlign: "super",
};

function Note({ detune, octave, twelfth }: Props) {
  const [name, accidental] = getNoteName(twelfth).split("");
  const frequency = getNoteFrequency(octave, twelfth);
  const frequencyDetuned = frequency * Math.pow(2, detune / 1200);

  return (
    <span>
      {name}
      <small style={octaveStyles}>{octave}</small>
      {accidental && <small style={accidentalStyles}>{accidental}</small>}
      &nbsp;
      <small>
        ({frequency.toFixed(2)} Hz
        {detune !== 0 && <> &rarr; {frequencyDetuned.toFixed(2)} Hz</>})
      </small>
    </span>
  );
}

export default React.memo(Note);
