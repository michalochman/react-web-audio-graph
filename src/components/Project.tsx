import { useStoreState, Elements } from "react-flow-renderer";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

interface Props {
  setProject: Dispatch<SetStateAction<ProjectState>>;
}

export interface ProjectState {
  elements: Elements;
  id: string;
}

function Project({ setProject }: Props) {
  const elements = useStoreState(store => store.elements);
  const mappedElements = elements.map(element => ({
    ...element,
    __rf: undefined,
  }));

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      try {
        const elements = JSON.parse(e.target.value) as Elements;
        setProject({
          elements,
          id: uuidv4(),
        });
      } catch (e) {
        console.error(e);
      }
    },
    [setProject]
  );

  return (
    <div style={{ padding: 10, width: 400 }}>
      <textarea
        onChange={onChange}
        style={{
          fontSize: 12,
          height: "100%",
          resize: "none",
          width: "100%",
        }}
        value={JSON.stringify(mappedElements, null, 2)}
      />
    </div>
  );
}

export default Project;
