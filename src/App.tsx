import React, { useCallback, useMemo, useState } from "react";
import { ReactFlowProvider } from "react-flow-renderer";
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
  const [edges, setEdges] = useState<ProjectState["edges"]>(defaultProject.edges);
  const [nodes, setNodes] = useState<ProjectState["nodes"]>(defaultProject.nodes);
  const [transform, setTransform] = useState<ProjectState["transform"]>(defaultProject.transform);
  const onChangeElementFactory = useCallback(
    (id: string) =>
      (data: Record<string, any>): void => {
        setNodes(
          produce(draft => {
            const node = draft.find(element => element.id === id);
            if (!node) {
              return;
            }
            Object.keys(data).forEach(property => (node.data[property] = data[property]));
          })
        );
      },
    [setNodes]
  );
  const project = {
    edges,
    id,
    nodes,
    onChangeElementFactory,
    setEdges,
    setId,
    setNodes,
    setTransform,
    transform,
  };

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
