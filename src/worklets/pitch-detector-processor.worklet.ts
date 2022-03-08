import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";
import aubio from "aubiojs";
import { Pitch, PitchMethod } from "./pitch-detector-processor.types";

class PitchDetectorProcessor extends StoppableAudioWorkletProcessor {
  Pitch?: Pitch;
  pitchDetector?: InstanceType<Pitch>;
  buffer: Float32Array;
  bufferSize: number;
  hopSize: number;
  pitchMethod: PitchMethod;

  constructor(options?: AudioWorkletNodeOptions) {
    super();

    this.bufferSize = options?.processorOptions.bufferSize ?? 1024;
    this.buffer = new Float32Array(this.bufferSize);
    this.hopSize = this.bufferSize / (options?.processorOptions.hopSizeFactor ?? 4);
    this.pitchMethod = options?.processorOptions.method ?? PitchMethod.default;

    aubio().then(({ Pitch }) => {
      this.Pitch = Pitch;
    });
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const sampleFrames = inputs?.[0]?.[0]?.length;
    if (input.length === 0 || !sampleFrames || !this.Pitch) {
      return this.running;
    }

    this.buffer.set(this.buffer.slice(sampleFrames));
    this.buffer.set(inputs[0][0], this.buffer.length - sampleFrames);

    if (!this.pitchDetector) {
      this.pitchDetector = new this.Pitch("default", this.bufferSize, this.hopSize, sampleRate);
    }

    const frequency = this.pitchDetector.do(this.buffer);
    this.port.postMessage(frequency);

    for (let i = 0; i < sampleFrames; i++) {
      outputs[0][0][i] = frequency;
    }

    return this.running;
  }
}

registerProcessor("pitch-detector-processor", PitchDetectorProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
