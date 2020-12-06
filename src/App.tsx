import React, { useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Audio from "components/Audio";
import Flow from "components/Flow";
import Project, { ProjectState, getDefaultProject } from "components/Project";
import Nodes from "components/Nodes";

function App() {
  const [project, setProject] = useState<ProjectState>(getDefaultProject);

  return (
    <Audio>
      <ReactFlowProvider>
        <Nodes>
          <div
            style={{
              alignItems: "stretch",
              display: "flex",
              height: "100vh",
            }}
          >
            <Flow key={project.id} elements={project.elements} transform={project.transform} />
            <Project setProject={setProject} />
          </div>
        </Nodes>
      </ReactFlowProvider>
    </Audio>
  );
}

export default App;
