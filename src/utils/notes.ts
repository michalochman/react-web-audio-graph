const NOTES = ["C", "C^#", "D", "D^#", "E", "F", "F^#", "G", "G^#", "A", "A^#", "B"];

export function getNoteFrequency(octave: number, twelfth: number) {
  if (octave < 0 || octave > 8) {
    throw new RangeError(`Octave must be between 0 and 8, is ${octave}`);
  }
  if (twelfth < 0 || twelfth > 11) {
    throw new RangeError(`Twelfth must be between 0 and 11, is ${twelfth}`);
  }

  const C0 = 16.35;
  return C0 * Math.pow(2, octave + twelfth / 12);
}

export function getNoteName(octave: number, twelfth: number) {
  if (octave < 0 || octave > 8) {
    throw new RangeError(`Octave must be between 0 and 8, is ${octave}`);
  }
  if (twelfth < 0 || twelfth > 11) {
    throw new RangeError(`Twelfth must be between 0 and 11, is ${twelfth}`);
  }

  return `${NOTES[twelfth % 12]}_${octave}`;
}
