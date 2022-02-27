class StoppableAudioWorkletProcessor extends AudioWorkletProcessor {
  running = true;

  constructor() {
    super();

    this.port.onmessage = event => {
      if (event.data === "stop") {
        this.stop();
      }
    };
  }

  stop() {
    this.running = false;
  }
}

export default StoppableAudioWorkletProcessor;
