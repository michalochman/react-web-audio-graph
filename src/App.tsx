import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ReactFlowProvider, useEdgesState, useNodesState } from "react-flow-renderer";
import produce from "immer";
import Audio from "components/Audio";
import ContextMenu from "components/ContextMenu";
import Flow from "components/Flow";
import Nodes from "components/Nodes";
import Project, { ProjectState, getEmptyProject } from "components/Project";
import { ProjectContext } from "context/ProjectContext";

function App() {
  const defaultProject = useMemo(getEmptyProject, []);
  const [id, setId] = useState<ProjectState["id"]>(defaultProject.id);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultProject.edges);
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultProject.nodes);
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
    onEdgesChange,
    onNodesChange,
    setEdges,
    setId,
    setNodes,
    setTransform,
    transform,
  };

  const setProject = useCallback(
    (project: ProjectState) => {
      setEdges(project.edges);
      setId(project.id);
      setNodes(project.nodes);
      setTransform(project.transform);
    },
    [setEdges, setId, setNodes, setTransform]
  );
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const projectUrl = params.get("project");
      if (projectUrl) {
        const project = await (await fetch(projectUrl)).json();
        setProject(project);
      }
    })();
  }, [setProject]);

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
