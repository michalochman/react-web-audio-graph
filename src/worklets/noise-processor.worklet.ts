import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";
import { NoiseType } from "./noise-processor.types";

class NoiseProcessor extends StoppableAudioWorkletProcessor {
  fillWithNoise: (data: Float32Array) => void;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    const type: NoiseType = options?.processorOptions.type ?? NoiseType.White;
    this.fillWithNoise = generators[type];
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const output = outputs[0];

    for (let channel = 0; channel < output.length; ++channel) {
      this.fillWithNoise(output[channel]);
    }

    return this.running;
  }
}

const generators = {
  [NoiseType.Brown]: fillWithBrownNoise,
  [NoiseType.Pink]: fillWithPinkNoise,
  [NoiseType.White]: fillWithWhiteNoise,
};

// See: https://noisehack.com/generate-noise-web-audio-api/
function fillWithWhiteNoise(data: Float32Array) {
  const sampleFrames = data.length;
  for (let i = 0; i < sampleFrames; i++) {
    data[i] = Math.random() * 2 - 1;
  }
}

// See: https://noisehack.com/generate-noise-web-audio-api/
function fillWithPinkNoise(data: Float32Array) {
  const sampleFrames = data.length;
  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;
  for (let i = 0; i < sampleFrames; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    data[i] *= 0.11; // (roughly) compensate for gain
    b6 = white * 0.115926;
  }
}

// See: https://noisehack.com/generate-noise-web-audio-api/
function fillWithBrownNoise(data: Float32Array) {
  const sampleFrames = data.length;
  let lastOut = 0.0;
  for (let i = 0; i < sampleFrames; i++) {
    const white = Math.random() * 2 - 1;
    data[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = data[i];
    data[i] *= 3.5; // (roughly) compensate for gain
  }
}

registerProcessor("noise-processor", NoiseProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
