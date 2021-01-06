// AudioWorkletProcessor (based on AudioWorkletNode from lib.dom.d.ts)
declare interface AudioWorkletProcessor {
  readonly port: MessagePort;
  process(inputs: Float32Array[][], outputs: Float32Array[][], parameters: Record<string, Float32Array>): boolean;
}
declare var AudioWorkletProcessor: {
  prototype: AudioWorkletProcessor;
  new (options?: AudioWorkletNodeOptions): AudioWorkletProcessor;
};

// AudioWorkletGlobalScope
const currentFrame: number;
const currentTime: number;
const sampleRate: number;
function registerProcessor(name: string, processorCtor: typeof AudioWorkletProcessor);

// See: https://github.com/reklawnos/worklet-loader/blob/5f5e02e99a6df2e65d71a8071c9226f8a737d508/README.md#integrating-with-typescript
declare module "*.worklet.ts" {
  const exportString: string;
  export default exportString;
}
