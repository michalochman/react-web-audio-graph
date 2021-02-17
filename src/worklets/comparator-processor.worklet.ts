import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";

class ComparatorProcessor extends StoppableAudioWorkletProcessor {
  // Returns 1 if the first input is greater, -1 if the second input is greater or 0 if inputs are equal
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const output = outputs[0];

    for (let channel = 0; channel < output.length; ++channel) {
      const sampleFrames = output[channel].length;

      for (let i = 0; i < sampleFrames; i++) {
        const input1 = inputs[0]?.[channel]?.[i] ?? 0;
        const input2 = inputs[1]?.[channel]?.[i] ?? 0;
        output[channel][i] = input1 > input2 ? 1 : input1 < input2 ? -1 : 0;
      }
    }

    return this.running;
  }
}

registerProcessor("comparator-processor", ComparatorProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
