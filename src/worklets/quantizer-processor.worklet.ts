import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";

class QuantizerProcessor extends StoppableAudioWorkletProcessor {
  levels: number;
  max: number;
  min: number;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    this.levels = options?.processorOptions.levels ?? 256;
    this.max = options?.processorOptions.max ?? 1;
    this.min = options?.processorOptions.min ?? -1;
  }

  // Depending on the mode, either blocks or inverts negative amplitudes.
  // 1) in Full-wave mode inverts negative amplitides, i.e. changes sign to positive
  // 2) in Half-wave mode blocks negative amplitudes, i.e. returns as 0
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const output = outputs[0];

    for (let channel = 0; channel < input.length; ++channel) {
      const sampleFrames = input[channel].length;

      for (let i = 0; i < sampleFrames; i++) {
        output[channel][i] = quantize(this.min, this.max, this.levels, input[channel][i]);
      }
    }

    return this.running;
  }
}

function quantize(min: number, max: number, levels: number, value: number): number {
  if (value <= min) {
    return min;
  }

  if (value >= max) {
    return max;
  }

  const quantum = (max - min) / levels;

  if (!quantum) {
    return 0;
  }

  const remainder = value % quantum;

  return value - remainder;
}

registerProcessor("quantizer-processor", QuantizerProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
