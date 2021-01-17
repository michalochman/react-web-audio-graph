import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { AnyAudioNode, useNodeContext } from "context/NodeContext";
// eslint-disable-next-line
import { Elements, Edge, FlowTransform, isNode, isEdge } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import { useProject } from "context/ProjectContext";

export interface ProjectState {
  elements: Elements;
  id: string;
  onChangeElementFactory: (id: string) => (data: Record<string, any>) => void;
  setElements: Dispatch<SetStateAction<Elements>>;
  setId: Dispatch<SetStateAction<string>>;
  setTransform: Dispatch<SetStateAction<FlowTransform>>;
  transform: FlowTransform;
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

export const getDefaultProject = () => ({
  id: uuidv4(),
  elements: [],
  transform: {
    x: 0,
    y: 0,
    zoom: 1,
  },
});

function Project() {
  const { elements, id, setElements, setId, setTransform, transform } = useProject();
  const [visible, setVisible] = useState(false);
  const drawerStyles = useMemo(() => getDrawerStyles(visible), [visible]);

  // Load project from URL
  useEffect(() => {
    const project = atob(window.location.hash.substr(1));
    try {
      const { elements, id, transform } = JSON.parse(project);
      setElements(elements);
      setId(id ?? uuidv4());
      setTransform(transform);
    } catch (e) {
      console.error(e);
    }
  }, [setElements, setId, setTransform]);

  // Store project in URL
  useEffect(() => {
    window.location.hash = btoa(
      JSON.stringify({
        elements: elements.map(element => ({ ...element, __rf: undefined })),
        id,
        transform,
      })
    );
  }, [elements, id, transform]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      try {
        const { elements, id, transform } = JSON.parse(e.target.value);
        setElements(elements);
        setId(id ?? uuidv4());
        setTransform(transform);
      } catch (e) {
        console.error(e);
      }
    },
    [setElements, setId, setTransform]
  );

  const { getNode } = useNodeContext();

  const clearProject = useCallback(() => {
    const defaultProject = getDefaultProject();
    setElements(defaultProject.elements);
    setId(defaultProject.id);
    setTransform(defaultProject.transform);
  }, [setElements, setId, setTransform]);
  const toggleProjectDrawer = useCallback(() => setVisible(visible => !visible), []);

  return (
    <div style={drawerStyles}>
      <textarea onChange={onChange} style={textareaStyles} value={buildApp(elements, getNode)} />
      <div style={controlsStyles}>
        <button onClick={clearProject} style={{ marginRight: 10 }}>
          clear
        </button>
        <button onClick={toggleProjectDrawer}>{visible ? "hide" : "show"}</button>
      </div>
    </div>
  );
}

export function buildApp(elements: Elements, getNode: (id: string) => AnyAudioNode) {
  const template: any = {
    id: "1",
    type: "FM_output_int",
    event: "INCOMMING_FLOW",
    parameters: [],
    inputs: [],
  };

  let idCount = 0;
  let idMap = new Map();
  let frescoIdMap = new Map();
  let elementsLength = elements.length;
  let frescoElements = [];

  // Loop through every node
  for (let i = 0; i < elementsLength; i++) {
    if (!isNode(elements[i])) {
      continue;
    }

    // Deep copy template. for some reason shallow copy doesn't work
    let currTemplate = JSON.parse(JSON.stringify(template));
    console.log(elements[i]);
    idMap.set(elements[i].id, i);
    frescoIdMap.set(elements[i].id, idCount);

    // Set ID and type
    currTemplate.id = idCount.toString();
    currTemplate.type = elements[i].type!;

    // Set params
    let currData = elements[i].data;
    for (const [, value] of Object.entries(currData)) {
      if (!(typeof value === "function")) {
        console.log("currTemplate" + currTemplate);
        currTemplate.parameters.push(value);
      }
    }

    // Temporary
    if (idCount === 1) {
      currTemplate.event = "PUSH";
    }
    if (idCount === 2) {
      currTemplate.event = "PUSH";
    }

    frescoElements.push(currTemplate);
    idCount++;
  }

  // Loop through every edge
  for (let i = 0; i < elementsLength; i++) {
    if (!isEdge(elements[i])) {
      continue;
    }

    let inputNum = 1;
    let sourceId = -1;
    let outputNum = 1;

    let currEdge = elements[i] as Edge;

    // FRESCO Elements
    let targetFrescoId = frescoIdMap.get(currEdge.target);
    if (typeof targetFrescoId === undefined) {
      continue;
    }

    let sourceFrescoId = frescoIdMap.get(currEdge.source);
    if (typeof sourceFrescoId === undefined) {
      continue;
    }

    sourceId = sourceFrescoId;
    let inputString = inputNum + ":" + sourceId + ":" + outputNum;
    frescoElements[targetFrescoId].inputs.push(inputString);

    inputNum++;
  }

  return JSON.stringify(
    {
      //elements: elements.map(element => ({ ...element, __rf: undefined })),
      frescoElements: frescoElements.map(element => ({ ...element, __rf: undefined })),
    },
    null,
    2
  );
}

export default Project;
