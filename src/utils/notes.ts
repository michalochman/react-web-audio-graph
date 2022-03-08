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

export const OCTAVES = 11;
export const TWELFTHS = 12;
const ALL_NOTES = Array(OCTAVES)
  .fill(0)
  .flatMap((_, octave) => {
    return Array(TWELFTHS)
      .fill(0)
      .map((_, twelfth) => [octave, twelfth, getNoteFrequency(octave, twelfth)]);
  });

export function findClosestNote(pitch: number) {
  let noteIndex = ALL_NOTES.findIndex(([, , frequency]) => frequency > pitch);
  if (noteIndex < 1) {
    noteIndex = 29;
  }

  const notesOffset = Math.abs(ALL_NOTES[noteIndex - 1][2] - pitch) < Math.abs(ALL_NOTES[noteIndex][2] - pitch) ? 0 : 1;
  const [octave, twelfth] = ALL_NOTES[noteIndex + notesOffset - 1];
  const cents = 1200 * Math.log2(pitch / ALL_NOTES[noteIndex + notesOffset - 1][2]);

  return [octave, twelfth, cents];
}

export function getNoteFrequency(octave: number, twelfth: number) {
  // @ts-ignore
  [twelfth, octave] = normalizeNote(twelfth, octave);

  const C0 = 16.3516;
  return C0 * Math.pow(2, octave + twelfth / TWELFTHS);
}

export function getNoteName(twelfth: number, octave?: number) {
  [twelfth, octave] = normalizeNote(twelfth, octave);

  const note = NOTES[twelfth].split("");
  if (octave != null) {
    note.splice(1, 0, `${octave}`);
  }

  return note.join("");
}

function normalizeNote(twelfth: number, octave?: number): [number, number?] {
  octave = octave ? octave + Math.floor(twelfth / TWELFTHS) : octave;
  twelfth = Math.abs(((twelfth % TWELFTHS) + TWELFTHS) % TWELFTHS);

  return [twelfth, octave];
}
