import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";

const MESSAGE_CHANNELS = "channels";
const MESSAGE_LEVEL = "level";

class MeterProcessor extends StoppableAudioWorkletProcessor {
  process(inputs: Float32Array[][]) {
    const input = inputs[0];
    if (input.length === 0) {
      this.port.postMessage({ payload: { channel: 0, level: 0 }, type: MESSAGE_LEVEL });
      this.port.postMessage({ payload: { channels: input.length }, type: MESSAGE_CHANNELS });
      return this.running;
    }

    for (let channel = 0; channel < input.length; ++channel) {
      const level = getMaxAmplitude(input[channel]);
      this.port.postMessage({ payload: { channel, level }, type: MESSAGE_LEVEL });
    }

    this.port.postMessage({ payload: { channels: input.length }, type: MESSAGE_CHANNELS });

    return this.running;
  }
}

function getMaxAmplitude(buffer: Float32Array): number {
  let maxAmplitude = 0;

  const sampleFrames = buffer.length;
  for (let i = 0; i < sampleFrames; i++) {
    const amplitude = Math.abs(buffer[i]);
    if (amplitude > maxAmplitude) {
      maxAmplitude = amplitude;
    }
  }

  return maxAmplitude;
}

registerProcessor("meter-processor", MeterProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
