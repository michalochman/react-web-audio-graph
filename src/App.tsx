import React from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Audio from "components/Audio";
import Flow from "components/Flow";
import Nodes from "components/Nodes";

function App() {
  return (
    <Audio>
      <Nodes>
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </Nodes>
    </Audio>
  );
}

export default App;
