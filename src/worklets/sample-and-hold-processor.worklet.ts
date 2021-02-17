import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";
import { Parameters } from "./sample-and-hold-processor.types";

class SampleAndHoldProcessor extends StoppableAudioWorkletProcessor {
  nextHoldFrame: number[] = [];
  value: number[] = [];

  static get parameterDescriptors() {
    return [
      {
        name: Parameters.HoldTime,
        defaultValue: 0,
        minValue: 0,
        maxValue: Number.MAX_SAFE_INTEGER,
        automationRate: "k-rate" as AutomationRate,
      },
    ];
  }

  // Samples input and holds value for given holdTime
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<Parameters, Float32Array>) {
    const input = inputs[0];
    const output = outputs[0];

    for (let channel = 0; channel < input.length; ++channel) {
      const sampleFrames = input[channel].length;

      // initial value
      if (this.value[channel] == null) {
        this.value[channel] = input[channel][0];
      }

      // To keep things simple, let the hold time be at least the buffer length
      const holdTimeInFrames = Math.max(
        Math.floor(sampleRate / (1 / parameters[Parameters.HoldTime][0])),
        sampleFrames
      );

      const nextHoldFrame = this.nextHoldFrame[channel] ?? holdTimeInFrames;

      // Get new sample in current process run
      if (nextHoldFrame < currentFrame + sampleFrames) {
        const sampleFramesWithCurrentlyHeldValue = nextHoldFrame - currentFrame;

        // Copy held value until next hold frame
        for (let i = 0; i < sampleFramesWithCurrentlyHeldValue; i++) {
          output[channel][i] = this.value[channel];
        }

        // Sample new value to hold
        this.value[channel] = input[channel][sampleFramesWithCurrentlyHeldValue];

        // Save next hold frame
        this.nextHoldFrame[channel] = nextHoldFrame + holdTimeInFrames;

        // Copy new held value until end of buffer
        for (let i = sampleFramesWithCurrentlyHeldValue; i < sampleFrames; i++) {
          output[channel][i] = this.value[channel];
        }
      } else {
        for (let i = 0; i < sampleFrames; i++) {
          output[channel][i] = this.value[channel];
        }
      }
    }

    return this.running;
  }
}

registerProcessor("sample-and-hold-processor", SampleAndHoldProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
