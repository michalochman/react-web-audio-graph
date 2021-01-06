const GATE_OFF = "gateOff";
const GATE_ON = "gateOn";

class GateProcessor extends AudioWorkletProcessor {
  constructor() {
    super();

    this.lastMessage = null;
  }

  // Naive lo-fi signal detection that triggers if any of the sample frames has any value other than zero
  process(inputs) {
    if (inputs[0] == null || inputs[0][0] == null) {
      return true;
    }

    const sampleFrames = inputs[0][0].length;
    const nonZeroFrames = inputs[0][0].filter(Boolean).length;
    if (nonZeroFrames > 0 && this.lastMessage !== GATE_ON) {
      this.lastMessage = GATE_ON;
      this.port.postMessage(GATE_ON);
    } else {
      if (nonZeroFrames < sampleFrames && this.lastMessage !== GATE_OFF) {
        this.lastMessage = GATE_OFF;
        this.port.postMessage(GATE_OFF);
      }
    }

    return true;
  }
}

registerProcessor("gate-processor", GateProcessor);
