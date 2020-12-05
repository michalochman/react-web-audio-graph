import React from "react";
import { getNoteFrequency, getNoteName } from "utils/notes";

interface Props {
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

function Note({ octave, twelfth }: Props) {
  const [name, accidental] = getNoteName(twelfth).split("");
  const frequency = getNoteFrequency(octave, twelfth);

  return (
    <span>
      {name}
      <small style={octaveStyles}>{octave}</small>
      {accidental && <small style={accidentalStyles}>{accidental}</small>}
      <small> ({frequency.toFixed(2)} Hz)</small>
    </span>
  );
}

export default React.memo(Note);
