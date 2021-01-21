import StoppableAudioWorkletProcessor from "./StoppableAudioWorkletProcessor";
const GATE_OFF = "gateOff";
const GATE_ON = "gateOn";

class GateProcessor extends StoppableAudioWorkletProcessor {
  lastMessage?: string;

  // Naive lo-fi signal detection that triggers if any of the sample frames has any value other than zero
  process(inputs: Float32Array[][]) {
    const input = inputs?.[0]?.[0];
    if (input == null) {
      return this.running;
    }

    const sampleFrames = input.length;
    const nonZeroFrames = input.filter(Boolean).length;
    if (nonZeroFrames > 0 && this.lastMessage !== GATE_ON) {
      this.lastMessage = GATE_ON;
      this.port.postMessage(GATE_ON);
    } else {
      if (nonZeroFrames < sampleFrames && this.lastMessage !== GATE_OFF) {
        this.lastMessage = GATE_OFF;
        this.port.postMessage(GATE_OFF);
      }
    }

    return this.running;
  }
}

registerProcessor("gate-processor", GateProcessor);

// Fixes TypeScript error TS1208:
// File cannot be compiled under '--isolatedModules' because it is considered a global script file.
export {};
