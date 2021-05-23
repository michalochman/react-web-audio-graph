import { useNode } from "context/NodeContext";

interface Options {
  inputs?: number;
}

function useChannelMergerNode(id: string, { inputs = 2 }: Options) {
  // AudioNode
  return useNode(id, context => context.createChannelMerger(inputs), [inputs]);
}

export default useChannelMergerNode;
