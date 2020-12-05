import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useStoreState, Elements, FlowTransform } from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setProject: Dispatch<SetStateAction<ProjectState>>;
}

export interface ProjectState {
  elements: Elements;
  id: string;
  transform: FlowTransform;
}

function Project({ setProject }: Props) {
  const [visible, setVisible] = useState(false);
  const elements = useStoreState(store => store.elements);
  const transform = useStoreState(store => store.transform);
  const mappedElements = elements.map(element => ({
    ...element,
    __rf: undefined,
  }));
  const mappedTransform = {
    x: transform[0],
    y: transform[1],
    zoom: transform[2],
  };
  const project = JSON.stringify({
    elements: mappedElements,
    transform: mappedTransform,
  });

  // Load project from URL
  useEffect(() => {
    const project = atob(window.location.hash.substr(1));
    try {
      const { elements, transform } = JSON.parse(project);
      setProject({
        id: uuidv4(),
        elements,
        transform,
      });
    } catch (e) {
      console.error(e);
    }
  }, [setProject]);

  // Store project in URL
  useEffect(() => {
    window.location.hash = btoa(project);
  }, [project]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      try {
        const { elements, transform } = JSON.parse(e.target.value);
        setProject({
          elements,
          id: uuidv4(),
          transform,
        });
      } catch (e) {
        console.error(e);
      }
    },
    [setProject]
  );

  return (
    <div
      style={{
        height: "100%",
        padding: 10,
        position: "absolute",
        right: 0,
        top: 0,
        transform: visible ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s ease",
        width: 400,
      }}
    >
      <textarea
        onChange={onChange}
        style={{
          fontSize: 12,
          height: "100%",
          resize: "none",
          width: "100%",
        }}
        value={JSON.stringify(
          {
            elements: mappedElements,
            transform: mappedTransform,
          },
          null,
          2
        )}
      />
      <button
        onClick={() => setVisible(visible => !visible)}
        style={{
          position: "absolute",
          right: "100%",
          top: -10,
          transform: "rotate(-90deg)",
          transformOrigin: "bottom right",
        }}
      >
        {visible ? "hide" : "show"}
      </button>
    </div>
  );
}

export default Project;
