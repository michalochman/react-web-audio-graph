import aubio from "aubiojs";

export type Aubio = Awaited<ReturnType<typeof aubio>>;
export type Pitch = Aubio["Pitch"];

// See: https://aubio.org/doc/0.4.7/pitch_8h.html#pitch
export enum PitchMethod {
  "default" = "default",
  "yin" = "yin",
  "mcomb" = "mcomb",
  "schmitt" = "schmitt",
  "fcomb" = "fcomb",
  "yinfft" = "yinfft",
  "yinfast" = "yinfast",
  "specacf" = "specacf",
}
