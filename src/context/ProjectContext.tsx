import { createContext, useContext } from "react";
import { ProjectState } from "components/Project";

export const ProjectContext = createContext<ProjectState>(null!);

export function useProject() {
  return useContext(ProjectContext);
}
