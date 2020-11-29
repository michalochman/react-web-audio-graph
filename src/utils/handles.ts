import { useCallback } from "react";
import { Connection } from "react-flow-renderer";
import { useNodeContext } from "context/NodeContext";

// FIXME This should be handled on changes to ReactFlowRenderer state instead.
//       Now it's not capable of disconnecting nodes.
export function useOnOutputConnect() {
  const { nodes } = useNodeContext();

  return useCallback(
    (connection: Connection) => {
      console.log("Output connected", connection, nodes);

      if (!connection.source || !connection.target || !connection.targetHandle) {
        return;
      }

      const source = nodes[connection.source];
      const target = nodes[connection.target];
      const targetHandle = connection.targetHandle;

      // connect AudioNode
      if (targetHandle === "input") {
        source.connect(target);
      }
      // connect AudioParam
      else {
        // @ts-ignore
        source.connect(target[targetHandle]);
      }
    },
    [nodes]
  );
}
