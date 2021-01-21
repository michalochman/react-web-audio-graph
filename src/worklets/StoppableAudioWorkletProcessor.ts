class StoppableAudioWorkletProcessor extends AudioWorkletProcessor {
  running = true;

  constructor(options?: AudioWorkletNodeOptions) {
    super(options);

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
