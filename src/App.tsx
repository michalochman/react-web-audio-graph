import React, { useCallback, useMemo, useState } from "react";
import { Elements, isNode, ReactFlowProvider } from "react-flow-renderer";
import produce from "immer";
import Audio from "components/Audio";
import ContextMenu from "components/ContextMenu";
import Flow from "components/Flow";
import Nodes from "components/Nodes";
import Project, { ProjectState, getDefaultProject } from "components/Project";
import { ProjectContext } from "context/ProjectContext";

function App() {
  const defaultProject = useMemo(getDefaultProject, []);
  const [id, setId] = useState<ProjectState["id"]>(defaultProject.id);
  const [elements, setElements] = useState<ProjectState["elements"]>(defaultProject.elements);
  const [transform, setTransform] = useState<ProjectState["transform"]>(defaultProject.transform);
  const onChangeElementFactory = useCallback(
    (id: string) => (data: Record<string, any>): void => {
      setElements(
        produce((draft: Elements) => {
          const node = draft.filter(isNode).find(element => element.id === id);
          if (!node) {
            return;
          }
          Object.keys(data).forEach(property => (node.data[property] = data[property]));
        })
      );
    },
    [setElements]
  );
  const project = { elements, id, onChangeElementFactory, setElements, setId, setTransform, transform };

  return (
    <ProjectContext.Provider value={project}>
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
                <Flow key={project.id} />
                <Project />
              </div>
            </ContextMenu>
          </Nodes>
        </ReactFlowProvider>
      </Audio>
    </ProjectContext.Provider>
  );
}

export default App;
