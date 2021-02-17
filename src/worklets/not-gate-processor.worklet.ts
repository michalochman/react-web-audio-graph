import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";

class NotGateProcessor extends StoppableAudioWorkletProcessor {
  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const output = outputs[0];

    for (let channel = 0; channel < output.length; ++channel) {
      const sampleFrames = output[channel].length;

      for (let i = 0; i < sampleFrames; i++) {
        output[channel][i] = (inputs[0]?.[channel]?.[i] ?? 0) === 0 ? 1 : 0;
      }
    }

    return this.running;
  }
}

registerProcessor("not-gate-processor", NotGateProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
