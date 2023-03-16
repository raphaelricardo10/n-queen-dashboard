import React from "react";
import { type ApiMessage } from "../../protocols";
import {
  SolverService,
  type SolverResult,
} from "../../services/solver-service";

export type SolverApiHook = ApiMessage<SolverResult[]>;

export function useSolverApi(): SolverApiHook {
  const [results, setResults] = React.useState<ApiMessage<SolverResult[]>>({
    data: [],
    status: "in_progress",
  });

  React.useEffect(() => {
    async function getResults(): Promise<void> {
      setResults(await SolverService.getResults());
    }
    void getResults();
  }, []);

  return results;
}
