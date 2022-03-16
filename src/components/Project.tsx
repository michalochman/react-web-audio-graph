import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { Edge, EdgeChange, Node, NodeChange, Viewport } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { useProject } from "context/ProjectContext";

export interface ProjectState {
  edges: Edge[];
  id: string;
  nodes: Node[];
  onChangeElementFactory: (id: string) => (data: Record<string, any>) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setId: Dispatch<SetStateAction<string>>;
  setTransform: Dispatch<SetStateAction<Viewport>>;
  transform: Viewport;
}

const textareaStyles: React.CSSProperties = {
  fontSize: 12,
  height: "100%",
  resize: "none",
  width: "100%",
};

const controlsStyles: React.CSSProperties = {
  display: "flex",
  position: "absolute",
  right: "100%",
  top: -10,
  transform: "rotate(-90deg)",
  transformOrigin: "bottom right",
};

const getDrawerStyles = (visible: boolean): React.CSSProperties => ({
  height: "100%",
  padding: 10,
  position: "absolute",
  right: 0,
  top: 0,
  transform: visible ? "translateX(0)" : "translateX(100%)",
  transition: "transform 0.4s ease",
  width: 400,
});

export const getEmptyProject = () => ({
  id: uuidv4(),
  edges: [],
  nodes: [],
  transform: {
    x: 0,
    y: 0,
    zoom: 1,
  },
});

function Project() {
  const { edges, id, nodes, setEdges, setId, setNodes, setTransform, transform } = useProject();
  const [visible, setVisible] = useState(false);
  const drawerStyles = useMemo(() => getDrawerStyles(visible), [visible]);

  // Load project from URL
  useEffect(() => {
    const projectData = window.location.hash.slice(1);
    if (!projectData) {
      return;
    }

    try {
      const project = atob(window.location.hash.slice(1));
      const { edges, id, nodes, transform } = JSON.parse(project);
      setEdges(edges);
      setId(id ?? uuidv4());
      setNodes(nodes);
      setTransform(transform);
    } catch (e) {
      console.error(e);
    }
  }, [setEdges, setId, setNodes, setTransform]);

  // Store project in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectUrl = params.get("project");
    if (projectUrl) {
      return;
    }

    window.location.hash = btoa(JSON.stringify({ edges, id, nodes, transform }));
  }, [edges, id, nodes, transform]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      try {
        const { edges, id, nodes, transform } = JSON.parse(e.target.value);
        setEdges(edges);
        setId(id ?? uuidv4());
        setNodes(nodes);
        setTransform(transform);
      } catch (e) {
        console.error(e);
      }
    },
    [setEdges, setId, setNodes, setTransform]
  );

  const clearProject = useCallback(() => {
    const emptyProject = getEmptyProject();
    setEdges(emptyProject.edges);
    setId(emptyProject.id);
    setNodes(emptyProject.nodes);
    setTransform(emptyProject.transform);
  }, [setEdges, setId, setNodes, setTransform]);
  const toggleProjectDrawer = useCallback(() => setVisible(visible => !visible), []);

  return (
    <div style={drawerStyles}>
      <textarea
        onChange={onChange}
        style={textareaStyles}
        value={JSON.stringify({ edges, nodes, id, transform }, null, 2)}
      />
      <div style={controlsStyles}>
        <button onClick={clearProject} style={{ marginRight: 10 }}>
          clear
        </button>
        <button onClick={toggleProjectDrawer}>{visible ? "hide" : "show"}</button>
      </div>
    </div>
  );
}

export default Project;
