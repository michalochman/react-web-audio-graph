const GATE_OFF = 0;
const GATE_ON = 1;

export enum Mode {
  Exponential = "Exponential",
  Linear = "Linear",
  Logarithmic = "Logarithmic",
}

export enum Parameters {
  AttackTime = "attack",
  DecayTime = "decay",
  ReleaseTime = "release",
  SustainLevel = "sustain",
}

export enum Stage {
  Attack = "Attack",
  Decay = "Decay",
  Release = "Release",
  Sustain = "Sustain",
}
