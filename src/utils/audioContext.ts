import * as sac from "standardized-audio-context";

export * from "standardized-audio-context";

export type AudioNode = sac.IAudioNode<sac.AudioContext>;
export type AnalyserNode = sac.IAnalyserNode<sac.AudioContext>;
export type AudioBufferSourceNode = sac.IAudioBufferSourceNode<sac.AudioContext>;
export type BiquadFilterNode = sac.IBiquadFilterNode<sac.AudioContext>;
export type GainNode = sac.IGainNode<sac.AudioContext>;
