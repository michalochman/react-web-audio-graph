import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";
import aubio from "aubiojs";

type Aubio = Awaited<ReturnType<typeof aubio>>;
type Tempo = Aubio["Tempo"];

class BeatDetectorProcessor extends StoppableAudioWorkletProcessor {
  Tempo?: Tempo;
  tempoDetector?: InstanceType<Tempo>;
  buffer: Float32Array;
  bufferSize: number;
  hopSize: number;
  bpm: number;

  constructor(options?: AudioWorkletNodeOptions) {
    super();

    this.bufferSize = options?.processorOptions.bufferSize ?? 1024;
    this.buffer = new Float32Array(this.bufferSize);
    this.hopSize = this.bufferSize / (options?.processorOptions.hopSizeFactor ?? 4);
    this.bpm = 0;

    aubio().then(({ Tempo }) => {
      this.Tempo = Tempo;
    });
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    const sampleFrames = inputs?.[0]?.[0]?.length;
    if (input.length === 0 || !sampleFrames || !this.Tempo) {
      return this.running;
    }

    this.buffer.set(this.buffer.slice(sampleFrames));
    this.buffer.set(inputs[0][0], this.buffer.length - sampleFrames);

    if (!this.tempoDetector) {
      this.tempoDetector = new this.Tempo(this.bufferSize, this.hopSize, sampleRate);
    }

    const result = this.tempoDetector.do(this.buffer);
    if (result) {
      this.bpm = this.tempoDetector.getBpm();
      this.port.postMessage(this.bpm);
    }

    for (let i = 0; i < sampleFrames; i++) {
      outputs[0][0][i] = this.bpm;
    }

    return this.running;
  }
}

registerProcessor("beat-detector-processor", BeatDetectorProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
