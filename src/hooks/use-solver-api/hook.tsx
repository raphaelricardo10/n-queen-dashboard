import React from "react";
import { type ApiMessage } from "../../api";
import {
  SolverService,
  type SolverResult,
} from "../../services/solver-service";

export interface SolverApiHook {
  solverResults: ApiMessage<SolverResult[]>;
}

export function useSolverApi(): SolverApiHook {
  const [solverResults, setResults] = React.useState<
    ApiMessage<SolverResult[]>
  >({
    data: [],
    status: "in_progress",
  });

  React.useEffect(() => {
    async function getResults(): Promise<void> {
      setResults(await SolverService.getResults());
    }
    void getResults();
  }, []);

  return { solverResults };
}
