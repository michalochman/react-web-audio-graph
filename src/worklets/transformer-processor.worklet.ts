import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";

class TransformerProcessor extends StoppableAudioWorkletProcessor {
  transform: (value: number) => number;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

    const inputMax = options?.processorOptions.inputMax ?? 1;
    const inputMin = options?.processorOptions.inputMin ?? -1;
    const outputMax = options?.processorOptions.outputMax ?? 1;
    const outputMin = options?.processorOptions.outputMin ?? 0;
    this.transform = minMax.bind(undefined, inputMin, inputMax, outputMin, outputMax);
  }

  // Inverts the signal amplitude
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const output = outputs[0];

    for (let channel = 0; channel < output.length; ++channel) {
      const sampleFrames = output[channel].length;

      for (let i = 0; i < sampleFrames; i++) {
        output[channel][i] = this.transform(input?.[channel]?.[i] ?? 0);
      }
    }

    return this.running;
  }
}

function minMax(inputMin: number, inputMax: number, outputMin: number, outputMax: number, value: number): number {
  return outputMin + ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin);
}

registerProcessor("transformer-processor", TransformerProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
