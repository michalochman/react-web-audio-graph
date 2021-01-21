import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";

class XorGateProcessor extends StoppableAudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const output = outputs[0];

    for (let channel = 0; channel < output.length; ++channel) {
      const sampleFrames = output[channel].length;

      for (let i = 0; i < sampleFrames; i++) {
        output[channel][i] = (inputs[0]?.[channel]?.[i] ?? 0) ^ (inputs[1]?.[channel]?.[i] ?? 0);
      }
    }

    return this.running;
  }
}

registerProcessor("xor-gate-processor", XorGateProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
