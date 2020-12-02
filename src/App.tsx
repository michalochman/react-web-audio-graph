import React, { useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Audio from "components/Audio";
import Flow from "components/Flow";
import Project, { ProjectState } from "components/Project";
import Nodes from "components/Nodes";

function App() {
  const [project, setProject] = useState<ProjectState>({
    id: "",
    elements: [],
  });

  return (
    <Audio>
      <Nodes>
        <ReactFlowProvider>
          <div
            style={{
              alignItems: "stretch",
              display: "flex",
              height: "100vh",
            }}
          >
            <Flow key={project.id} elements={project.elements} />
            <Project setProject={setProject} />
          </div>
        </ReactFlowProvider>
      </Nodes>
    </Audio>
  );
}

export default App;
