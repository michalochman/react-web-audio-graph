const NOTES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];

export enum NoteSymbol {
  Whole = "" as any,
  Half = "" as any,
  Quarter = "" as any,
  Sixteenth = "" as any,
  Eight = "" as any,
}

export enum NoteValue {
  Whole = 1 as any,
  Half = 2 as any,
  Quarter = 4 as any,
  Eight = 8 as any,
  Sixteenth = 16 as any,
}

export function assertOctaveValid(octave: number) {
  if (octave < 0 || octave > 10) {
    throw new RangeError(`Octave must be between 0 and 10, is ${octave}`);
  }
}

export function assertTwelfthValid(twelfth: number) {
  if (twelfth < 0 || twelfth > 11) {
    throw new RangeError(`Twelfth must be between 0 and 11, is ${twelfth}`);
  }
}

export function getNoteFrequency(octave: number, twelfth: number) {
  assertOctaveValid(octave);
  assertTwelfthValid(twelfth);

  const C0 = 16.3516;
  return C0 * Math.pow(2, octave + twelfth / 12);
}

export function getNoteName(twelfth: number) {
  assertTwelfthValid(twelfth);

  return NOTES[twelfth];
}
