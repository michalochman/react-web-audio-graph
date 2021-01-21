import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";

class SignProcessor extends StoppableAudioWorkletProcessor {
  // Returns sign of the signal amplitude, i.e. 1 for positive amplitude, -1 for negative and 0 for 0
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const output = outputs[0];

    for (let channel = 0; channel < input.length; ++channel) {
      const sampleFrames = input[channel].length;

      for (let i = 0; i < sampleFrames; i++) {
        output[channel][i] = Math.sign(input[channel][i]);
      }
    }

    return this.running;
  }
}

registerProcessor("sign-processor", SignProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
