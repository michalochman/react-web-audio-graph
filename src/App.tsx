import React, { useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
import Audio from "components/Audio";
import ContextMenu from "components/ContextMenu";
import Flow from "components/Flow";
import Nodes from "components/Nodes";
import Project, { ProjectState, getDefaultProject } from "components/Project";

function App() {
  const [project, setProject] = useState<ProjectState>(getDefaultProject);

  return (
    <Audio>
      <ReactFlowProvider>
        <Nodes>
          <ContextMenu>
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
          </ContextMenu>
        </Nodes>
      </ReactFlowProvider>
    </Audio>
  );
}

export default App;
